const searchForm = document.querySelector('.search')
const topButton = document.querySelector('button[type=tophead]')
const instructionsHeader = document.querySelector('.instructions')
const cardNews = document.getElementById("card-news")
const input = document.querySelector('.input')
const newsList = document.querySelector('.news-list')
const apiKey = 'd95758a11003496b9f9b351754ef5dce'

topButton.addEventListener("click",retrieveToplines)
searchForm.addEventListener('submit', retrieveSearch)

function retrieveToplines(e) {
    e.preventDefault()

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d95758a11003496b9f9b351754ef5dce`
    fetchURL(url)
}

function retrieveSearch (e){
    newsList.innerHTML = ''

    e.preventDefault()

    let topic = input.value;
    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`

    if (topic)
        fetchURL(url)

}

function fetchURL(url) {
    cardNews.style.display = "block"
    instructionsHeader.style.display = "none"

    fetch(url).then((res => {
        return res.json()
    })).then((data)=> {
        data.articles.forEach(article => {

            console.log(data)
            let image = document.createElement('img')
            let li = document.createElement('li')
            let a = document.createElement('a')
            let p = document.createElement('p')
            a.setAttribute('href', article.url)
            a.setAttribute('target', '_blank') // keeps page open when clicking link
            p.className = "date"

            let newsDate = article.publishedAt        

            p.textContent = formatDate(newsDate)
            a.textContent = article.title
            image.src = article.urlToImage
            
            li.appendChild(image)
            li.appendChild(a)
            li.appendChild(p)
            newsList.appendChild(li)

        })
    })
}

// convert news API format to DD MM YY
// https://www.youtube.com/watch?v=tCdHPVibS68
function formatDate(newsDate) {
    let timestamp = new Date(newsDate).getTime()
    let Day = new Date(timestamp).getDate()
    let Month = new Date(timestamp).getMonth() + 1
    let Year = new Date(timestamp).getFullYear()
    let newDateFormat = `${Day}/${Month}/${Year}`
    
    return newDateFormat
}