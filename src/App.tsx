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
import CURRENT_USER, { IUserInSession } from './apollo/queries/userInSession';

const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));

const AppIndex = lazy(() => import('./pages/app/Index'));
const AppOnboarding = lazy(() => import('./pages/app/Onboarding'));

/**
 * There are some routes in our app that we only want logged in users to be able to
 * access. For those routes, we wrap them in a GraphQL query that checks if the user
 * is currently logged in. Furthermore, we check to see if the user has an active
 * Stripe subscription, and if not, redirect them to the payment flow so that they
 * can create one. If not, we redirect them to the login page. To learn more about
 * the Apollo `<Query />` component, [see their documentation](https://www.apollographql.com/docs/react/essentials/queries/#the-query-component)
 */
const protect = (Page: React.FC): JSX.Element => {
  const { pathname } = window.location;

  return (
    <Query query={CURRENT_USER}>
      {(query: QueryResult<IUserInSession>) => {
        const { loading, data } = query;

        const isOnboarding = pathname.indexOf('/app/onboarding') === 0;
        const isLoggedIn = data && data.mUserInSession;
        const isSubscriber =
          data &&
          data.mUserInSession &&
          data.mUserInSession.mStripeSubscriptionBySubscriberId &&
          data.mUserInSession.mStripeSubscriptionBySubscriberId.active;

        if (loading) {
          return <Loader />;
        }
        if (!isLoggedIn) {
          // If a non-logged user is trying to access the app, redirect them to the homepage.
          return <Redirect to="/" />;
        }
        if (!isSubscriber && !isOnboarding) {
          // If a non-subscriber is trying to reach the app, redirect them to the payment screen.
          return <Redirect to="/app/onboarding" />;
        }
        if (isSubscriber && isOnboarding) {
          // If a subscriber is trying to create a subscription, redirect them to the app.
          return <Redirect to="/app" />;
        }
        return <Page />;
      }}
    </Query>
  );
};

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
          <Route path="/app" exact render={() => protect(AppIndex)} />
          <Route
            path="/app/onboarding"
            exact
            render={() => protect(AppOnboarding)}
          />
          <Route path="/app/profile" exact render={() => protect(Pricing)} />
        </Suspense>
      </Switch>
      <GlobalStyle />
    </Router>
  );
};

export default App;
