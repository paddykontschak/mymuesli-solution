import { tablist, tabs, panels, selectedTabIndex } from './modules/global.js'
import getSites from './modules/sites.js'
import switchTab from './modules/tabs.js'

getSites()

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