// Ambil elemen dari DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Muat daftar tugas dari Local Storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Tambah tugas
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = '';
  }
});

// Membuat elemen tugas
function createTaskElement(taskText, isCompleted = false) {
  const listItem = document.createElement('li');
  if (isCompleted) listItem.classList.add('completed');
  listItem.innerHTML = `
    <div class="status-container">
      <div class="status-box ${isCompleted ? 'checked' : ''}"></div>
      <span class="task">${taskText}</span>
    </div>
    <div class="actions">
      <button class="delete">Delete</button>
    </div>
  `;

  // Event untuk tombol status (Done/Ongoing)
  const statusBox = listItem.querySelector('.status-box');
  statusBox.addEventListener('click', () => {
    statusBox.classList.toggle('checked');
    const isNowCompleted = statusBox.classList.contains('checked');
    listItem.classList.toggle('completed');
    updateTaskInLocalStorage(taskText, isNowCompleted);
  });

  // Event untuk tombol Delete
  listItem.querySelector('.delete').addEventListener('click', () => {
    taskList.removeChild(listItem);
    removeTaskFromLocalStorage(taskText);
  });

  return listItem;
}

// Muat tugas dari Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskElement = createTaskElement(task.text, task.completed);
    taskList.appendChild(taskElement);
  });
}

// Simpan tugas ke Local Storage
function saveTaskToLocalStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Perbarui tugas di Local Storage
function updateTaskInLocalStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(task => task.text === taskText);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = isCompleted;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Hapus tugas dari Local Storage
function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}