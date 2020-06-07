const apiUrl           = 'http://localhost:8000/api.php'
const tabbed           = document.querySelector('.tabbed')
const tablist          = tabbed.querySelector('ul')
const tabs             = tablist.querySelectorAll('a')
const panels           = tabbed.querySelectorAll('[id^="section"]')
const selectedTabIndex = Math.floor(Math.random() * tabs.length)
let counted            = false

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
        counted = true
    }
}

getSites()

animateValue = (el, count) => {
    const duration = 1000
    const range = count - 0
    const min = 50
    const start = new Date().getTime()
    const end = start + duration
    let step = Math.abs(Math.floor(duration / range))
    let timer

    step = Math.max(step, min)

    const run = () => {
        const now = new Date().getTime()
        const remaining = Math.max((end - now) / duration, 0)
        const value = Math.round(count - (remaining * range))

        el.innerHTML = value

        if (value == count) {
            clearInterval(timer)
        }
    }

    timer = setInterval(run, step)
    run()
}

const counter = () => {
    const counter = [...tabbed.querySelectorAll('.post-count')]

    if (!counted) {
        counter.map(num => animateValue(num, parseInt(num.getAttribute('data-count'))))
    }
}

const switchTab = (oldTab, newTab) => {
    newTab.focus()
    newTab.removeAttribute('tabindex')
    newTab.setAttribute('aria-selected', 'true')

    oldTab.removeAttribute('aria-selected')
    oldTab.setAttribute('tabindex', '-1')

    let index    = Array.prototype.indexOf.call(tabs, newTab)
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab)

    panels[oldIndex].hidden = true
    panels[index].hidden    = false

    if (newTab.id === 'tab1') {
        counter()
        counted = true
    }
}

tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab')
    tab.setAttribute('id', 'tab' + (i + 1))
    tab.setAttribute('tabindex', '-1')

    tab.addEventListener('click', event => {
        event.preventDefault()
        let currentTab = tablist.querySelector('[aria-selected]')

        if (event.currentTarget !== currentTab) {
            switchTab(currentTab, event.currentTarget)
        }
    })

    tab.addEventListener('keydown', event => {
        let index = Array.prototype.indexOf.call(tabs, event.currentTarget)
        let direction

        switch (event.which) {
            case 37:
                direction = index - 1
                break
            case 39:
                direction = index + 1
                break
            case 40:
                direction = 'down'
                break
            default:
                direction = null
                break
        }

        if (direction !== null) {
            event.preventDefault();

            if (direction === 'down') {
                panels[i].focus()
            } else if (tabs[direction]) {
                switchTab(event.currentTarget, tabs[direction])
            } else {
                void 0
            }
        }
    })
})

panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel')
    panel.setAttribute('tabindex', '-1')
    panel.setAttribute('aria-labelledby', tabs[i].id)
    panel.hidden = true
})

tabs[selectedTabIndex].removeAttribute('tabindex')
tabs[selectedTabIndex].setAttribute('aria-selected', 'true')
panels[selectedTabIndex].hidden = false