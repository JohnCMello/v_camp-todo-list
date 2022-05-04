// DOM Elements ===============================================================

const $taskText = document.querySelector(`[data-js=task-text]`);
const $toDoForm = document.querySelector(`[data-js=form]`);
const $toBeDoneList = document.querySelector(`[data-js=to-be-done-list]`);
const $completedList = document.querySelector(`[data-js=completed-list]`);
const $toDoItems = document.querySelectorAll(`[data-js=todo]`) ;

// Functions ==================================================================

const createTodoInfo = () => {
    const textValue = $taskText.value.trim();
    
    const todoInfo = {
        _id: Math.floor(Math.random()*1000), 
        name: textValue, 
        status:`pending`
    };
    return todoInfo
}

const setTodosToLocalStorage = (todoInfo) =>{
    const todos = getTodosFromLocalStorage();

    todos.push(todoInfo)

    localStorage.setItem("todo-list", JSON.stringify(todos))
};

const getTodosFromLocalStorage = () => JSON.parse(localStorage.getItem("todo-list")) || [];

const createTodoElementsFromLocalStorage = () => {
    
    const todos = getTodosFromLocalStorage();
    
    todos.forEach( (todo) => {
        const todo_el = document.createElement(`li`);

        todo_el.dataset.js = `todo`;
        todo_el.innerText = todo.name;
        todo_el.addEventListener(`click`, toggleToDos)
        todo_el.classList.add(`todo`, todo.status)
        todo_el.setAttribute(`id`, todo._id)

        $toBeDoneList.append(todo_el);
    })
};

const createTodoElements = (todoInfo) =>{
    const todoData = todoInfo

    const todo_el = document.createElement(`li`);

    todo_el.dataset.js = `todo`;
    todo_el.innerText = todoData.name;
    todo_el.addEventListener(`click`, toggleToDos)
    todo_el.classList.add(`todo`, todoData.status)
    todo_el.setAttribute(`id`, todoData._id)

    $toBeDoneList.append(todo_el);
    
    $taskText.value = ``;
};

const addTodos = (e)=>{
    e.preventDefault();
    setTodosToLocalStorage(createTodoInfo())
    createTodoElements(createTodoInfo())
};

const removeTodoFromLocalStorage = (todo) => {
    const todos = getTodosFromLocalStorage();
};

const moveTodoToCompleted = (todo) => {
    if(todo.matches(`.completed`)) $completedList.append(todo)
};


const toggleToDos = (e) =>{
    const todo = e.target;

    if(todo.matches(`.completed`)) removeTodoFromLocalStorage(todo)

    todo.classList.toggle(`completed`)

    moveTodoToCompleted(todo)

};

createTodoElementsFromLocalStorage()

// Listeners ==================================================================

// Add to-dos
$toDoForm.addEventListener(`submit`, addTodos)

