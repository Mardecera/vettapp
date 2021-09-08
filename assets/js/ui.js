import { create_item_appt } from "./create_element.js"

const form_contain = document.querySelector('#contenido')
const ul_appts = document.querySelector('#citas')
const form_patient = document.querySelector('#nueva-cita')

class UI{
    show_data(objects = []){
        objects.forEach(appt => {
            const item_appt = document.createElement('li')
            const item_appt_content = create_item_appt({ ...appt })

            item_appt.appendChild(item_appt_content)
            item_appt.dataset.id = appt.id
            ul_appts.appendChild(item_appt)
        })
    }

    clean() {
        this.delete_alert()
        this.clean_appts(ul_appts)
        this.clean_inputs(form_patient)
        this.load_date()
    }
    
    clean_appts(appts_list) { while (appts_list.lastChild) appts_list.lastChild.remove() }
    
    clean_inputs(form_inputs) { form_inputs.reset() }

    alert(){
        this.delete_alert()
        form_patient.classList.add('effect-alert')
        setTimeout(() => {
            form_patient.classList.remove('effect-alert')
        }, 2000)
    }

    delete_alert(){
        if (form_contain.querySelector('div.alert-fields')) {
            form_contain.querySelector('div.alert-fields').remove()
        }
    }

    load_date() {
        document.querySelector('input#fecha').value = this.current_date()
        document.querySelector('input#hora').value = this.current_time()
    }

    current_date(){
        const year = String(new Date().getFullYear())
        let month = String(new Date().getMonth() + 1)
        month = month.length === 1? '0' + month : month
        let day = String(new Date().getDate())
        day = day.length === 1? '0' + day : day
        return `${year}-${month}-${day}`
    }
    
    current_time(){
        return new Date().toLocaleTimeString().slice(0, 5)
    }

    edit_appt(appt_selected) {
        appt_selected[Symbol.iterator] = function* () {
            for(let key in this){ yield [key, this[key]]}
        }
        for (let appt of appt_selected) {
            if (appt[0] !== 'id') {
                form_patient.querySelector(`#${appt[0]}`).value = appt_selected[appt[0]]
            }
        }
        form_patient.querySelector('button').textContent = 'Guardar Cambios'
    }

    change_label_button(label) {
        form_patient.querySelector('button').textContent = label
    }
}

export { UI }