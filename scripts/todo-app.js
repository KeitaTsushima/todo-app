'use strict'

const todos = getSavedTodos()
const addBtnEl = document.querySelector('#add-todo')
const inputEl = document.querySelector('#add-text')
const searchEl = document.querySelector('#search-text')
const formEl = document.querySelector('#form-el')
const hideBtn = document.querySelector('#hide-btn')
const todosArea = document.querySelector('#todos-area')
const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

searchEl.addEventListener('input', e => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

formEl.addEventListener('submit', e => {
    e.preventDefault()
    const text = e.target.elements.newTodo.value.trim()

    if (text) {
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
        e.target.elements.newTodo.value = ''
        renderTodos(todos, filters)
        saveTodos(todos)    
    }
})

hideBtn.addEventListener('change', e => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
