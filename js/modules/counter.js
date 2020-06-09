import { tabbed, counted } from './global.js'
import animateValue from './animate.js'

const counter = () => {
    const counter = [...tabbed.querySelectorAll('.post-count')]

    if (!counted) {
        counter.map(num => animateValue(num, parseInt(num.getAttribute('data-count'))))
    }
}

export default counter