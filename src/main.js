import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';

const bodyContainer = document.querySelector('.board-app');
const tasksModel = new TasksModel();
const tasksBoardPresenter = new TaskBoardPresenter({ 
    boardContainer: bodyContainer, tasksModel
 });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.BEFOREEND);

tasksBoardPresenter.init();

const addTaskFormElement = document.querySelector('.add-task__form');
const inputElement = addTaskFormElement.querySelector('#add-task');

addTaskFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const taskTitle = inputElement.value.trim();

    if (taskTitle === '') return;

    tasksBoardPresenter.createTask(taskTitle); // вызываем метод добавления
    inputElement.value = ''; // очищаем поле ввода
});
