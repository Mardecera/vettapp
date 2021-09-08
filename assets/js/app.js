// cita -> appointment -> appts
import { Manager } from "./manager.js"
import { add_appt } from "./functions.js"

const form = document.querySelector('#nueva-cita')
let id_edit

let manager = new Manager()

window.delete_appt = function (id){
    manager.delete(id)
    manager.show_data()
}
window.edit_appt = function (id) {
    id_edit = id
    manager.load_info(id)
}

load_events_listeners()
function load_events_listeners(){
    document.addEventListener('DOMContentLoaded', () => {
        manager.show_data()
    })
    form.addEventListener('submit', (evt) => {
        add_appt(evt, manager, id_edit)
        id_edit = ''
    })
}