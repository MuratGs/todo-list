import HeaderComponent from '../view/header-component.js';
import FormAddTaskComponent from '../view/form-add-task-component.js';
import TaskboardComponent from '../view/taskboard-component.js';
import TaskComponent from '../view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

// Контейнеры
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

// Отрисовываем компоненты
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.BEFOREBEGIN);
render(new TaskboardComponent(), taskboardContainer, RenderPosition.BEFOREBEGIN);

// Создаем и отрисовываем задачи
const task1 = new TaskComponent('Выучить JS', 'backlog');
const task2 = new TaskComponent('Сделать домашку', 'backlog');
const task3 = new TaskComponent('Выпить смузи', 'in-progress');
const task4 = new TaskComponent('Позвонить маме', 'completed');
const task5 = new TaskComponent('Сходить погулять', 'trash');

render(task1, taskboardContainer.querySelector('.backlog-title').parentNode);
render(task2, taskboardContainer.querySelector('.backlog-title').parentNode);
render(task3, taskboardContainer.querySelector('.in-progress-title').parentNode);
render(task4, taskboardContainer.querySelector('.completed-title').parentNode);
render(task5, taskboardContainer.querySelector('.trash-title').parentNode);
