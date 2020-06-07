const animateValue = (el, count) => {
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

export default animateValue