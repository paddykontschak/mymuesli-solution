const apiUrl  = 'http://localhost:8000/api.php'
const tabbed  = document.querySelector('.tabbed')
const tablist = tabbed.querySelector('ul')
const tabs    = tablist.querySelectorAll('a')
const panels  = tabbed.querySelectorAll('[id^="section"]')

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
        <article>
            <h3>${topic.title}</h3>
            <p>${topic.posts} ${topic.posts === 1 ? `post` : `posts`}</p>
        </article>
    `)
    posts.map(post => archivesMarkup += post.status === 'archived' ? `
        <article>
            <img src="${post.thumbnail}" />
            <p>${post.excerpt}</p>
        </article>
    ` : '')
    posts.map(post => pagesMarkup += post.type === 'page' && post.status === 'published' ? `
        <article style="background-image: url(${post.thumbnail})">
            <div>
                <h3>
                    <i class="far ${post.icon}"></i>
                    ${post.title}
                </h3>
                <p>${post.excerpt}</p>
            </div>
        </article>
    ` : '')

    tabbed.querySelector('#section-topics').innerHTML = topicsMarkup
    tabbed.querySelector('#section-archives').innerHTML = archivesMarkup
    tabbed.querySelector('#section-pages').innerHTML = pagesMarkup
}

getSites()

// source: https://codepen.io/heydon/pen/veeaEa
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
}

Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab')
    tab.setAttribute('id', 'tab' + (i + 1))
    tab.setAttribute('tabindex', '-1')

    tab.addEventListener('click', event => {
        event.preventDefault()
        let currentTab = tablist.querySelector('[aria-selected]')

        if (event.currentTarget !== currentTab) {
            switchTab(currentTab, event.currentTarget)
        }
    });

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
    });
});

Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel')
    panel.setAttribute('tabindex', '-1')
    panel.setAttribute('aria-labelledby', tabs[i].id)
    panel.hidden = true
});

const selectedTabIndex = Math.floor(Math.random() * tabs.length)
tabs[selectedTabIndex].removeAttribute('tabindex')
tabs[selectedTabIndex].setAttribute('aria-selected', 'true')
panels[selectedTabIndex].hidden = false