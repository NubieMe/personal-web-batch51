const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.npoint.io/4fb5cdd7eb211bdb190d', true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
        } else {
            reject("Server Error!")
        }
    }

    xhr.onerror = () => {
        reject("Network error! Please check you internet connection.")
    }
    xhr.send()
})

function html(item) {
    return `<div class="testimonial">
    <img src="${item.image}" class="profile-testimonial" />
    <p class="quote">"${item.quote}"</p>
    <p class="author">- ${item.name}</p>
    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
</div>`
}

async function allTestimonials() {
    let testimonialHTML = ``
    const testimonials = await promise
    // const response = await fetch('https://api.npoint.io/4fb5cdd7eb211bdb190d', {
    //     method: "GET"
    // })
    
    // const testimonials = await response.json() // bisa juga seperti ini tanpa Promise
    testimonials.forEach((item) => {
        testimonialHTML += html(item)
    })
    
    document.getElementById("testimonials").innerHTML = testimonialHTML
}

allTestimonials()

async function filteredTestimonials(rating) {
    let testimonialHTML = ``
    const testimonials = await promise
    // const response = await fetch('https://api.npoint.io/4fb5cdd7eb211bdb190d', {
    //     method: "GET"
    // })
    
    // const testimonials = await response.json() // bisa juga seperti ini tanpa Promise
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