const todos = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Погулять с собакой',
  'Разобраться в замыканиях',
  'Решить задачу на Codewars'
];

const todoContainers = document.querySelector('.todos__list');
const todoTemplate = document.querySelector('#todo-item-template').content.querySelector('.todo-item'); //null
const todoForm = document.querySelector('.todos__form');
const todoButtonForm = document.querySelector('.todo-form__submit-btn');



function addTaskContainer(taskName, containter, position = 'append') {
  if (position === 'append') {
    return containter.append(createTask(taskName))
  }
  if (position === 'prepend') {
    return containter.prepend(createTask(taskName))
  }

  if (position === 'before') {
    return containter.before(createTask(taskName))
  }

  if (position === 'after') {
    return containter.after(createTask(taskName))
  }
}

function createTask(taskName) {
  const todoTaskElement = todoTemplate.cloneNode(true);
  const todoTaskText = todoTaskElement.querySelector('.todo-item__text');
  const deletedTaskButton = todoTaskElement.querySelector('.todo-item__del');
  const clonedTaskButton = todoTaskElement.querySelector('.todo-item__copy');
  const editedTaskButton = todoTaskElement.querySelector('.todo-item__edit');


  todoTaskText.textContent = taskName;


  deletedTaskButton.addEventListener('click', (e) => {
    e.target.closest('.todo-item').remove()
  })

  clonedTaskButton.addEventListener('click', (e) => {
    addTaskContainer(taskName, todoTaskElement, 'after')
  })

  editedTaskButton.addEventListener('click', (event) => {
    const input = todoForm.querySelector('.todo-form__input');
    input.value = taskName;

    const button = todoForm.querySelector('.todo-form__submit-btn');
    button.textContent = 'Изменить';

    function editTodo(e) {
      e.preventDefault();
      event.target.closest('.todo-item')
        .querySelector('.todo-item__text')
        .textContent = input.value;

      e.target.reset()
      button.textContent = 'Добавить';
      todoForm.removeEventListener('submit', editTodo)
      todoForm.addEventListener('submit', addTodo);

    }

    todoForm.removeEventListener('submit', addTodo);
    todoForm.addEventListener('submit', editTodo)

  })



  return todoTaskElement;

};

function addTodo(event) {
  event.preventDefault();
  const input = event.target.querySelector('.todo-form__input');
  addTaskContainer(input.value, todoContainers, 'prepend')
}

todoForm.addEventListener('submit', addTodo)

// todoButtonForm.addEventListener('click', (event) => {
//   console.log(event);
//   console.log('CLICK');
// })

todos.forEach((text) => {
  addTaskContainer(text, todoContainers, 'append')
})