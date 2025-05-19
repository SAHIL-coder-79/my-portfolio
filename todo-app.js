const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

addBtn.onclick = () => {
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = input.value;
        const rm = document.createElement('button');
        rm.textContent = "Remove";
        rm.className = "removeBtn";
        rm.onclick = () => li.remove();
        li.appendChild(rm);
        list.appendChild(li);
        input.value = "";
    }
};