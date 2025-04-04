import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-form-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskBoardContainer = document.querySelector('.taskboard');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskBoardComponent(), taskBoardContainer);

const taskLists = [
  'Название блока',
  'Название блока',
  'Название блока',
  'Название блока'
];

const tasks = [
  ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4'],
  ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4'],
  ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4'],
  ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4']
];

taskLists.forEach((title, index) => {
  console.log(title, index)
  const taskListComponent = new TaskListComponent(title);
  render(taskListComponent, taskBoardContainer);

  tasks[index].forEach(taskText => {
    render(new TaskComponent(taskText), taskListComponent.getElement().querySelector('.task-list'));
  });
});
