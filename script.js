// Ambil elemen dari DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Tambah tugas ke daftar
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="task">${taskText}</span>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    listItem.addEventListener('click', toggleComplete);
    taskList.appendChild(listItem);
    taskInput.value = '';
  }
});

// Toggle centang/tidak centang tugas
function toggleComplete(event) {
  if (event.target.classList.contains('task')) {
    this.classList.toggle('completed');
  }
}

// Hapus atau edit tugas
taskList.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('delete')) {
    const listItem = target.closest('li');
    taskList.removeChild(listItem);
  }

  if (target.classList.contains('edit')) {
    const listItem = target.closest('li');
    const taskText = listItem.querySelector('.task');
    const newTaskText = prompt('Edit your task:', taskText.textContent);
    if (newTaskText !== null) {
      taskText.textContent = newTaskText.trim();
    }
  }
});