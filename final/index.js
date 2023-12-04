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
const profilesModel = require('./src/models').profiles
const hbs = require("handlebars")

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))
app.set('trust proxy', 1)

app.use('/static', express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended : false }))
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

app.get('/profile', profileView)
app.post('/profile', upload.single('image'),profile)

async function home(req, res) {
  const isLogin = req.session.isLogin
  const authorId = req.session.user

  if (!isLogin) {
    const query = `SELECT projects.id, projects.name, projects.start_date, projects.end_date,
    projects.description, projects.technologies, projects.image, users.name AS author, 
    projects."createdAt", projects."updatedAt" FROM projects INNER JOIN users ON projects."authorId" = users.id`
    const object = await sequelize.query(query, {type: QueryTypes.SELECT})
    return res.render('index', { data: object, isLogin })
  }

  const profile = await profilesModel.findOne({ where: { authorId: `${authorId.id}` } });
  if (!profile) {
    const query = `SELECT projects.id, projects.name, projects.start_date, projects.end_date,
    projects.description, projects.technologies, projects.image, users.name AS author, 
    projects."createdAt", projects."updatedAt" FROM projects INNER JOIN users ON projects."authorId" = users.id
    WHERE "authorId"=${authorId.id}`
    const object = await sequelize.query(query, {type: QueryTypes.SELECT})
    res.render('index', { data: object, isLogin })
  }
  
  const query = `SELECT projects.id, projects.name, projects.start_date, projects.end_date,
  projects.description, projects.technologies, projects.image, users.name AS author, 
  projects."createdAt", projects."updatedAt" FROM projects INNER JOIN users ON projects."authorId" = users.id
  WHERE "authorId"=${authorId.id}`
  const object = await sequelize.query(query, {type: QueryTypes.SELECT})
  res.render('index', { data: object, isLogin, profile })
}

async function register(req, res) {
  const { name, email, password } = req.body
  const salt = 10

  const user = await usersModel.findOne({ where: { email: `${email}` } });
  if (user === null) {
    bcrypt.hash(password, salt, async(err, hash)=> {
      if (err) {
        req.flash('danger', 'Internal Server Error!')
        return res.redirect('/register')
      }
      
      const insert = await usersModel.create({ name:`${name}`, email:`${email}`, password:`${hash}` })
      req.flash('success', 'Register successfully!')
      const user = await usersModel.findOne({ where: { email: `${email}` } });
      req.session.isLogin = true
      req.session.user = {
        id: user.id,
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
  const user = await usersModel.findOne({ where: { email:`${email}` }})
  
  if (!user) {
    req.flash('danger', 'user not found!')
    return res.redirect('/login')
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      req.flash('danger', 'Internal Server Error!')
      return res.redirect('/login')
    }
    
    if (!result) {
      req.flash('danger', 'email or password incorrect')
      return res.redirect('/login')
    }
    
    req.flash('success', `Welcome, ${user.name}`)
    req.session.isLogin = true
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
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

async function profileView(req, res) {
  const isLogin = req.session.isLogin
  const authorId = req.session.user

  if (isLogin) {
    const profile = await profilesModel.findOne({ where: { authorId: `${authorId.id}` } })
    if (!profile) {
      return res.render('profile', { isLogin })
    }
    let front = 'FrontEnd'
    let back = 'BackEnd'
    let full = 'Fullstack'
    
    const result = [`${front}`, `${back}`,`${full}`]
    if (profile.role === front) {
      back = null
      full = null
      return res.render('profile', { data: profile, isLogin, result: `${result}` })
    } else if (profile.role === back) {
      front = null
      full = null
      return res.render('profile', { data: profile, isLogin, result: `${result}` })
    } else if (profile.role === full) {
      front = null
      back = null
    }
    return res.render('profile', { data: profile, isLogin, result: `${result}` })
  } 
  return res.render('profile', { isLogin })
}

async function profile(req, res) {
  const { fullName, role } = req.body
  const authorId = req.session.user.id
  const profile = await profilesModel.findOne({ where: {authorId: `${authorId}`}})
  
  if (req.file && profile) {
    const image = req.file.filename
    const update = await profilesModel.update({fullName:`${fullName}`, role:`${role}`, image:`${image}`}, {where: {authorId:`${authorId}`}})
    return res.redirect('/home')
    
  } else if (!req.file && profile) {
    const update = await profilesModel.update({fullName:`${fullName}`, role:`${role}`}, {where: {authorId:`${authorId}`}})
    return res.redirect('/home')

  } else if (req.file && !profile) {
    const image = req.file.filename
    const insert = await profilesModel.create({fullName:`${fullName}`, role:`${role}`, image:`${image}`, authorId:`${authorId}`})
    return res.redirect('/home')
    
  } else {
    const insert = await profilesModel.create({fullName:`${fullName}`, role:`${role}`, authorId:`${authorId}`})
    return res.redirect('/home')
  }
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

  function node() {
    let result = (nodeJS ?? null)
    return result
  }

  function react() {
    let result = (reactJS ?? null)
    return result
  }

  function next() {
    let result = (nextJS ?? null)
    return result
  }

  function type() {
    let result = (typescript ?? null)
    return result
  }

  const insert = await projectsModel.create({name:`${name}`,start_date:`${start}`,end_date:`${end}`,
  description:`${description}`, technologies:[node(), react(), next(), type()], image:`${image}`, authorId:`${authorId}`})
  res.redirect('/home')
}

async function updateProjectView(req, res) {
  const { id } = req.params
  const isLogin = req.session.isLogin
  const object = await projectsModel.findOne({ where: { id:`${id}` }})
  res.render('update-project', { dataFilter: object, isLogin })
}

async function updateProject(req, res) {
  const { id, name, start, end, description, nodeJS, reactJS, nextJS, typescript } = req.body
  const authorId = req.session.user.id
  
  function node() {
    let result = (nodeJS ?? null)
    return result
  }
  
  function react() {
    let result = (reactJS ?? null)
    return result
  }
  
  function next() {
    let result = (nextJS ?? null)
    return result
  }
  
  function type() {
    let result = (typescript ?? null)
    return result
  }
  
  if (!req.file) {
    const update = await projectsModel.update({name:`${name}`, start_date:`${start}`, end_date:`${end}`, description:`${description}`, 
    technologies:[node(), react(), next(), type()], authorId:`${authorId}`}, { where: { id:`${id}` }})
    return res.redirect('/home')
  }
  
  const image = req.file.filename
  const update = await projectsModel.update({name:`${name}`,start_date:`${start}`,end_date:`${end}`, description:`${description}`, 
  technologies:[node(), react(), next(), type()], image:`${image}`, authorId:`${authorId}`}, { where: { id:`${id}` }})
  res.redirect('/home')
}

async function deleteProject(req, res) {
  const { id } = req.params
  const del = await projectsModel.destroy({ where: { id:`${id}` }})
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