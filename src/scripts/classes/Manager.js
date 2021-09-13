import { quotesList } from '../functions/selectors.js'
import { UI } from './UI.js'

const INDEXED_NOT_FOUND = 'Indexed Not Found.'
const MESSAGE_INPUT_VOID = 'All fields are required'

export class Manager{
    constructor() {
        this.totalQuotes = 0
        this.UI = new UI()
        this.initDB()
    }

    initDB() {
        if (window.indexedDB) {
            const request = indexedDB.open('QUOTES', 1)

            request.onupgradeneeded = (event) => {
                const DB = event.target.result
                const objectStore = DB.createObjectStore('quote', {
                    keyPath: 'id',
                    autoIncrement: true
                })

                objectStore.createIndex('petName', 'petName', { unique: false })
                objectStore.createIndex('petOwner', 'petOwner', { unique: false })
                objectStore.createIndex('ownerPhone', 'ownerPhone', { unique: false })
                objectStore.createIndex('ownerEmail', 'ownerEmail', { unique: false })
                objectStore.createIndex('currentDate', 'currentDate', { unique: false })
                objectStore.createIndex('currentTime', 'currentTime', { unique: false })
                objectStore.createIndex('petSymptom', 'petSymptom', { unique: false })
                objectStore.createIndex('id', 'id', { unique: true })
            }
        } else { console.log(INDEXED_NOT_FOUND) } 
    }

    loadQuotes() {
        const request = indexedDB.open('QUOTES', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('quote', 'readonly')
            const objectStore = transaction.objectStore('quote')
            const data = objectStore.getAll()
            
            data.onsuccess = (event) => {
                const data = event.target.result
                if (!!data.length) {
                    this.totalQuotes = data.length
                    this.UI.messageVoidList('none')
                    this.UI.showQuotes(data)
                }
            }
        }
    }

    addQuote(quote, editID) {
        if (this.verifyQuote(quote)) {
            const request = indexedDB.open('QUOTES', 1)
    
            request.onsuccess = () => {
                const DB = request.result
                const transaction = DB.transaction('quote', 'readwrite')
                const objectStore = transaction.objectStore('quote')
                
                if (!!editID) {
                    quote.id = editID
                    objectStore.put(quote)
                    this.loadQuotes()
                } else {
                    objectStore.add(quote)
                    this.UI.showQuote(quote)
                    this.totalQuotes++
                }
                this.UI.messageVoidList('none')
            }
        }
    }

    deleteQuote(id) {
        const request = indexedDB.open('QUOTES', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('quote', 'readwrite')
            const objectStore = transaction.objectStore('quote')
            
            objectStore.delete(id)
            --this.totalQuotes
            if (!!!this.totalQuotes){ this.UI.messageVoidList('flex') }
        }
    }

    verifyQuote(quote) {
        for (let feature of quote) {
            const key = feature[0]
            if (!!!quote[key]) {
                this.UI.showMessage('error', MESSAGE_INPUT_VOID)
                return false
            }
        }
        return true
    }
}