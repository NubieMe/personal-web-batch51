const express = require('express')
const path = require('path')
const app = express()
const port = 3000

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
app.get('/project/:id', projectDetail)
app.get('/testimonials', testimonials)

function home(req, res) {
  res.render('index')
}

function contact(req, res) {
  res.render('contact')
}

function addProjectView(req, res) {
  const data = [
    {
      id: "1",
      name: "project1",
      start: "2023-01-01",
      end: "2023-02-01",
      image: "/static/image/phone1.jpg",
      description: "This is just description of this project",
      nodeJS: true,
      reactJS: false,
      nextJS: true,
      typescript: false
    },
    {
      id: "2",
      name: "project2",
      start: "2023-01-01",
      end: "2023-02-01",
      image: "/static/image/phone2.jpg",
      description: "This is just description of this project",
      nodeJS: true,
      reactJS: false,
      nextJS: true,
      typescript: false
    },
    {
      id: "3",
      name: "project3",
      start: "2023-01-01",
      end: "2023-02-01",
      image: "/static/image/coding1.jpg",
      description: "This is just description of this project",
      nodeJS: true,
      reactJS: false,
      nextJS: true,
      typescript: false
    }
  ]

  res.render('add-project', { data })
}

function addProject(req, res) {
  const { name, start, end, description, nodeJS, reactJS, nextJS, typescript } = req.body

  console.log('name', name)
  console.log('start', start)
  console.log('end', end)
  console.log('description', description)
  console.log('nodeJS', nodeJS)
  console.log('reactJS', reactJS)
  console.log('nextJS', nextJS)
  console.log('typescript', typescript)
  res.redirect('project')
}

function projectDetail(req, res) {
  const { id } = req.params

  const projectData = {
    id,
    name: "project1",
    start: "2023-01-01",
    end: "2023-02-01",
    description: "This is just description of this project",
    nodeJS: true,
    reactJS: false,
    nextJS: true,
    typescript: false
  }

  res.render('project-detail', { projectData })
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

// app.get('/testimonial', (req, res) => {
//     res.json([
//         {
//           name: "Andra",
//           quote: "Pengerjaan projectnya tepat sesuai dengan yang saya inginkan.",
//           image: "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//           rating: 5
//         },
//         {
//           name: "Bagas",
//           quote: "Hasil project melebihi ekspektasi saya.",
//           image: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//           rating: 5
//         },
//         {
//           name: "Dumbways Company",
//           quote: "Peserta lulusan kami memang bisa diandalkan.",
//           image: "/static/image/dumbways.png",
//           rating: 4
//         },
//         {
//           name: "Kevin",
//           quote: "Sangat tidak memuaskan!!!",
//           image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
//           rating: 1
//         },
//         {
//           name: "John",
//           quote: "Not what I really wanted. but hey, it's not bad. keep up the good work!",
//           image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600",
//           rating: 3
//         }
//     ])
// })

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})