'use strict'

function getSavedTodos() {
    const todosFromJSON = localStorage.getItem('todos')

    try {
        return todosFromJSON ? JSON.parse(todosFromJSON) : []
    } catch (e) {
        return []
    }
}

function saveTodos(todos) {
    const todosToJSON = JSON.stringify(todos)
    localStorage.setItem('todos', todosToJSON)
}

function removeTodo(id) {
    const deleteIndex = todos.findIndex(todo => todo.id === id)

    if (deleteIndex > -1) {
        todos.splice(deleteIndex, 1)
    }
} 

function toggleTodo(id) {
    const toggleTodo = todos.find(todo => todo.id === id)
    if (toggleTodo) {
        toggleTodo.completed = !toggleTodo.completed
    }
}

function renderTodos(todos, filters) {
    todosArea.innerHTML = ''

    const filteredTodos = todos.filter(todo => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(todo => !todo.completed)
    todosArea.appendChild(generateSummaryDOM(incompleteTodos))
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => todosArea.appendChild(generateTodoDOM(todo)))
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todosArea.appendChild(messageEl)
    }
}

function generateTodoDOM(todo) {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBtn = document.createElement('input')
    const todoTextEl = document.createElement('a')
    const removeBtn = document.createElement('button')

    checkBtn.setAttribute('type', 'checkbox')
    checkBtn.checked = todo.completed

    checkBtn.addEventListener('change', () =>{
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    containerEl.appendChild(checkBtn)

    todoTextEl.textContent = todo.text
    containerEl.appendChild(todoTextEl)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeBtn.textContent = 'remove'
    removeBtn.classList.add('button', 'button--text')
    todoEl.appendChild(removeBtn)
    removeBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

function generateSummaryDOM(incompleteTodos) {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const nums = incompleteTodos.length
    const plural = nums === 1 ? '' : 's'
    summary.textContent = `you have ${nums} todo${plural} left`
    return summary
}