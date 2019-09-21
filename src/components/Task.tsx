import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import format from 'dateformat';
import { Query, QueryResult, Mutation, MutationFn } from 'react-apollo';

import 'react-datepicker/dist/react-datepicker.css';

import Check from './CheckCircle';
import Loader from './Loader';
import Button from './Button';
import Input from './elements/Input';

import * as colors from '../constants/colors';
import * as styles from '../constants/styles';

import CURRENT_USER, { IUserInSession } from '../apollo/queries/userInSession';
import CREATE_TASK from '../apollo/mutations/createTask';
import UPDATE_TASK from '../apollo/mutations/updateTask';

const Styled = styled.div`
  border-bottom: 1px solid ${colors.GRAY_2()};
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 2rem auto 10rem;
  grid-gap: 2rem;

  &:last-child {
    border-bottom: none;
  }

  .checkmark {
    cursor: pointer;
    opacity: 0.5;
    transition: 250ms all;
  }
  .checkmark:hover,
  &.checked .checkmark {
    opacity: 1;
  }
  .checkmark svg {
    width: 2rem;
    height: 2rem;
  }
  .summary__text {
    margin-bottom: 0.5rem;
  }
  .summary__date {
    display: flex;
    font-size: 0.7rem;
    align-items: center;
  }
  .summary__date span {
    color: ${colors.GRAY_4()};
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-right: 0.5rem;
  }
  .summary__date input {
    font: inherit;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: ${styles.BOX_SHADOW};
    border-radius: 5px;
    padding: 0.5rem 0.75rem;
    transition: 250ms all;
    outline: none;
    width: 100%;
    font-size: 0.8rem;
  }
  .summary__date__project {
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    height: fit-content;
    padding: 0.15rem 0.5rem;
    font-weight: bold;
    margin-right: 1rem;
  }
  .save {
    display: flex;
    justify-content: flex-end;
  }
  .save button {
    height: fit-content;
    margin-left: 1rem;
  }
`;

interface IProps {
  task?: ITask;
  editing: boolean;
  onClickCancel: () => void;
}

const Task: React.FC<IProps> = props => {
  const completed = props.task ? props.task.completed : false;

  const [editing, setEditing] = useState(props.editing || false);
  const [summary, setSummary] = useState(props.task ? props.task.summary : '');
  const [date, setDate] = useState(
    props.task ? new Date(props.task.dueDate) : new Date()
  );

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    props.onClickCancel();
    setSummary(props.task ? props.task.summary : '');
  };
  const onSave = () => {
    setEditing(false);
    props.onClickCancel();
  };

  return (
    <Query query={CURRENT_USER}>
      {(query: QueryResult<IUserInSession>) => {
        const { loading, data } = query;
        if (loading) {
          return <Loader />;
        }
        if (data && data.mUserInSession) {
          return (
            <Styled className={completed ? 'checked' : 'unchecked'}>
              <Mutation mutation={UPDATE_TASK}>
                {(update: MutationFn) => (
                  <div className="checkmark">
                    <Check
                      onClick={() => {
                        if (props.task) {
                          update({
                            refetchQueries: ['GetTasks'],
                            variables: {
                              id: props.task.id,
                              completed: !completed
                            }
                          });
                        }
                      }}
                      fill={completed ? colors.GREEN() : colors.GRAY_2()}
                    />
                  </div>
                )}
              </Mutation>
              <div className="summary">
                {editing ? (
                  <Input
                    value={summary}
                    onChange={val => setSummary(val)}
                    style={{ marginBottom: '1rem' }}
                  />
                ) : (
                  <p className="summary__text">{summary}</p>
                )}
                <div className="summary__date">
                  {props.task && props.task.project && (
                    <div
                      className="summary__date__project"
                      style={{ borderColor: '#C56CD6', color: '#C56CD6' }}
                    >
                      {props.task.project.name}
                    </div>
                  )}
                  <span>Due On</span>
                  {editing ? (
                    <DatePicker
                      selected={date}
                      onChange={d => setDate(d || new Date())}
                    />
                  ) : (
                    <strong>{format(date, 'dddd, mmmm d, yyyy')}</strong>
                  )}
                </div>
              </div>
              <div className="save">
                {editing ? (
                  <>
                    <Button secondary={true} onClick={onCancel}>
                      Cancel
                    </Button>
                    <Mutation mutation={props.task ? UPDATE_TASK : CREATE_TASK}>
                      {(create: MutationFn) => (
                        <Button
                          onClick={() => {
                            onSave();
                            create({
                              refetchQueries: ['GetTasks'],
                              variables: {
                                id: props.task ? props.task.id : undefined,
                                userId: data.mUserInSession.id,
                                summary,
                                dueDate: date.toISOString()
                              }
                            });
                          }}
                        >
                          Save
                        </Button>
                      )}
                    </Mutation>
                  </>
                ) : (
                  <Button secondary={true} onClick={onEdit}>
                    Edit
                  </Button>
                )}
              </div>
            </Styled>
          );
        }
        return null;
      }}
    </Query>
  );
};

export default Task;
