const apiUrl = 'http://localhost:8000/api.php'
const tabbed = document.querySelector('.tabbed');

const getSites = async () => {
    const response = await fetch(apiUrl)
    const json = await response.json()
    const topics = json.topics
    const posts = json.posts
    let topicsMarkup = ""
    
    topics.map(topic => topicsMarkup += `<p>${topic.title}</p>`)

    // console.log(topics)
    // console.log(posts)
    
    tabbed.querySelector('#section-topics').innerHTML = topicsMarkup

    // console.log(json)
}

getSites()
