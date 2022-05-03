// DOM Elements ===============================================================

const $taskText = document.querySelector(`[data-js=task-text]`);
const $toDoForm = document.querySelector(`[data-js=form]`);
const $toBeDoneList = document.querySelector(`[data-js=to-be-done-list]`);
const $completedList = document.querySelector(`[data-js=completed-list]`);
const $toDoItems = document.querySelectorAll(`[data-js=todo]`) ;

// Functions ==================================================================

const getTodosFromLocalStorage = () => JSON.parse(localStorage.getItem("todo-list")) || [];

const createTodoElements = () => {
    const todos = getTodosFromLocalStorage() ;
    
    const todo_el = document.createElement(`li`);
        
    todos.forEach(todo =>{

        todo_el.dataset.js = `todo`;
        todo_el.innerText = todo.name;
        todo_el.addEventListener(`click`, toggleToDos)
        todo_el.classList.add(`todo`, todo.status)
        todo_el.setAttribute(`id`, todo.id)

        $toBeDoneList.appendChild(todo_el);
        
    })
    
}

const setTodosToLocalStorage = () =>{
    let textValue = $taskText.value;

    const todos = getTodosFromLocalStorage();

    let todoInfo = {
        _id: Math.floor(Math.random()*1000), 
        name: textValue, 
        status:`pending`
    };

    todos.push(todoInfo)

    localStorage.setItem("todo-list", JSON.stringify(todos))
};

const addTodos = (e)=>{
    e.preventDefault();
    setTodosToLocalStorage()
    createTodoElements()

    $taskText.value = ``;
};

const toggleToDos = (e) =>{
    const todo = e.target;
    todo.classList.toggle(`completed`)

};

createTodoElements()
// Listeners ==================================================================

// Add to-dos ###
$toDoForm.addEventListener(`submit`, addTodos)


