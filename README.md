# Midtype Todooli Demo App

This is a demo frontend built by Midtype to demonstrate how to use the Midtype platform to power a SaaS product that requires a Stripe subscription in order to use it.

## Video Walkthrough

For a full video walkthrough of how to set up Todooli with your Midtype project, please watch the video below.

[![Toodoli Setup Walkthrough](https://img.youtube.com/vi/86wBAW3RqjU/0.jpg)](https://www.youtube.com/watch?v=86wBAW3RqjU)

## Generic Instructions

This project was built using [a starter kit for Midtype]() with the following libraries:

- **Typescript**, a [typed superset of Javascript](https://typescriptlang.org/docs/).
- **React** the [open-source front-end framework](https://reactjs.org/docs/).
- **Apollo Client** the [open-source library developed by Apollo GraphQL for building client applications that use a GraphQL API](https://www.apollographql.com/docs/react/).

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and slightly modified to integrate with Midtype.

## Getting Started

Before you get started, visit your project's Midtype dashboard and be sure you add `localhost:3000/login` as a valid login redirect URL to test this locally. This **shouldn not** be the default URL, just an additional one.

1. Cloning this repository and run `yarn` from within the root directory. This will install all necessary dependencies.
2. Next open the `.env` file in the root directory. Here, you'll find some important environment variables that you must update:

- `REACT_APP_MY_APP_NAME` - a display name for your application.
- `REACT_APP_MY_APP_ID` - the Midtype project ID for your application. This can be found in [the "Project" section of your Midtype dashboard](https://app.midtype.com/project).
- `REACT_APP_MY_APP_GOOGLE_SIGN_IN_LINK` - the Google sign in link for your project. This can also be found in [the "Project" section of your Midtype dashboard](https://app.midtype.com/project). You can create different `.env` files [for local versus production environments](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables), and each one should have the right Google sign in link. For local development, be sure this value is set to the sign in link associated with the `localhost:3000/login` redirect URL.

3. Run the `yarn start` command from the root directory and your application should start running on `localhost:3000`.

Once the app is up and running, you can use any of the GraphQL queries or mutations you find [in the API docs for your project](https://app.midtype.com/data). Good luck!
