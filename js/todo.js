const todoForm = document.querySelector('.js_todoForm'),
    todoInput = todoForm.querySelector('input'),
    todoList = document.querySelector('.js_todoList');

const TODOS_LS = 'toDos';

let toDos = [];

let idNumbers = 1;


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
};

function finish_work(event){
    const finish_btn = event.target;
    const li = finish_btn.parentNode;
    const hasClass = li.className;
    const on = "on"

    if(hasClass !== on){
        li.className = on;

    }else{
        li.className = "";
    }

}

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finish = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    finish.innerText = "●";
    finish.addEventListener("click", finish_work);
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(finish);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    toDos.push(todoObj);
    saveTodos();
};

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
};

function loadToDos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if (loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        });
    }
};

function init(){
    loadToDos();
    todoForm.addEventListener('submit', handleSubmit);
};

init();