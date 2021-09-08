// Crea un elemento
function create_element(type_element = '', classes = [], text = '', source) {
    const element = document.createElement(type_element)

    element.textContent = text
    classes.forEach(class_item => element.classList.add(class_item))
    if (source) {
        element.src = source
        element.alt = 'nothing'
    }

    return element
}

// Elementos anidados
function nest_elements(parent, child, feature, content) {
    const span_child = create_element(child, ['detail-title'], feature, '')
    const span_parent = create_element(parent, [], '', '')
    span_parent.appendChild(span_child)
    span_parent.append(content)
    return span_parent
}

// Crea un grupo de elementos para cita
function create_item_appt(appt) {
    // Agregar iteracion al objeto cita
    appt[Symbol.iterator] = function* () {
        for (let key in this) {
            yield [key, this[key]]
        }
    }

    const image = create_element('img', [], '', './assets/images/dog.jpg')
    const div_image = create_element('div', ['cita-image'], '', '')
    const h3 = create_element('h3', [], appt.mascota, '')
    const div_general = create_element('div', ['cita'], '', '')
    const div_title = create_element('div', ['cita-titulo'], '', '')
    const div_content = create_element('div', ['cita-contenido'], '', '')
    const div_buttons = create_element('div', ['cita-btn'], '', '')
    const btn_edit = create_element('button', ['btn-edit'], 'Editar', '')
    const btn_delete = create_element('button', ['btn-delete'], 'Eliminar', '')

    for (let item of appt) {
        if (item[0] != 'id' && item[0] != 'mascota') {
            const span = nest_elements('span', 'span', item[0], appt[item[0]])
            div_content.appendChild(span)
        }
    }
    
    // Meter las funciones de editar y eliminar en otra para que no se ejecuten de inmediato
    btn_edit.onclick = function () { edit_appt(appt.id) }
    btn_delete.onclick = function () { delete_appt(appt.id) }

    div_image.appendChild(image)
    div_title.appendChild(div_image)
    div_title.appendChild(h3)
    div_general.appendChild(div_title)
    div_general.appendChild(div_content)
    div_buttons.appendChild(btn_edit)
    div_buttons.appendChild(btn_delete)
    div_general.appendChild(div_buttons)

    return div_general
}

export {create_item_appt}