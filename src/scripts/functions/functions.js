import * as DOM from './selectors.js' 

function createElementHTML({ type = 'div', clases = [], textContent = '', src = '', attribs = [] } = {}) {
    const element = document.createElement(type)

    clases.forEach(clas => element.classList.add(clas))
    attribs.forEach(attribute => element.setAttribute(attribute[0], attribute[1]))
    if (!!src) { element.src = src }

    element.textContent = textContent
    return element
}

function getDate() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()

    const date = {
        year,
        month: month < 10 ? `0${month}` : month,
        day: day < 10? `0${day}` : day
    }
    return `${ date.year }-${ date.month }-${ date.day }`
}

function getTime() {
    const time = new Date().toLocaleTimeString().split(':')
    if (+time[0] < 10) { time[0] = `0${time[0]}` }
    return `${time[0]}:${time[1]}`
}

function fillInFieldsTest({ petName, petOwner, ownerPhone, ownerEmail, currentDate, currentTime, petSymptom }) {
    DOM.inputPetName.value = petName
    DOM.inputPetOwner.value = petOwner
    DOM.inputOwnerPhone.value = ownerPhone
    DOM.inputOwnerEmail.value = ownerEmail
    DOM.inputCurrentDate.value = currentDate
    DOM.inputCurrentTime.value = currentTime
    DOM.inputPetSymptom.value = petSymptom
}

export { createElementHTML, getDate, getTime, fillInFieldsTest }