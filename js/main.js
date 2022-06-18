const list = document.querySelector(".books__section")
const bookItem = document.querySelector(".books__section--item")
const selectList = document.querySelector(".main__left--list")
let selectTemlate = document.querySelector("#select__template");
const resulte = document.querySelector(".search__section--result")
let bookTemlate = document.querySelector("#book__template");

const selectCollect = []
const storage = window.localStorage




const API = async() => {
    const dataBase = await fetch("https://www.googleapis.com/books/v1/volumes?q=python")
    const base = await dataBase.json()
    const data = base.items
    renderSectionss(data)
    renderData(data, list)
}
API();


const renderData = (data, list) => {
    // resulte.textContent = base.totalItems
    list.innerHTML = null
    data.forEach(item => {
        let cloneBookTemplate = bookTemlate.content.cloneNode("true")
        cloneBookTemplate.querySelector(".books__section--item-center-book").textContent = `${ item.volumeInfo.title }`
        cloneBookTemplate.querySelector(".books__section--item-center-author").textContent = `${ item.volumeInfo.authors }`
        cloneBookTemplate.querySelector(".book__img").src = `${ item.volumeInfo.imageLinks.thumbnail }`
        cloneBookTemplate.querySelector(".books__section--item").id = `${item.id}`
        cloneBookTemplate.querySelector(".bookmark").dataset.id = `${item.id}`

        list.append(cloneBookTemplate)

    })
}
const renderSections = (arr, element) => {
    let fragment = document.createDocumentFragment()
    arr.forEach(item => {
        let cloneSelectTemplate = selectTemlate.content.cloneNode("true")
        cloneSelectTemplate.querySelector("#book__name").textContent = `${ item.volumeInfo.title }`
        cloneSelectTemplate.querySelector(".book__author").textContent = `${ item.volumeInfo.authors }`
        cloneSelectTemplate.querySelector(".book__delete").dataset.id = `${item.id}`
        fragment.append(cloneSelectTemplate)
    })
    element.append(fragment)
}

const renderSectionss = (data) => {
    list.addEventListener("click", (evt) => {
        if (evt.target.matches(".bookmark")) {
            const foundIndex = data.find((item) => item.id === evt.target.dataset.id)
            if (!selectCollect.includes(foundIndex)) {
                selectCollect.push(foundIndex)
                selectList.innerHTML = null;
                renderSections(selectCollect, selectList)
                window.localStorage.setItem("books", JSON.stringify(selectCollect))
            }
        }
    })
}


selectList.addEventListener("click", evt => {
    if (evt.target.matches(".book__delete")) {
        const foundIndex = selectCollect.findIndex(item => evt.target.dataset.id === item.id)
        selectCollect.splice(foundIndex, 1)
        selectList.innerHTML = null
        renderSections(selectCollect, selectList)
        window.localStorage.setItem("books", JSON.stringify(selectCollect))
    }
})

JSON.parse(storage.getItem("books")) ? JSON.parse(storage.getItem("books")) : selectCollect;