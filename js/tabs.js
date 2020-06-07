import { tabs, panels, setCounted } from './global.js'
import counter from './counter.js'

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
        setCounted()
    }
}

export default switchTab