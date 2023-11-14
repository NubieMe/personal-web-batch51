// blob is termporary limited to certain browser

// function showMeHelloWorld() {
//     const container = document.getElementById("contents")
//     container.innerHTML = '<p>Hello World</p>'
// }

// LOOPING : FOR, WHILE, DO-WHILE

// FOR -> perulangan yang kamu sudah tau kapan harus berhenti
// for(let index = 0; index < 10; index++) { 
//     console.log("ini adalah index", index)
// }

// WHILE -> perulangan yang belum tentu kamu tau kapan harus berhenti (berdasarkan data dinamis)

// DO WHILE -> perulangan yang jalan dulu sekali, baru dicek

let dataProject = []

function submitProject(event) {
    event.preventDefault()

    let inputName = document.getElementById("inputName").value
    let inputStart = document.getElementById("inputStart").value
    let inputEnd = document.getElementById("inputEnd").value
    let inputDesc = document.getElementById("inputDesc").value
    let inputTech1 = document.getElementById("inputTech1").checked
    let inputTech2 = document.getElementById("inputTech2").checked
    let inputTech3 = document.getElementById("inputTech3").checked
    let inputTech4 = document.getElementById("inputTech4").checked
    let inputImage = document.getElementById("inputImage").files

    console.log("name", inputName)
    console.log("start", inputStart)
    console.log("end", inputEnd)
    console.log("desc", inputDesc)
    console.log("tech", inputTech1, inputTech2, inputTech3, inputTech4)
    
    inputImage = URL.createObjectURL(inputImage[0])
    console.log("image", inputImage)
    

    function showNode(){
        if(inputTech1 === true){
            const node = `<img src="assets/icon/node.png" style="width: 30px;"/>`
            return node
        }   else if(inputTech1 === false) {
            return ""
        }
    }

    function showReact(){
        if(inputTech2 === true){
            const react = `<img src="assets/icon/react.png" style="width: 30px;"/>`
            return react
        }   else if(inputTech2 === false) {
            return ""
        }
    }

    function showNext(){
        if(inputTech3 === true){
            const next = `<img src="assets/icon/next.png" style="width: 30px;"/>`
            return next
        }   else if(inputTech3 === false) {
            return ""
        }
    }

    function showType(){
        if(inputTech4 === true){
            const type = `<img src="assets/icon/typescript.png" style="width: 30px;"/>`
            return type
        }   else if(inputTech4 === false) {
            return ""
        }
    }


    function getDuration(){
        const date1 = new Date(inputStart)
        const date2 = new Date(inputEnd)
    
        const inTime = date2.getTime() - date1.getTime()
        
        const duration = inTime

        const durationDay = Math.floor(duration / 1000 / 60 / 60 / 24)
        const durationMonth = Math.floor(duration / 1000 / 60 / 60 / 24 / 30)
        const durationYear = Math.floor(duration / 1000 / 60 / 60 / 24 / 30 / 12)
    
        if(durationYear > 0) {
            return `${durationYear} tahun`
        } else if(durationMonth > 0){
            return `${durationMonth} bulan`
        } else {   
            return `${durationDay} hari`
        }
    }


    const project = {
        name: inputName,
        description: inputDesc,
        image: inputImage,
        duration: getDuration(),
        nodeJS: showNode(),
        reactJS: showReact(),
        nextJS: showNext(),
        typescript: showType(),
        postAt: new Date(),
        author: "Fahmi Abdul Hadi"
    }

    dataProject.push(project)
    console.log("dataProject", dataProject)
    renderProject()
}


function renderProject() {
    // document.getElementById("contents").innerHTML = ''
    
    for (let index = 0; index < dataProject.length; index++) {
        
        document.getElementById("contents").innerHTML += `
            <div class="project-list-item">
                <div class="project-image">
                    <img src="${dataProject[index].image}" alt="" />
                </div>
                <div class="project-content">
                    <h4>
                        <a href="project-detail.html" target="_blank">${dataProject[index].name}</a>
                    </h4>
                    <div class="detail-project-content">
                        durasi ${dataProject[index].duration} | ${dataProject[index].author}
                    </div>
                    <p>
                        ${dataProject[index].description}
                    </p>
                    <div id="tech">
                        ${dataProject[index].nodeJS}
                        ${dataProject[index].reactJS}
                        ${dataProject[index].nextJS}
                        ${dataProject[index].typescript}
                    </div>
                    <div class="detail-project-content">
                        ${getFullTime(dataProject[index].postAt)}
                    </div>
                    <div class="detail-project-content">
                        ${getDistanceTime(dataProject[index].postAt)}
                    </div>
                    <div class="btn-group">
                        <button class="btn-edit">Edit</button>
                        <button class="btn-del">Delete</button>
                    </div>
                </div>
            </div>`
    }
}


function getFullTime(tanggal) {
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const date = tanggal.getDate()
    const month = tanggal.getMonth()
    const year = tanggal.getFullYear()
    let hours = tanggal.getHours()
    let minutes = tanggal.getMinutes()

    if (hours <= 9) {
        hours = "0" + hours
    }

    if (minutes <= 9) {
        minutes = "0" + minutes
    }

    return `${date} ${monthList[month]} ${year} ${hours}:${minutes}`
}

function getDistanceTime(time) {
    const timeNow = new Date().getTime()
    const timePosted = time

    const distance = timeNow - timePosted

    const distanceSeconds = Math.floor(distance / 1000) 
    const distanceMinutes = Math.floor(distance / 1000 / 60)
    const distanceHours = Math.floor(distance / 1000 / 60 / 60)
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)

    console.log("distanceSeconds", distanceSeconds)
    console.log("distanceMinutes", distanceMinutes)
    console.log("distanceHours", distanceHours)
    console.log("distanceDay", distanceDay)

    if(distanceDay > 0) {
        return `${distanceDay} day ago`
    } else if(distanceHours > 0) {
        return `${distanceHours} hours ago`
    } else if(distanceMinutes > 0) {
        return `${distanceMinutes} minutes ago`
    } else {
        return `${distanceSeconds} seconds ago `
    }   
}

setInterval(() => {
    renderProject()
}, 1000)