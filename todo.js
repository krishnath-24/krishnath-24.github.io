var input = document.getElementById("input");
var todoListContainer = document.getElementById("todo-list-container");
var addTodoButton = document.getElementById("add-todo");
var taskLeft = document.getElementById("task-left");
var todoCount = 0;
var deleteButton = document.getElementById("delete");

addTodoButton.addEventListener("click",()=>{
    addItemToList();
});


// Function to add the item to the list after the add button is clicked.
function addItemToList() {

    var todoText = input.value; // get todo text.
    input.value = "";

    // if the input is empty
    if(todoText.length <= 0) {
        alert('Please Enter todo');
        return;
    }

    todoCount++; // increment the todoCount.

    var todo = createTodo(todoText);

    todoListContainer.appendChild(todo);
    updateTodoCount();


}

function createTodo(todoText) {

    var todo = createElement("div");
    var checkBox = createElement("input");
    var span = createElement("span");
    var button = createElement("button");

    todo.className = "todo";

    checkBox.type = "checkbox";
    checkBox.classList.add("round");
    checkBox.checked = false;   
    span.innerHTML = todoText;

    button.className = "delete";
    button.innerText = "Delete";

    todo.append(checkBox);
    todo.append(span);
    todo.append(button);

    button.addEventListener("click",function(e){
        deleteTodo(this);
    });

    return todo;
}

function deleteTodo(e){
    e.parentElement.remove();

    if(todoCount > 0)
    todoCount--;

    updateTodoCount();
}


function updateTodoCount() {
    taskLeft.innerText = todoCount+" ";
}

function createElement(element) {
    return document.createElement(element);
}