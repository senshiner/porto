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
    <span class="task">${taskText}</span>
    <div class="actions">
      <button class="check">${isCompleted ? 'Ongoing' : 'Done'}</button>
      ${isCompleted ? '' : '<button class="edit">Edit</button>'}
      <button class="delete">Delete</button>
    </div>
  `;

  // Event untuk tombol Done/Ongoing
  listItem.querySelector('.check').addEventListener('click', () => {
    const isCompleted = listItem.classList.toggle('completed');
    listItem.querySelector('.check').textContent = isCompleted ? 'Ongoing' : 'Done';

    // Hapus tombol Edit jika status Done
    const editButton = listItem.querySelector('.edit');
    if (isCompleted && editButton) {
      editButton.remove();
    } else if (!isCompleted && !listItem.querySelector('.edit')) {
      const editBtn = document.createElement('button');
      editBtn.className = 'edit';
      editBtn.textContent = 'Edit';
      listItem.querySelector('.actions').insertBefore(editBtn, listItem.querySelector('.delete'));
      editBtn.addEventListener('click', () => editTask(listItem, taskText));
    }

    updateTaskInLocalStorage(taskText, isCompleted);
  });

  // Event untuk tombol Edit
  if (!isCompleted) {
    listItem.querySelector('.edit').addEventListener('click', () => {
      editTask(listItem, taskText);
    });
  }

  // Event untuk tombol Delete
  listItem.querySelector('.delete').addEventListener('click', () => {
    taskList.removeChild(listItem);
    removeTaskFromLocalStorage(taskText);
  });

  return listItem;
}

// Fungsi Edit Tugas
function editTask(listItem, oldTaskText) {
  const newTaskText = prompt('Edit your task:', oldTaskText);
  if (newTaskText) {
    listItem.querySelector('.task').textContent = newTaskText.trim();
    updateTaskInLocalStorage(oldTaskText, false, newTaskText.trim());
  }
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
function updateTaskInLocalStorage(oldTaskText, isCompleted, newTaskText = null) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(task => task.text === oldTaskText);
  if (taskIndex > -1) {
    if (newTaskText) tasks[taskIndex].text = newTaskText;
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