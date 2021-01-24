export default function footerDate() {
    const dateSpan = document.querySelector('span.date')

    let date = new Date()


    let year = date.getFullYear()

    dateSpan.textContent =  `${year}`

}
