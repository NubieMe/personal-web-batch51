//tipe data:
//string -> "seperti ini" atau 'ini atau `ini juga bisa`
//integer -> 1234
//float -> 12.34

//array -> ["fahmi", 123, 12.34] tipe data gabungan, ada key berupa index dimulai dari 0

//object ->  {      object butuh key    
//    nama: "fahmi"
//    alamat: "bogor"
//}


//array of object[{

// }]


//let(data bisa diubah/inisialisasi ulang)
//const(tidak bisa diubah/inisialisasi ulang)
//var(obsolete, not recommended)

// let name = ""
// let umur = 27
// console.log("selamat datang di website saya " + name)
// console.log(`selamat datang di website saya ${name}, umur saya ${umur} tahun`)

//Operator (+ - * / %)
// let angka1 = 10
// let angka2 = 15

// & sisa dari hasil pembagian

// console.log(angka1 + angka2)

//Condition (IF ELSE | SWITCH CASE)


//Function

//named function
//function Hello() {
//     const name = "Fahmi Abdul Hadi"
//     console.log(`hello ${name}`)
// }
// hello()

//arrow function


//challenge anonymous function
// function() {
//     console.log(`selamat datang ${name}`)
// }


//function dengan parameter dinamis -> output : Hello, nama
// let name = "Fahmi"
// let tempat = "Bogor"

// function hello(nama) {
//     console.log(`hello ${nama} alamat saya di ${alamat}`)
// }

// hello(nama, tempat)

function submitData() {
    const inputName = document.getElementById("inputName").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputPhone = document.getElementById("inputPhone").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessage = document.getElementById("inputMessage").value
    
    //kondisi
    if(!inputName){ //or (inputName == "")
        alert(`Nama tidak boleh kosong`)
    }   else if (!inputEmail){
        alert(`Email tidak boleh kosong`)
    }   else if (!inputPhone){
        alert(`Phone tidak boleh kosong`)
    }   else if (!inputSubject){
        alert(`Subject tidak boleh kosong`)
    }   else if (!inputMessage){
        alert(`Message tidak boleh kosong`)
    }   else
    
    console.log("name : ",inputName)
    console.log("email : ",inputEmail)
    console.log("phone : ",inputPhone)
    console.log("subject : ",inputSubject)
    console.log("message : ",inputMessage)

    let a = document.createElement(`a`)

    a.href= `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`
    a.click()    
}

//1 == "1" hanya cek value 1 === "1" juga cek tipe data
//alert() must use string