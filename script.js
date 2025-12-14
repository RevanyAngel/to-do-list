const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const dateDisplay = document.getElementById('date-display');

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString('id-ID', options);

function checkEmpty() {
    if (todoList.children.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

checkEmpty();

function addTodo(event) {
    event.preventDefault();
    
    const todoText = todoInput.value;

    if (todoText === '') return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-text');
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
    
    checkEmpty();

    todoDiv.addEventListener('click', function(e) {
        if(e.target !== trashButton && e.target.parentElement !== trashButton) {
            todoDiv.classList.toggle('completed');
        }
    });

    trashButton.addEventListener('click', function() {
        todoDiv.style.opacity = '0';
        todoDiv.style.transform = 'scale(0.9)';
        setTimeout(() => {
            todoDiv.remove();
            checkEmpty();
        }, 300);
    });
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo(e);
    }
});