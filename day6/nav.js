
let isOpen = false
function openNav() {
    let navToggleContent = document.getElementById("toggle")
    navToggleContent.classList.toggle("show")
}

if(window.innerHeight < window.innerWidth && navToggleContent.classList.contains("show")){
    navToggleContent.classList.remove("show")
}

console.log(window.innerWidth)

