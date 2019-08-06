import React from 'react';
import styled from 'styled-components';
import { Query, QueryResult } from 'react-apollo';
import qs from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import LoginForm from '../components/elements/LoginForm';

import Loader from '../components/Loader';
import CURRENT_USER from '../apollo/queries/currentUser';
import { setJWT } from '../utils/jwt';

const Styled = styled.div`
  padding-top: 5rem;

  .login-form__container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LoginPage: React.FC<RouteComponentProps> = props => {
  // Use React Routers' location function to get the query parameters in the URL.
  // Then check if we have a JWT included as a query parameter.
  const { location } = props;
  const { jwt } = qs.parse(location.search);

  // If we have a JWT, save it to local storage so that we can include it in all
  // requests to our API from here on.
  if (jwt && typeof jwt === 'string') {
    setJWT(jwt);
    window.location.assign('/app');
    return null;
  }

  return (
    <Query query={CURRENT_USER}>
      {(query: QueryResult) => {
        const { loading, data } = query;
        if (loading) {
          return <Loader />;
        }
        if (data && data.currentUser) {
          return <Redirect to="/app" />;
        }
        return (
          <Styled>
            <AppHeader />
            <div className="login-form__container">
              <LoginForm />
            </div>
          </Styled>
        );
      }}
    </Query>
  );
};

export default withRouter(LoginPage);
