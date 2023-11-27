const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

//untuk setting variable global, config dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

//untuk akses assets
app.use('/static', express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended : false })) //body parser, extended 

app.get('/home', home)
app.get('/contact', contact)
app.get('/project', addProjectView)
app.post('/project', addProject)

app.get('/update/:id', updateProjectView)
app.post('/update', updateProject)

app.post('/delete-project/:id', deleteProject)

app.get('/project/:id', projectDetail)
app.get('/testimonials', testimonials)

async function home(req, res) {
  const query = 'SELECT * FROM projects'
  const object = await sequelize.query(query, {type: QueryTypes.SELECT})
  
  res.render('index', {data: object})
}

function contact(req, res) {
  res.render('contact')
}

function addProjectView(req, res) {
  res.render('add-project')
}

async function addProject(req, res) {
  const { name, start, end, description, nodeJS, reactJS, nextJS, typescript, } = req.body
  
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

  const query = `INSERT INTO projects(name, start_date, end_date, description, technologies) VALUES ('${name}','${start}','${end}','${description}', '{${node()}, ${react()}, ${next()}, ${type()}}')`
  const object = await sequelize.query(query, {type: QueryTypes.INSERT})
  res.redirect('/home')
}

async function updateProjectView(req, res) {
  const { id } = req.params
  
  const query = `SELECT * FROM projects WHERE id=${id}`
  const object = await sequelize.query(query, {type: QueryTypes.SELECT})
  res.render('update-project', { dataFilter: object[0] })
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

  const query = `UPDATE projects SET name='${name}', start_date='${start}', end_date='${end}', description='${description}', technologies='{${node()}, ${react()}, ${next()}, ${type()}}' WHERE id=${id}`
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

  const query = `SELECT * FROM projects WHERE id=${id}`
  const object = await sequelize.query(query, {type: QueryTypes.SELECT})

  console.log('project detail', object)
  res.render('project-detail', { dataFilter: object[0] })
}

function testimonials(req, res) {
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

  res.render('testimonials', {testimonialData})
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})