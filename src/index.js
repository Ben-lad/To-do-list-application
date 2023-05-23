// Select necessary elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Function to create a new task item
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = taskText;
  li.appendChild(taskTextSpan);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'task-buttons';

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<p class="fas fa-trash">Delete</p>';
  deleteButton.className = 'delete-button';
  buttonsDiv.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.innerHTML = '<p class="fas fa-edit"> Edit </p>';
  editButton.className = 'edit-button';
  buttonsDiv.appendChild(editButton);

  li.appendChild(buttonsDiv);

  return li;
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = '';
  }
}

// Function to delete a task
function deleteTask(event) {
  const taskItem = event.target.closest('.task-item');
  taskList.removeChild(taskItem);
}

// Function to edit a task
function editTask(event) {
  const taskItem = event.target.closest('.task-item');
  const taskTextSpan = taskItem.querySelector('span');
  const taskText = taskTextSpan.textContent;

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.className = 'edit-input';
  inputField.value = taskText;
  taskItem.replaceChild(inputField, taskTextSpan);
  inputField.focus();

  inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const updatedTaskText = inputField.value.trim();
      if (updatedTaskText !== '') {
        const updatedTaskTextSpan = document.createElement('span');
        updatedTaskTextSpan.textContent = updatedTaskText;
        taskItem.replaceChild(updatedTaskTextSpan, inputField);
      }
    }
  });

  inputField.addEventListener('blur', function () {
    const updatedTaskText = inputField.value.trim();
    if (updatedTaskText !== '') {
      const updatedTaskTextSpan = document.createElement('span');
      updatedTaskTextSpan.textContent = updatedTaskText;
      taskItem.replaceChild(updatedTaskTextSpan, inputField);
    }
  });
}

// Event listener for adding a new task
addButton.addEventListener('click', addTask);

// Event listener for marking a task as completed or deleting/editing a task
taskList.addEventListener('click', function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('delete-button')) {
    deleteTask(event);
  }

  if (clickedElement.classList.contains('edit-button')) {
    editTask(event);
  }
});
