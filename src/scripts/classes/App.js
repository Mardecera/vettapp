import { Manager } from "./Manager.js"
import * as DOM from '../functions/selectors.js'
import * as FUNCT from '../functions/functions.js'

export class App{
    constructor() {
        this.MANAGER = new Manager()
        this.init()
    }

    init() {
        window.onload = () => {
            this.initInput()
            this.MANAGER.loadQuotes()

            DOM.form.addEventListener('submit', (event) => {
                event.preventDefault()
                this.addQuote()
            })
            DOM.mode.addEventListener('click', (event) => {
                event.preventDefault()
                DOM.mode.classList.toggle('active')
                DOM.body.classList.toggle('light')
            })
        }
    }

    initInput() {
        DOM.inputCurrentDate.value = FUNCT.getDate()
        DOM.inputCurrentTime.value = FUNCT.getTime()
    }

    getQuoteForm() {
        const data = {
            petName: DOM.inputPetName.value,
            petOwner: DOM.inputPetOwner.value,
            ownerPhone: DOM.inputOwnerPhone.value,
            ownerEmail: DOM.inputOwnerEmail.value,
            currentDate: DOM.inputCurrentDate.value,
            currentTime: DOM.inputCurrentTime.value,
            petSymptom: DOM.inputPetSymptom.value,
            id: Date.now(),
            [ Symbol.iterator ]: function* () {
                for (let key in this){ yield [key, this[key]] }
            }
        }

        return data
    }

    addQuote() {
        const editID = +DOM.form.getAttribute('data-id')
        const quoteData = this.getQuoteForm()

        this.MANAGER.addQuote(quoteData, editID)
        DOM.form.setAttribute('data-id', '')
    }
}
