export const apiUrl           = 'http://localhost:8000/api.php'
export const tabbed           = document.querySelector('.tabbed')
export const tablist          = tabbed.querySelector('ul')
export const tabs             = tablist.querySelectorAll('a')
export const panels           = tabbed.querySelectorAll('[id^="section"]')
export const selectedTabIndex = Math.floor(Math.random() * tabs.length)
export let counted = false

export function setCounted() {
    counted = true
}