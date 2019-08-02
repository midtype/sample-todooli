/// <reference types="react-scripts" />

declare module 'atomize';

interface ITask {
  id: string;
  summary: string;
  completed: boolean;
  completedOn: string;
  dueDate: string;
  project: IProject;
}

interface IProject {
  id: string;
  name: string;
  color: string;
}
