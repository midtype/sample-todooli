import React, { useState } from 'react';
import styled from 'styled-components';
import { Query, QueryResult } from 'react-apollo';

import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import Container from '../../components/MarketingContainer';
import Task from '../../components/Task';
import Loader from '../../components/Loader';

import * as colors from '../../constants/colors';
import GET_TASKS, { ITasks } from '../../apollo/queries/tasks';
import GET_PROJECTS, { IProjects } from '../../apollo/queries/projects';

const Styled = styled.div`
  padding: 3rem;
  padding-top: 8rem;

  .container {
    height: calc(100vh - 11rem);
    display: grid;
    grid-template-columns: 15rem auto;
  }
  .menu {
    overflow: auto;
    padding: 2rem;
    border-radius: 5px;
    background: ${colors.GRAY_1()};
  }
  .menu__create {
    margin-bottom: 4rem;
  }
  .menu__list-heading {
    font-size: 0.7rem;
    letter-spacing: 2px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${colors.GRAY_3()};
    margin-bottom: 1rem;
  }
  .menu__list {
    margin-bottom: 4rem;
  }
  .menu__list__item {
    cursor: pointer;
    opacity: 0.8;
    margin-bottom: 0.5rem;
    transition: 250ms all;
  }
  .menu__list__item:hover {
    opacity: 1;
  }
  .menu__list__item--active {
    font-weight: bold;
  }
  .tasks {
    overflow: auto;
    padding: 2rem;
  }
  .tasks__empty {
    text-align: center;
    color: ${colors.GRAY_3()};
  }
`;

const TasksPage: React.FC = () => {
  const [newTask, setNewTask] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [projectId, setProjectId] = useState<string | undefined>();

  const onCreateTask = () => setNewTask(true);
  const onCancelEdit = () => setNewTask(false);
  return (
    <Styled>
      <AppHeader />
      <Container className="container">
        <div className="menu">
          <Button className="menu__create" onClick={onCreateTask}>
            Create Task
          </Button>
          <h4 className="menu__list-heading">Tasks</h4>
          <ul className="menu__list">
            <li
              className={`menu__list__item menu__list__item--${
                completed ? 'inactive' : 'active'
              }`}
              onClick={() => setCompleted(false)}
            >
              Open
            </li>
            <li
              className={`menu__list__item menu__list__item--${
                completed ? 'active' : 'inactive'
              }`}
              onClick={() => setCompleted(true)}
            >
              Completed
            </li>
          </ul>

          <h4 className="menu__list-heading">Projects</h4>
          <Query query={GET_PROJECTS}>
            {(query: QueryResult<IProjects>) => {
              const { loading, data } = query;
              if (loading) {
                return <Loader />;
              }
              if (data) {
                return (
                  <ul className="menu__list">
                    {data.projects.nodes.map(project => (
                      <li
                        key={project.id}
                        className={`menu__list__item menu__list__item--${
                          projectId === project.id ? 'active' : 'inactive'
                        }`}
                        onClick={() => {
                          if (project.id === projectId) {
                            setProjectId(undefined);
                          } else {
                            setProjectId(project.id);
                          }
                        }}
                      >
                        {project.name}
                      </li>
                    ))}
                    <Button secondary={true}>New</Button>
                  </ul>
                );
              }
              return null;
            }}
          </Query>
        </div>
        <div className="tasks">
          {newTask && <Task editing={true} onClickCancel={onCancelEdit} />}
          <Query query={GET_TASKS} variables={{ completed, projectId }}>
            {(query: QueryResult<ITasks>) => {
              const { loading, data } = query;
              if (loading) {
                return <Loader />;
              }
              if (data && data.tasks) {
                return data.tasks.nodes.map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    editing={false}
                    onClickCancel={onCancelEdit}
                  />
                ));
              }
              if (!newTask) {
                return <h4 className="tasks__empty">No tasks created.</h4>;
              }
              return null;
            }}
          </Query>
        </div>
      </Container>
    </Styled>
  );
};

export default TasksPage;
