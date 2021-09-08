function open() {
    if (window.indexedDB) {
        const request = window.indexedDB.open('appts', 1)
        request.onerror = function () { console.log('ERROR...') }
        request.onsuccess = function () {
            window.db = request.result
            console.log('OK...')
        }
        request.onupgradeneeded = function (evt) {
            window.db = evt.target.result
            const object_store = data_base.createObjectStore('cita', {
                keyPath: 'cita',
                autoIncrement: true
            })
            object_store.createIndex('mascota', 'mascota', {unique: false})
            object_store.createIndex('propietario', 'propietario', {unique: false})
            object_store.createIndex('telefono', 'telefono', {unique: false})
            object_store.createIndex('fecha', 'fecha', {unique: false})
            object_store.createIndex('hora', 'hora', {unique: false})
            object_store.createIndex('sintomas', 'sintomas', {unique: false})
            object_store.createIndex('id', 'id', { unique: true })
            
            console.log('CREATE OK...')
        }
    } else {
        alert('Su navegador no cuenta con indexDB. Actualicelo o cambie de navegador.')
    }
}

function add(DB, element) {
}

function remove(DB, id) {
}
function get_all() {
    const request = window.indexedDB.open('appts', 1)
    request.onsuccess = function () {
        window.db = request.result
        console.log('OK...')
    }
    console.log(window.db)
    let transaction = window.db.transaction('cita', 'readonly')
    const object_store = transaction.objectStore('cita')
    var response = object_store.getAll()
    console.log('g', response)
}

export{open, add, remove, get_all}