const apiUrl = 'http://localhost:8000/api.php'

const getSites = async () => {
    const response = await fetch(apiUrl)
    const json = await response.json()
    const topics = json.topics
    const posts = json.posts

    // console.log(topics)
    // console.log(posts)

    // console.log(json)
}

getSites()
