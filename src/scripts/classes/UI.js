import * as FUNC from '../functions/functions.js'
import * as DOM from '../functions/selectors.js'

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

    getQuote({ petName, petOwner, ownerPhone, ownerEmail, currentDate, currentTime, petSymptom, id }) {
        const quote = FUNC.createElementHTML({clases: ['quote']})
        const quoteHead = this.getQuoteHead(petName, petOwner, ownerPhone, ownerEmail, currentDate)
        const quoteBody = this.getQuoteBody(petSymptom)
        const quoteButtons = this.getButtons(id, {
            petName,
            petOwner,
            ownerPhone,
            ownerEmail,
            currentDate,
            currentTime,
            petSymptom, id
        }, quote)

        quote.appendChild(quoteHead)
        quote.appendChild(quoteBody)
        quote.appendChild(quoteButtons)

        return quote
    }

    getQuoteHead(petName, petOwner, ownerPhone, ownerEmail, currentDate) {
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
        const divOwnerName = FUNC.createElementHTML({ clases: ['owner-name'], textContent: petOwner })
        const divOwnerPhone = FUNC.createElementHTML({ clases: ['owner-phone'], textContent: ownerPhone })
        const divOwnerEmail = FUNC.createElementHTML({ clases: ['owner-email'], textContent: ownerEmail })

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

    getQuoteButtonDelete(id, quote) {
        const button = FUNC.createElementHTML({
            type: 'button',
            textContent: 'x',
            attribs: [['data-id', id]],
            clases: ['btn-delete']
        })
        button.onclick = () => quote.remove()
        return button
    }

    getQuoteButtonEdit(id, quote) {
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
            DOM.form.setAttribute('data-id', id)
            FUNC.fillInFieldsTest(quote)
        }
        return button
    }

    getButtons(id, quoteData, quoteHtml) {
        const quoteButtons = FUNC.createElementHTML({
            clases: ['quote-buttons']
        })
        const quoteButtonDelete = this.getQuoteButtonDelete(id, quoteHtml)
        const quoteButtonEdit = this.getQuoteButtonEdit(id, quoteData)

        quoteButtons.appendChild(quoteButtonEdit)
        quoteButtons.appendChild(quoteButtonDelete)

        return quoteButtons
    }

    messageVoidList(displayMode) {
        DOM.voidList.style.display = displayMode
    }

    cleanListQuotes() {
        while (DOM.quotesList.firstChild) {
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