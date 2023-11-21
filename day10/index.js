const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/testimonial', (req, res) => {
    res.json([
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
          image: "assets/image/dumbways.png",
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
    ])
})

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})