import { apiUrl, tabbed, selectedTabIndex, setCounted } from './global.js'
import counter from './counter.js'

const getSites = async () => {
    const response     = await fetch(apiUrl)
    const json         = await response.json()
    const topics       = json.topics
    const posts        = json.posts
    let topicsMarkup   = ""
    let archivesMarkup = ""
    let pagesMarkup    = ""

    posts.map(post => {
        post.topics.map(topicId => {
            topics.map(topic => {
                if(topic.ID === topicId && post.status === 'published') {
                    topic.posts ? topic.posts += 1 : topic.posts = 1
                }
            })
        })
    })

    topics.map(topic => topicsMarkup += `
        <article
            id="${topic.slug}"
            role="contentinfo"
            aria-label="topic"
        >
            <h3>${topic.title}</h3>
            <p>
                <span
                    class="post-count"
                    data-count="${topic.posts}"
                >
                    0
                </span>
                ${topic.posts === 1 ? `post` : `posts`}
            </p>
        </article>
    `)
    posts.map(post => archivesMarkup += post.status === 'archived' ? `
        <article
            id="${post.slug}"
            role="contentinfo"
            aria-label="archive"
        >
            <img src="${post.thumbnail}" />
            <p>${post.excerpt}</p>
        </article>
    ` : '')
    posts.map(post => pagesMarkup += post.type === 'page' && post.status === 'published' ? `
        <article
            id="${post.slug}"
            role="contentinfo"
            aria-label="page"
            style="background-image: url(${post.thumbnail})"
        >
            <div>
                <h3>
                    <i class="far ${post.icon}"></i>
                    ${post.title}
                </h3>
                <p>${post.excerpt}</p>
            </div>
        </article>
    ` : '')

    tabbed.querySelector('#section-topics').innerHTML   = topicsMarkup
    tabbed.querySelector('#section-archives').innerHTML = archivesMarkup
    tabbed.querySelector('#section-pages').innerHTML    = pagesMarkup

    if (selectedTabIndex === 0) {
        counter()
        setCounted()
    }
}

export default getSites