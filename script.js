// Membuat elemen tugas
function createTaskElement(taskText, isCompleted = false) {
  const listItem = document.createElement('li');
  if (isCompleted) listItem.classList.add('completed');
  listItem.innerHTML = `
    <div class="status-container">
      <div class="status-box ${isCompleted ? 'checked' : ''}"></div>
      <span class="task">${taskText}</span>
      <span class="status-label ${isCompleted ? 'done' : 'ongoing'}">
        ${isCompleted ? 'Done' : 'Ongoing'}
      </span>
    </div>
    <div class="actions">
      ${isCompleted ? '' : '<button class="edit">Edit</button>'}
      <button class="delete">Delete</button>
    </div>
  `;

  // Event untuk tombol status (Done/Ongoing)
  const statusBox = listItem.querySelector('.status-box');
  const statusLabel = listItem.querySelector('.status-label');
  statusBox.addEventListener('click', () => {
    const isNowCompleted = statusBox.classList.toggle('checked');
    listItem.classList.toggle('completed');

    // Update status label
    statusLabel.textContent = isNowCompleted ? 'Done' : 'Ongoing';
    statusLabel.className = `status-label ${isNowCompleted ? 'done' : 'ongoing'}`;

    // Tampilkan/Hapus tombol Edit
    const editButton = listItem.querySelector('.edit');
    if (isNowCompleted && editButton) {
      editButton.remove();
    } else if (!isNowCompleted && !editButton) {
      const newEditButton = document.createElement('button');
      newEditButton.className = 'edit';
      newEditButton.textContent = 'Edit';
      listItem.querySelector('.actions').insertBefore(newEditButton, listItem.querySelector('.delete'));
      newEditButton.addEventListener('click', () => editTask(listItem, taskText));
    }

    updateTaskInLocalStorage(taskText, isNowCompleted);
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