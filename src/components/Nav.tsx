import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { Query, QueryResult } from 'react-apollo';
import { Text, Icon } from 'atomize';

import Logo from './Logo';
import Button from './Button';
import Loader from './Loader';
import Container from './MarketingContainer';

import * as colors from '../constants/colors';
import CURRENT_USER from '../apollo/queries/currentUser';

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
  return (
    <Styled>
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
          {(query: QueryResult) => {
            const { loading, data } = query;
            if (loading) {
              return <Loader />;
            }
            if (data && data.currentUser && isApp) {
              return (
                <div className="nav__section nav__section--profile">
                  <div
                    className="nav__section__avatar"
                    style={{
                      backgroundImage: `url('${data.currentUser.photoUrl}')`
                    }}
                  />
                </div>
              );
            }
            if (data && data.currentUser) {
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
                <NavLink path="/login" title="Login" />
                <Button secondary={true}>
                  Sign Up
                  <Icon
                    name="LongRight"
                    size="16px"
                    color="black"
                    m={{ l: '.5rem' }}
                  />
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
