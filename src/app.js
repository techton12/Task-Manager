const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        createTaskElement(task);
    });
}

addTaskBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if(taskText === ''){
        alert('Please enter a task');
        return;
    }
    
    const newTask = {
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    
    createTaskElement(newTask);
    
    taskInput.value = '';
});
function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'items-center', 'justify-between',
         'mb-2', 'p-2', 'border', 'border-gray-300', 'rounded');
    listItem.innerHTML = `
        <span><input type="checkbox" ${task.completed ? 'checked' : ''}>
        ${task.text}</span>
        <span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        </span>
    `;

    if (task.completed) {
        listItem.classList.add('line-through', 'text-gray-500');
    }

    const editBtn = listItem.querySelector('.edit-btn');
    editBtn.classList.add('bg-blue-300', 'text-white', 'px-4', 'rounded');
    editBtn.disabled = task.completed;
    
    const deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.classList.add('bg-red-300', 'text-white', 'px-1', 'rounded', 'ml-1');
    deleteBtn.disabled = task.completed;

    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            listItem.querySelector('span').textContent = newText;
            listItem.querySelector('span').prepend(listItem.querySelector('input[type="checkbox"]'));
            listItem.querySelector('input[type="checkbox"]').classList.add('mr-1');
            saveTasks();
        }
    });

    deleteBtn.addEventListener('click', function() {
        const taskIndex = tasks.indexOf(task);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            saveTasks();
            taskList.removeChild(listItem);
        }
    });

    const checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.classList.add('mr-1');
    checkbox.addEventListener('change', function() {
        task.completed = this.checked;
        if (this.checked) {
            listItem.classList.add('line-through', 'text-gray-500');
            editBtn.disabled = true;
            deleteBtn.disabled = true;
        } else {
            listItem.classList.remove('line-through', 'text-gray-500');
            editBtn.disabled = false;
            deleteBtn.disabled = false;
        }
        saveTasks();
    });

    taskList.appendChild(listItem);
}


renderTasks();