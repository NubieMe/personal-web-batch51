const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./src/middlewares/upload-files')
const usersModel = require('./src/models').users
const projectsModel = require('./src/models').projects

//untuk setting variable global, config dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))
app.set('trust proxy', 1) // trust first proxy  

//untuk akses assets
app.use('/static', express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended : false })) //body parser, extended
app.use(flash())
app.use(session({
  name: 'pwb51-sid',
  secret: 'CcNfGUNW78mJQPHgmkAnbmhlAFVBg1gq',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))


app.get('/home', home)
app.get('/contact', contact)
app.get('/project', addProjectView)
app.post('/project', upload.single('image'), addProject)

app.get('/update/:id', updateProjectView)
app.post('/update', upload.single('image'),updateProject)

app.post('/delete-project/:id', deleteProject)

app.get('/project/:id', projectDetail)
app.get('/testimonials', testimonials)

app.get('/register', registerView)
app.post('/register', register)

app.get('/login', loginView)
app.post('/login', login)

app.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/home')
})

async function home(req, res) {
  const isLogin = req.session.isLogin
  const authorId = req.session.user
  
  if (!isLogin) {
    const object = await projectsModel.findAll()
    return res.render('index', { data: object, isLogin })
  }
  
  const query = `SELECT projects.id, projects.name, projects.start_date, projects.end_date,
  projects.description, projects.technologies, projects.image, users.name AS author, 
  projects."createdAt", projects."updatedAt" FROM projects LEFT JOIN users ON projects."authorId" = users.id
  WHERE "authorId"=${authorId.id}`
  const object = await sequelize.query(query, {type: QueryTypes.SELECT})
  
  res.render('index', { data: object, isLogin })
}

async function register(req, res) {
  const { name, email, password } = req.body
  const salt = 10

  // const query = `SELECT * FROM users`
  // const object = await sequelize.query(query, { type: QueryTypes.SELECT })

  // if (email === object[0].email) {
  //     req.flash('danger', 'email already exist!')
  //     return res.redirect('/register')
  // }
  
  const user = await usersModel.findOne({ where: { email: `${email}` } });
  if (user === null) {
    bcrypt.hash(password, salt, async(err, hash)=> {
      if (err) {
        req.flash('danger', 'Internal Server Error!')
        return res.redirect('/register')
      }
  
      const query = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${hash}')`
      await sequelize.query(query, { type: QueryTypes.INSERT })
      req.flash('success', 'Register successfully!')
      req.session.isLogin = true
      req.session.user = {
        name: name,
        email: email
      }
      res.redirect('/home')
    })
  } else {
    req.flash('danger', 'email already exist!')
    return res.redirect('/register')
  }
}

async function login(req, res) {
  const { email, password } = req.body

  const query = `SELECT * FROM users WHERE email='${email}'`
  const object = await sequelize.query(query, { type: QueryTypes.SELECT })
  
  if (!object.length) {
    req.flash('danger', 'user not found!')
    return res.redirect('/login')
  }

  bcrypt.compare(password, object[0].password, (err, result) => {
    if (err) {
      req.flash('danger', 'Internal Server Error!')
      return res.redirect('/login')
    }
    
    if (!result) {
      req.flash('danger', 'email or password incorrect')
      return res.redirect('/login')
    }
    
    req.flash('success', `Welcome, ${object[0].name}`)
    req.session.isLogin = true
    req.session.user = {
      id: object[0].id,
      name: object[0].name,
      email: object[0].email
    }
    res.redirect('/home')
  })
}

function registerView(req, res) {
  res.render('register')
}

function loginView(req, res) {
  res.render('login')
}

function contact(req, res) {
  const isLogin = req.session.isLogin

  res.render('contact', { isLogin })
}

function addProjectView(req, res) {
  const isLogin = req.session.isLogin

  res.render('add-project', { isLogin })
}

async function addProject(req, res) {
  const { name, start, end, description, nodeJS, reactJS, nextJS, typescript } = req.body
  const authorId = req.session.user.id
  const image = req.file.filename

  function node(){
    let result = (nodeJS || 'null')
    return result
  }

  function react(){
    let result = (reactJS || 'null')
    return result
  }

  function next(){
    let result = (nextJS || 'null')
    return result
  }

  function type(){
    let result = (typescript || 'null')
    return result
  }

  const query = `INSERT INTO projects(name, start_date, end_date, description, technologies, image, "authorId") 
  VALUES ('${name}','${start}','${end}','${description}', '{${node()}, ${react()}, ${next()}, ${type()}}', '${image}', '${authorId}')`
  const object = await sequelize.query(query, {type: QueryTypes.INSERT})
  res.redirect('/home')
}

async function updateProjectView(req, res) {
  const { id } = req.params
  const isLogin = req.session.isLogin

  
  const query = `SELECT * FROM projects WHERE id=${id}`
  const object = await sequelize.query(query, {type: QueryTypes.SELECT})
  res.render('update-project', { dataFilter: object[0], isLogin })
}

async function updateProject(req, res) {
  const { id, name, start, end, description, nodeJS, reactJS, nextJS, typescript } = req.body
  
  function node(){
    let result = (nodeJS || 'null')
    return result
  }

  function react(){
    let result = (reactJS || 'null')
    return result
  }

  function next(){
    let result = (nextJS || 'null')
    return result
  }
  
  function type(){
    let result = (typescript || 'null')
    return result
  }
  
  const authorId = req.session.user.id
  let image = ``
  if (req.file) {
    const result = req.file.filename
    image = `,image='${result}'`
  }
  
  const query = `UPDATE projects SET name='${name}', start_date='${start}', end_date='${end}', description='${description}',
  technologies='{${node()}, ${react()}, ${next()}, ${type()}}', "authorId"=${authorId} ${image} WHERE id=${id}`
  const object = await sequelize.query(query, {type: QueryTypes.UPDATE})
  res.redirect('/home')
}

async function deleteProject(req, res) {
  const { id } = req.params
  
  const query = `DELETE FROM projects WHERE id=${id}`
  const object = await sequelize.query(query, {type: QueryTypes.DELETE})
  res.redirect('/home')
}

async function projectDetail(req, res) {
  const { id } = req.params
  const isLogin = req.session.isLogin

  const object = await projectsModel.findOne({where: { id }})

  res.render('project-detail', { dataFilter: object, isLogin })
}

function testimonials(req, res) {
  const isLogin = req.session.isLogin

  const testimonialData = [
    {
      name: "Andra",
      quote: "Pengerjaan projectnya tepat sesuai dengan yang saya inginkan.",
      image: "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    },
    {
      name: "Bagas",
      quote: "Hasil project melebihi ekspektasi saya.",
      image: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    },
    {
      name: "Dumbways Company",
      quote: "Peserta lulusan kami memang bisa diandalkan.",
      image: "/static/image/dumbways.png",
      rating: 4
    },
    {
      name: "Kevin",
      quote: "Sangat tidak memuaskan!!!",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 1
    },
    {
      name: "John",
      quote: "Not what I really wanted. but hey, it's not bad. keep up the good work!",
      image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 3
    }
]

  res.render('testimonials', { testimonialData, isLogin })
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})