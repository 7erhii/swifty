const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type

    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i'
            ? e.target
            : e.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToclickboard(e.target.textContent)
    }
})

function setRandomColors() {
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = chroma.random()

        if (isLocked) {
            return 
        }

        col.style.backgroundColor = color
        setTextColor(text, color.hex())
        setTextColor(button, color.hex())
        text.textContent = color.hex()
    })
}

cols.forEach((col) => {
    const text = col.querySelector('h2')
    const button = col.querySelector('button')

    const color = chroma.random()

    text.textContent = color.hex()
    col.style.backgroundColor = color.hex()

    setTextColor(text, color.hex())
    setTextColor(button, color.hex())
})

function setTextColor(element, bgColor) {
    const luminance = chroma(bgColor).luminance()
    if (luminance > 0.5) {
        element.style.color = '#000'
    } else {
        element.style.color = '#fff'
    }
}


function copyToclickboard(text) {
    return navigator.clipboard.writeText(text)
}