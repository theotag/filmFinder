const searchAPI = document.getElementById("img-verify-API")
const hidden = document.getElementById("hidden")
const enterAPI = document.getElementById("enter-API")
const searchFilm = document.getElementById("submit-btn")



const verifyAPI = async () => {
    keyAPI = document.getElementById("API-name")
    const response = await fetch(`https://www.omdbapi.com/?t=batman&apikey=${keyAPI.value}`);
    const key = await response.json();
    if (key.Response === "False") {
        keyAPI.placeholder = "Wrong key API"
        return
    }else
    hidden.style.display = "block"
    enterAPI.style.display = "none"

}  
 


const enterNameAPI = (event) => {
    if (event.keyCode === 13 && hidden.style.display !== "none") {
        verifyAPI()
    }else {
        return
    }
}
searchAPI.addEventListener("click", verifyAPI)
window.addEventListener("keydown",enterNameAPI)



const searchFilmsByS = async () => {
    const search = document.querySelector(".search")
    search.innerText = "recherche en cours..."
    const error = document.querySelector(".error")

    const keyAPI = document.getElementById("API-name")
    const nameFilms = document.getElementById("search")
    const response = await fetch(`https://www.omdbapi.com/?s=${nameFilms.value}&apikey=${keyAPI.value}`);
    const key = await response.json();

    const card = document.querySelectorAll('.card')
    for (let i = 0; i < card.length; i++) {
        card[i].remove()
        
    }
    if (key.Response === "False") { 
        search.innerText = ""    
        error.innerText = "Sorry but there is no result"
    }else{
    if (error.innerText === "Sorry but there is no result") {
        error.innerText = ""
    } 
    search.innerText = ""
    key.Search.forEach(el => 
      searchFilmsByT(el)
      
   );
    }
}
const searchFilmsByT = async (el) => {
    const keyAPI = document.getElementById("API-name")
    const responses = await fetch(`https://www.omdbapi.com/?t=${el.Title}&apikey=${keyAPI.value}`);
    const key2 = await responses.json();

        

    let div = document.createElement('div');
    div.className = "card";  
    document.querySelector('section').append(div);

    let div1 = document.createElement('div');
    div1.className = "img"
    div.insertAdjacentElement('afterbegin', div1)

    let img = document.createElement('img')
    img.src = key2.Poster
    img.className = "imgFilms"
    div1.insertAdjacentElement('afterbegin', img)

    let div2 = document.createElement('div')
    div2.className= "text"
    div1.insertAdjacentElement('afterend', div2);

    let h1 = document.createElement('h1')
    h1.innerText = key2.Title
    div2.insertAdjacentElement('afterbegin', h1)

    let p = document.createElement('p')
    p.innerText = key2.Released
    p.style.marginBottom = "15px"
    h1.insertAdjacentElement('afterend', p)
    
    let p1 = document.createElement('p')
    p1.innerText = key2.Plot
    p.insertAdjacentElement('afterend', p1)




}
const enterNameFilm = (event ) => {
    if (event.keyCode === 13 && enterAPI.style.display === "none") {
        event.preventDefault()
        searchFilmsByS()
    }else{
       return
    }
}

searchFilm.addEventListener("click",searchFilmsByS)
window.addEventListener("keydown",enterNameFilm)

