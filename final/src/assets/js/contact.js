function submitData() {
    const inputName = document.getElementById("inputName").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputPhone = document.getElementById("inputPhone").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessage = document.getElementById("inputMessage").value

    const a = document.createElement(`a`)

    if (!inputName || !inputEmail || !inputPhone || !inputSubject || !inputMessage){
        return
    }

    a.href= `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`
    a.click()
}