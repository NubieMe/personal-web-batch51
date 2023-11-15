class Testimonial {
    constructor(name, quote, image) {
        this.name = name
        this.quote = quote
        this.image = image
    }

    html() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">"${this.quote}"</p>
                <p class="author">- ${this.name}</p>
            </div>
        `
    }
}

class CompanyTestimonial extends Testimonial {
    constructor(name, quote, image) {
        super(name, quote, image)
        this.name = name + ` Company`
    }


}

const testimonials = [
    new Testimonial(
        `Andra`,
        `Pengerjaan projectnya tepat sesuai dengan yang saya inginkan.`,
        `https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    ),
    new Testimonial(
        `Bagas`,
        `Hasil project melebihi ekspektasi saya.`,
        `https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    ),
    new CompanyTestimonial(
        `Dumbways`,
        `Peserta lulusan kami memang bisa diandalkan.`,
        `assets/image/dumbways.png`
    )
]

// const testimonial1 = new Testimonial(`Andra`, `Pengerjaan projectnya tepat sesuai dengan yang saya inginkan.`, `https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`)
// const testimonial2 = new Testimonial(`Bagas`, `Hasil project melebihi ekspektasi saya.`, `https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`)
// const testimonial3 = new CompanyTestimonial(`Dumbways`, "Peserta lulusan kami memang yang terbaik.", `assets/image/dumbways.png`)

// const testimonials = [testimonial1, testimonial2, testimonial3]

let testimonialHTML = ``
for(let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML