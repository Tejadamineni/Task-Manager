let tasks = [];
let isDarkMode = false;

document.getElementById('setNameBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    document.getElementById('greeting').innerText = username ? `Hello, ${username}!` : '';
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
        updateProgress();
    }
});

document.getElementById('showPending').addEventListener('click', () => renderTasks(false));
document.getElementById('showCompleted').addEventListener('click', () => renderTasks(true));

function renderTasks(showCompleted) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.filter(task => task.completed === showCompleted).forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            ${task.text}
            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });

    updateProgress();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = (completedTasks / tasks.length) * 100 || 0;

    document.getElementById('progressBar').value = progressPercentage;
    document.getElementById('progressText').innerText = `${Math.round(progressPercentage)}%`;
}

document.getElementById('toggleTheme').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    document.body.classList.toggle('dark-mode', isDarkMode);
});