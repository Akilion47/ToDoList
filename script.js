document.addEventListener('DOMContentLoaded', function() {
  // Retrieve tasks from local storage if available
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Get DOM elements
  var taskInput = document.getElementById('task-input');
  var addBtn = document.getElementById('add-btn');
  var taskList = document.getElementById('task-list');
  var taskCount = document.getElementById('task-count');

  // Render existing tasks
  renderTasks();

  // Add event listeners
  addBtn.addEventListener('click', addTask);
  taskList.addEventListener('click', taskActions);
  taskInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  });

  // Function to render tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
      var li = document.createElement('li');
      li.innerHTML = '<input type="checkbox" data-index="' + index + '">' +
                     '<span>' + task + '</span>' +
                     '<button data-index="' + index + '">Delete</button>';
      taskList.appendChild(li);
    });
    updateTaskCount();
  }

  // Function to add a new task
  function addTask() {
    var taskText = taskInput.value;
    if (taskText.trim() !== '') {
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      renderTasks();
    }
  }

  // Function to handle task actions (mark completed or delete)
  function taskActions(event) {
    var target = event.target;
    var index = target.getAttribute('data-index');
    if (target.tagName === 'INPUT') {
      tasks[index] = tasks[index].replace(/^(.*)$/, '<s>$1</s>');
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    } else if (target.tagName === 'BUTTON') {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }

  // Function to update task count
  function updateTaskCount() {
    taskCount.textContent = 'Tasks remaining: ' + tasks.length;
  }
});
