const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const emptyMsg = document.getElementById('emptyMsg');

function updateEmptyMsg() {
    emptyMsg.style.display = list.children.length === 0 ? 'block' : 'none';
}

// Call after adding/removing tasks:
addBtn.onclick = () => {
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = input.value;
        const rm = document.createElement('button');
        rm.textContent = "Remove";
        rm.className = "removeBtn";
        rm.onclick = () => { li.remove(); updateEmptyMsg(); saveTasks(); };
        li.appendChild(rm);
        list.appendChild(li);
        input.value = "";
        updateEmptyMsg();
        saveTasks();
    }
};
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});
list.addEventListener('click', function(e) {
    if (e.target.className === 'removeBtn') {
        e.target.parentElement.remove();
        updateEmptyMsg();
    }
});
list.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        saveTasks();
    }
});
updateEmptyMsg();

function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');
        const rm = document.createElement('button');
        rm.textContent = "Remove";
        rm.className = "removeBtn";
        rm.onclick = () => { li.remove(); updateEmptyMsg(); saveTasks(); };
        li.appendChild(rm);
        list.appendChild(li);
    });
    updateEmptyMsg();
}

loadTasks();