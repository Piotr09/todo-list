let todoInput, errorInfo, addButton, ulList, popup, popupInfo, todoToEdit, popupInput, popupAddButton, popupCloseButton

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addButton = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')
    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddButton = document.querySelector('.accept')
    popupCloseButton = document.querySelector('.cancel')
}


const prepareDOMEvents = () => {
    addButton.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseButton.addEventListener('click', closePopup)
    popupAddButton.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', addTodobyEnter)
}

const addNewTodo = () => {
    if (todoInput.value !== '') {
        const newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea(newTodo)
        ulList.append(newTodo)
        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania'
    }
}

const createToolsArea = (newTodo) => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeButton = document.createElement('button')
    completeButton.classList.add('complete')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'

    const editButton = document.createElement('button')
    editButton.classList.add('edit')
    editButton.textContent = 'EDIT'

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(completeButton, editButton, deleteButton)
}

const checkClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editTodo(e)
    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = e => {
    todoEdit = e.target.closest('li')
    popupInput.value = todoEdit.firstChild.textContent

    popup.style.display = 'flex'
}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoEdit.firstChild.textContent = popupInput.value
        closePopup()
        popupInfo.textContent = ''

    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść'
    }

}

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if (allTodos.length < 1) {
        errorInfo.textContent = 'Brak zadań na liście'
    }
}

const addTodobyEnter = e => {
    e.key === 'Enter' && addNewTodo()
}



document.addEventListener('DOMContentLoaded', main)