import * as FUNC from '../functions/functions.js'
import * as DOM from '../functions/selectors.js'

const CONFIRMATION_MESSAGE = 'Do you want to delete this quote?'

export class UI{
    showQuotes(quotes = []) {
        this.cleanListQuotes()
        quotes.forEach(quote => { this.showQuote(quote) })
    }

    showQuote(quoteData) {
        this.cleanForm()
        const quoteHTML = this.getQuote(quoteData)
        DOM.quotesList.appendChild(quoteHTML)
    }

    confirmation(id, quoteHTML) {
        const confirmationBG = FUNC.createElementHTML({ clases: ['confirmation-bg'] })
        const confirmation = FUNC.createElementHTML({ clases: ['confirmation'] })
        const confirmationBody = this.getConfirmationBody(CONFIRMATION_MESSAGE)
        const confirmationButtons = this.getConfirmationButttons(confirmationBG, id, quoteHTML)

        confirmation.appendChild(confirmationBody)
        confirmation.appendChild(confirmationButtons)
        confirmationBG.appendChild(confirmation)
        DOM.container.appendChild(confirmationBG)
    }

    getQuote(quoteData) {
        const quoteHTML = FUNC.createElementHTML({clases: ['quote']})
        const quoteHead = this.getQuoteHead(quoteData)
        const quoteBody = this.getQuoteBody(quoteData.petSymptom)
        const quoteButtons = this.getQuoteButtons(quoteData, quoteHTML)

        quoteHTML.appendChild(quoteHead)
        quoteHTML.appendChild(quoteBody)
        quoteHTML.appendChild(quoteButtons)

        return quoteHTML
    }

    getQuoteHead({ petName, petOwner, ownerPhone, ownerEmail, currentDate }) {
        const head = FUNC.createElementHTML({ clases: ['quote-head'] })
        const divPicture = FUNC.createElementHTML({ clases: ['head-profile'] })
        const picture = FUNC.createElementHTML({
            type: 'img',
            clases: ['profile-picture'],
            src: './public/images/_profile_dog.svg'
        })
        const divInfo = FUNC.createElementHTML({ clases: ['head-info'] })
        const divPet = FUNC.createElementHTML({ clases: ['info-pet'], textContent: petName })
        const divOwner = FUNC.createElementHTML({ clases: ['info-owner'] })
        const preOwnerName = FUNC.createElementHTML({
            type: 'pre',
            textContent: petOwner
        })
        const divOwnerName = FUNC.createElementHTML({ clases: ['owner-name']})
        const divOwnerPhone = FUNC.createElementHTML({ clases: ['owner-phone'] })
        const divOwnerPhoneIcon = FUNC.createElementHTML({
            type: 'i',
            clases: ['fal', 'fa-phone']
        })
        const divOwnerEmail = FUNC.createElementHTML({ clases: ['owner-email'] })
        const divOwnerEmailIcon = FUNC.createElementHTML({
            type: 'i',
            clases: ['fal', 'fa-envelope']
        })

        divOwnerEmail.appendChild(divOwnerEmailIcon)
        divOwnerPhone.appendChild(divOwnerPhoneIcon)
        divOwnerName.appendChild(preOwnerName)
        divOwner.appendChild(divOwnerName)
        divOwner.appendChild(divOwnerPhone)
        divOwner.appendChild(divOwnerEmail)
        divInfo.appendChild(divPet)
        divInfo.appendChild(divOwner)
        divPicture.appendChild(picture)
        head.appendChild(divPicture)
        head.appendChild(divInfo)

        return head
    }

    getQuoteBody(petSymptom) {
        const body = FUNC.createElementHTML({ textContent: petSymptom, clases: ['quote-body'] })
        return body
    }

    getQuoteButtons(quoteData, quoteHTML) {
        const quoteButtons = FUNC.createElementHTML({
            clases: ['quote-buttons']
        })
        const quoteButtonDelete = this.getQuoteButtonDelete(quoteData.id, quoteHTML)
        const quoteButtonEdit = this.getQuoteButtonEdit(quoteData)

        quoteButtons.appendChild(quoteButtonEdit)
        quoteButtons.appendChild(quoteButtonDelete)

        return quoteButtons
    }

    getQuoteButtonDelete(id, quoteHTML) {
        const button = FUNC.createElementHTML({
            type: 'button',
            textContent: 'x',
            attribs: [['data-id', id]],
            clases: ['btn-delete']
        })
        button.onclick = (event) => {
            this.confirmation(id, quoteHTML)
            button.disabled = true
            button.disabled = false
        }
        return button
    }

    getQuoteButtonEdit(quoteData) {
        const icon = FUNC.createElementHTML({
            type: 'i',
            clases: ['fal', 'fa-edit']
        })
        const button = FUNC.createElementHTML({
            type: 'button',
            clases: ['btn-edit']
        })
        button.appendChild(icon)
        button.onclick = () => {
            DOM.form.setAttribute('data-id', quoteData.id)
            FUNC.fillInFieldsTest(quoteData)
        }
        return button
    }

    getConfirmationBody(message) {
        const container = FUNC.createElementHTML({
            clases: ['confirmation-body']
        })
        container.textContent = message

        return container
    }

    getConfirmationButttons(content, quoteId, quoteHTML) {
        const container = FUNC.createElementHTML({ clases: ['confirmation-btns'] })
        const buttonAccept = FUNC.createElementHTML({
            type: 'button',
            clases: ['btn-accept'],
            textContent: 'Accept'
        })
        const buttonDenied = FUNC.createElementHTML({
            type: 'button',
            clases: ['btn-denied'],
            textContent: 'Denied'
        })

        buttonAccept.onclick = () => {
            content.remove()
            quoteHTML.remove()
            this.deleteQuote(quoteId)
        }
        
        buttonDenied.onclick = () => {
            content.remove()
        }

        container.appendChild(buttonAccept)
        container.appendChild(buttonDenied)

        return container
    }

    showEmptyList(displayMode) {
        DOM.voidList.style.display = displayMode
    }

    showMessage(message) {
        console.log(message)
    }

    cleanListQuotes() {
        while (DOM.quotesList.childElementCount !== 1) {
            DOM.quotesList.lastChild.remove()
        }
    }

    cleanForm() {
        DOM.inputPetName.value = ''
        DOM.inputPetOwner.value = ''
        DOM.inputOwnerPhone.value = ''
        DOM.inputOwnerEmail.value = ''
        DOM.inputPetSymptom.value = ''
    }
}