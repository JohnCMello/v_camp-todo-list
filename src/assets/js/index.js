// DOM Elements ===============================================================
const $taskText = document.querySelector(`[data-js=task-text]`);
const $toDoForm = document.querySelector(`[data-js=form]`);
const $toBeDoneList = document.querySelector(`[data-js=to-be-done-list]`);
const $completedList = document.querySelector(`[data-js=completed-list]`);
const $toDoItems = document.querySelectorAll(`[data-js=todo]`);

// Functions ==================================================================

const sortTodosAlphabeticallyInLocalStorage = (todos) => todos.sort((a, b) => a.name.localeCompare(b.name));

const getTodosFromLocalStorage = () => JSON.parse(localStorage.getItem("todo-list")) || [];

const setTodosToLocalStorage = (todoInfo) => {
    const todos = getTodosFromLocalStorage();
    todos.push(todoInfo);
    sortTodosAlphabeticallyInLocalStorage(todos);
    localStorage.setItem("todo-list", JSON.stringify(todos));
};

const removeTodoFromLocalStorage = (todo) => {
    const todos = getTodosFromLocalStorage();
    const temp = todos.filter( item => +item._id !== +todo.id);
    localStorage.setItem("todo-list", JSON.stringify(temp));
  
};

const createDOMElement = (todo) => {
    const todo_el = document.createElement(`li`);
    todo_el.dataset.js = `todo`;
    todo_el.innerText = todo.name;
    todo_el.addEventListener(`click`, toggleToDos);
    todo_el.classList.add(`todo`, todo.status);
    todo_el.setAttribute(`id`, todo._id);
    $toBeDoneList.append(todo_el);
};

const createTodoElementsFromLocalStorage = () => {
    const todos = getTodosFromLocalStorage();
    $toBeDoneList.innerHTML = '';
    todos.forEach( todo => createDOMElement(todo));
    $taskText.value = ``;
};

const removeElementFromDOM = (todo) => {
    todo.remove(todo);
};

const moveTodoToCompleted = (todo) => {
    if(todo.matches(`.completed`)) $completedList.append(todo);
};

const toggleToDos = (e) => {
    const todo = e.target;
    if(todo.matches(`.completed`)) {
        removeElementFromDOM(todo);
    }
    todo.classList.toggle(`completed`);
    moveTodoToCompleted(todo);
    removeTodoFromLocalStorage(todo);
};

const createTodoInfo = () => {
    const textValue = $taskText.value.trim();
    const todoInfo = {
        _id: Math.floor(Math.random()*1000), 
        name: textValue
    };
    return todoInfo;
};

const addTodos = (e)=> {
    e.preventDefault();
    const todoInfo = createTodoInfo();
    setTodosToLocalStorage(todoInfo);
    createTodoElementsFromLocalStorage();
};

createTodoElementsFromLocalStorage()

// Listeners ==================================================================

// Add to-dos
$toDoForm.addEventListener(`submit`, addTodos)
