import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Container from '../../components/MarketingContainer';
import Task from '../../components/Task';

import * as colors from '../../constants/colors';

const Styled = styled.div`
  padding: 3rem;
  padding-top: 8rem;

  .nav__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 5rem;
    background: linear-gradient(
      to right,
      ${colors.BRAND_1_LIGHT(1)},
      ${colors.BRAND_1_LIGHT(0.5)}
    );
  }

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
`;

const AboutPage: React.FC = () => {
  return (
    <Styled>
      <div className="nav__bg" />
      <Container className="container">
        <div className="menu">
          <Button className="menu__create">Create Task</Button>
          <h4 className="menu__list-heading">Tasks</h4>
          <ul className="menu__list">
            <li className="menu__list__item menu__list__item--active">Open</li>
            <li className="menu__list__item">Completed</li>
          </ul>
          <h4 className="menu__list-heading">Projects</h4>
          <ul className="menu__list">
            <li className="menu__list__item">Open</li>
            <li className="menu__list__item">Completed</li>
          </ul>
        </div>
        <div className="tasks">
          <Task completed={true} />
          <Task editing={true} />
        </div>
      </Container>
    </Styled>
  );
};

export default AboutPage;
