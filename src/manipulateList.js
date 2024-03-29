/* eslint-disable import/no-cycle */
import ListOfTasks from './list.js';
import Storage from './storage.js';
import Task from './task.js';

export default class ListManipulation extends ListOfTasks {
  constructor(storageKey = 'ToDoList') {
    super(storageKey);
  }

  addToList(descr, index = (this.tasksList.length + 1), done = false) {
    this.tasksList.push(new Task(descr, index, done));
    Storage.saveAndUpdate(this.tasksList);
  }

  editDescription(index, newDescription) {
    this.tasksList[index].description = newDescription;
    return this.tasksList;
  }

  overrideIndexes(list) {
    this.list = list;
    this.list.forEach((task, i) => {
      task.index = (i + 1);
    });
    return this.list;
  }

  removeByIndex(ind) {
    const filtered = this.tasksList.filter((task) => task.index !== ind);
    Storage.saveAndUpdate(this.overrideIndexes(filtered));
  }

  removeAllDone() {
    const filtered = this.tasksList.filter((task) => task.done === false);
    Storage.saveAndUpdate(this.overrideIndexes(filtered));
  }
}
