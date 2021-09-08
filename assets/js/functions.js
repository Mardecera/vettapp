function load_appts(manager, ui) {
    manager.get_all(ui)
    // return manager
}

function add_appt(evt, manager, id_edit) {
    evt.preventDefault()

    const appt = {}
    const form_inputs = document.querySelectorAll('#nueva-cita input')
    const form_textareas = document.querySelectorAll('#nueva-cita textarea')

    form_inputs.forEach(input => { appt[input.id] = input.value })
    form_textareas.forEach(textarea => { appt[textarea.id] = textarea.value })
    appt[Symbol.iterator] = function* () { for (let key in this) { yield [key, this[key]] } }
    
    if (!id_edit) {
        appt.id = new Date().getTime()
        !is_any_emptys(appt)? manager.add(appt) : manager.alert()
    } else {
        appt.id = id_edit
        manager.update(appt)
    }
    manager.show_data()
}

function is_any_emptys(object) {
    for (let item of object) {
        if (object[item[0]] === '' || object[item[0]] == null){
            return true
        }
    }
    return false
}

/// PROTOTYPES
String.prototype.isEmpty = function(){return this.length === 0? true : false}
Array.prototype.isEmpty = function () { return this.length === 0 ? true : false }

export { add_appt, load_appts }