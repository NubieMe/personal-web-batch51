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
    return `
        <div class="col">
            <div class="card w-100">
                <img src="${item.image}" class="card-img-top w-100%" style="height: 200px; object-fit: cover;" alt="">
                <div class="card-body">
                    <p class="fst-italic">"${item.quote}"</p>
                    <p class="fw-bold text-end">- ${item.name}</p>
                    <p class="fw-bold text-end">${item.rating} <i class="fa-solid fa-star"></i></p>
                </div>
            </div>
        </div>`
}

async function allTestimonials() {
    let testimonialHTML = ``
    const testimonials = await promise
    // const response = await fetch('https://api.npoint.io/4fb5cdd7eb211bdb190d', { method: "GET" })
    
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
    // const response = await fetch('https://api.npoint.io/4fb5cdd7eb211bdb190d', { method: "GET" })
    
    // const testimonials = await response.json() // bisa juga seperti ini tanpa Promise
    const testimonialFiltered = testimonials.filter((item) => {
        return item.rating === rating
    })

    if (testimonialFiltered.length === 0) {
        testimonialHTML = `<h3 class="text-center"> Data not found! </h3>`
    } else {
        testimonialFiltered.forEach((item) => {
            testimonialHTML += html(item)
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML
}