import { UI } from './ui.js'
let DB

class Manager {
    constructor() {
        this.ui = new UI()
        this.open()
    }

    open() {
        if (window.indexedDB) {
            const request = window.indexedDB.open('appts', 1)
            request.onsuccess = function () {
                DB = request.result
            }
            request.onupgradeneeded = function (evt) {
                DB = evt.target.result
                const object_store = DB.createObjectStore('cita', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                object_store.createIndex('mascota', 'mascota', {unique: false})
                object_store.createIndex('propietario', 'propietario', {unique: false})
                object_store.createIndex('telefono', 'telefono', {unique: false})
                object_store.createIndex('fecha', 'fecha', {unique: false})
                object_store.createIndex('hora', 'hora', {unique: false})
                object_store.createIndex('sintomas', 'sintomas', {unique: false})
                object_store.createIndex('id', 'id', { unique: true })
            }
        } else {
            alert('Su navegador no cuenta con indexDB. Actualicelo o cambie de navegador.')
        }
    }

    add(appt) {
        const transaction = DB.transaction(['cita'], 'readwrite')
        const object_store = transaction.objectStore('cita')
        object_store.add(appt)
    }

    delete(id) {
        var db
        var request = window.indexedDB.open('appts', 1)
        
        request.onsuccess = () => {
            db = request.result
            var object_store = db.transaction(['cita'], 'readwrite').objectStore('cita')
            var objects = object_store.delete(id)
            objects.onsuccess = () => {}
        }
    }

    show_data() {
        this.ui.clean()

        var db
        var show_data = this.ui.show_data
        var request = window.indexedDB.open('appts', 1)
        
        request.onsuccess = () => {
            db = request.result
            var object_store = db.transaction(['cita'], 'readonly').objectStore('cita')
            var objects = object_store.getAll()
            objects.onsuccess = () => { show_data(objects.result) }
        }
    }

    update(object) {
        const transaction = DB.transaction(['cita'], 'readwrite')
        const object_store = transaction.objectStore('cita')

        object_store.put(object)
        this.ui.change_label_button('Crear cita')
    }

    load_info(id) {
        var db
        var edit_appt = this.ui.edit_appt
        var request = window.indexedDB.open('appts', 1)
        
        request.onsuccess = () => {
            db = request.result
            var object_store = db.transaction(['cita'], 'readonly').objectStore('cita')
            var objects = object_store.get(id)
            objects.onsuccess = () => { edit_appt(objects.result) }
        }
    }

    alert() {
        this.ui.alert()
    }
}

export { Manager }