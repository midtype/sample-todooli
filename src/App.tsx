import React, { lazy, Suspense } from 'react';
import { Query, QueryResult } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import GlobalStyle from './components/GlobalStyle';
import Nav from './components/Nav';
import Loader from './components/Loader';
import CURRENT_USER from './apollo/queries/currentUser';

const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));

const AppIndex = lazy(() => import('./pages/app/Index'));

/**
 * There are some routes in our app that we only want logged in users to be able to
 * access. For those routes, we wrap them in a GraphQL query that checks if the user
 * is currently logged in. If not, we redirect them to the login page. To learn
 * more about the Apollo `<Query />` component, [see their documentation](https://www.apollographql.com/docs/react/essentials/queries/#the-query-component)
 */
const protect = (Page: React.FC): JSX.Element => (
  <Query query={CURRENT_USER}>
    {(query: QueryResult) => {
      const { loading, data } = query;
      if (loading) {
        return <Loader />;
      }
      return data && data.currentUser ? <Page /> : <Redirect to="/" />;
    }}
  </Query>
);

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Suspense fallback={<Loader />}>
          {/* Public Routes */}
          <Route path="/" exact component={Index} />
          <Route path="/about" exact component={About} />
          <Route path="/faqs" exact component={FAQs} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/pricing" exact component={Pricing} />
          <Route path="/login" exact component={Login} />

          {/* Protected Routes */}
          {/* <Route path="/app" exact render={() => protect(AppIndex)} /> */}
          <Route path="/app" exact component={AppIndex} />
          <Route path="/app/billing" exact render={() => protect(Pricing)} />
        </Suspense>
      </Switch>
      <GlobalStyle />
    </Router>
  );
};

export default App;
