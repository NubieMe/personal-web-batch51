const testimonials = [
    {
        name: `Andra`,
        quote: `Pengerjaan projectnya tepat sesuai dengan yang saya inginkan.`,
        image: `https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
        rating: 5,
    },
    {
        name: `Bagas`,
        quote: `Hasil project melebihi ekspektasi saya.`,
        image: `https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
        rating: 5
    },
    {
        name: `Dumbways Company`,
        quote: `Peserta lulusan kami memang bisa diandalkan.`,
        image: `assets/image/dumbways.png`,
        rating: 4
    },
    {
        name: "Kevin",
        quote: "Sangat tidak memuaskan!!!",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 1
    },
    {
        name: `John`,
        quote: `Not what I really wanted. but hey, it's not bad. keep up the good work!`,
        image: `https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600`,
        rating: 3
    }
]

function html(item) {
    return `<div class="testimonial">
    <img src="${item.image}" class="profile-testimonial" />
    <p class="quote">"${item.quote}"</p>
    <p class="author">- ${item.name}</p>
    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
</div>`
}

function allTestimonials() {
    let testimonialHTML = ``
    testimonials.forEach((item) => {
        testimonialHTML += html(item)
    })

    document.getElementById("testimonials").innerHTML = testimonialHTML
}

allTestimonials()

function filteredTestimonials(rating) {
    let testimonialHTML = ``
    const testimonialFiltered = testimonials.filter((item) => {
        return item.rating === rating
    })

    if (testimonialFiltered.length === 0) {
        testimonialHTML = `<h3> Data not found! </h3>`
    } else {
        testimonialFiltered.forEach((item) => {
            testimonialHTML += html(item)
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML
}