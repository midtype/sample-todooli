import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { Query, QueryResult } from 'react-apollo';
import { Text } from 'atomize';

import Logo from './Logo';
import Button from './Button';
import Loader from './Loader';
import Container from './MarketingContainer';
import LoginModal from './elements/LoginModal';

import * as colors from '../constants/colors';
import * as styles from '../constants/styles';
import CURRENT_USER, { IUserInSession } from '../apollo/queries/userInSession';

const Styled = styled.header`
  position: absolute;
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
  z-index: 100;

  .nav__container {
    display: flex;
  }
  .nav__section {
    display: flex;
    align-items: center;
  }
  .nav__section--logo {
    flex: 0 0 5rem;
    margin-right: 2rem;
  }
  .nav__section--links {
    flex: 1 1 auto;
  }
  .nav__section--login {
    flex: 0 0 20rem;
  }
  .nav__section__link {
    margin-right: 2rem;
    color: white;
    opacity: 0.8;
    transition: 250ms all;
  }
  .nav__section__link:hover {
    opacity: 1;
  }
  .nav__section:last-child {
    justify-content: flex-end;
  }
  .nav__section__avatar {
    width: 3rem;
    height: 3rem;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    margin: auto;
    border-radius: 50%;
    transition: 250ms all;
    cursor: pointer;
  }
  .nav__section__avatar:hover {
    transform: translateY(-2px);
    box-shadow: ${styles.BOX_SHADOW_DARK};
  }
  .nav__section__login-button {
    color: white;
    margin-right: 2rem;
  }

  @media screen and (max-width: 768px) {
    .nav__section--links {
      display: none;
    }
    .nav__section--login {
      flex: 1 1 auto;
    }
  }
`;

interface INavLinkProps {
  title: string;
  path: string;
}

const NavLink: React.FC<INavLinkProps> = props => (
  <Link to={props.path} className="nav__section__link">
    <Text textSize="subheader">{props.title}</Text>
  </Link>
);

const Nav: React.FC<RouteComponentProps> = props => {
  const { location } = props;
  const isApp = location.pathname.indexOf('/app') === 0;
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <Styled>
      <LoginModal open={loginOpen} onClickClose={() => setLoginOpen(false)} />
      <Container className="nav__container">
        <div className="nav__section nav__section--logo">
          <Link to="/">
            <Logo color={colors.WHITE()} />
          </Link>
        </div>
        <div className="nav__section nav__section--links">
          <NavLink path="/" title="Home" />
          <NavLink path="/about" title="About" />
          <NavLink path="/faqs" title="FAQs" />
          <NavLink path="/pricing" title="Pricing" />
        </div>
        <Query query={CURRENT_USER}>
          {(query: QueryResult<IUserInSession>) => {
            const { loading, data } = query;
            if (loading) {
              return <Loader />;
            }
            if (data && data.mUserInSession && isApp) {
              return (
                <div className="nav__section nav__section--profile">
                  <div
                    className="nav__section__avatar"
                    style={{
                      backgroundImage: `url('${data.mUserInSession.photoUrl}')`
                    }}
                  />
                </div>
              );
            }
            if (data && data.mUserInSession) {
              return (
                <div className="nav__section nav__section--login">
                  <Link to="/app">
                    <Button secondary={true}>Go To Dashboard</Button>
                  </Link>
                </div>
              );
            }
            return (
              <div className="nav__section nav__section--login">
                <button
                  className="nav__section__login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </button>
                <Button secondary={true} onClick={() => setLoginOpen(true)}>
                  Sign Up
                </Button>
              </div>
            );
          }}
        </Query>
      </Container>
    </Styled>
  );
};

export default withRouter(Nav);
