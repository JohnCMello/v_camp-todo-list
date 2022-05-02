// DOM Elements

const $taskText = document.querySelector(`[data-js=task-text]`);
const $toDoForm = document.querySelector(`[data-js=form]`);
const $toBeDoneList = document.querySelector(`[data-js=to-be-done-list]`);
const $completedList = document.querySelector(`[data-js=completed-list]`);
const $toDoItems = document.querySelectorAll(`[data-js=todo]`);

// Listeners

// Add to-dos
$toDoForm.addEventListener(`submit`, (e)=>{
    e.preventDefault();

    const textValue = $taskText.value;

    if(!textValue) return;

    const todo_el = document.createElement(`li`);
    todo_el.innerText = textValue;
    todo_el.classList.add(`todo`);

    $toBeDoneList.appendChild(todo_el);
    $taskText.value = ``;
})

//toggle to-dos



