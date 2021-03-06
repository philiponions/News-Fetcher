const searchForm = document.querySelector('.search')
const topButton = document.querySelector('button[type=tophead]')
const instructionsHeader = document.querySelector('.instructions')
const cardNews = document.getElementById("card-news")
const input = document.querySelector('.input')
const newsList = document.querySelector('.news-list')
const apiKey = 'df08cd7b50114542295706dbc5bf3b83'

topButton.addEventListener("click",retrieveToplines)
searchForm.addEventListener('submit', retrieveSearch)

function retrieveToplines(e) {
    newsList.innerHTML = ''
    e.preventDefault()
    let url = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&country=ca`
    fetchURL(url)
    console.log("Retrieving top head lines")
}

function retrieveSearch (e){
    newsList.innerHTML = ''

    e.preventDefault()

    let topic = input.value;
    let url = `https://gnews.io/api/v4/search?q=${topic}&token=${apiKey}&country=ca`
    // let url = `https://newsapi.in/newsapi/news.php?key=${apiKey}&category=${topic}`
    if (topic)
        fetchURL(url)

}

function fetchURL(url) {
    cardNews.style.display = "block"
    instructionsHeader.style.display = "none"

    fetch(url).then((res => {
        return res.json()
    })).then((data)=> {
        titles = []
        data.articles.forEach(article => {
            // if (li.filter(article.title => ))

            console.log("titles so far:")
            console.log(titles)
            let image = document.createElement('img')
            let li = document.createElement('li')
            let a = document.createElement('a')
            let p = document.createElement('p')
            a.setAttribute('href', article.url)
            a.setAttribute('target', '_blank') // keeps page open when clicking link
            p.className = "date"

            let newsDate = article.publishedAt        
            console.log(newsDate)
            p.textContent = formatDate(newsDate)
            a.textContent = article.title

            if (titles.includes(article.title))
                return
            
            titles.push(article.title)

            image.src = article.image
            
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