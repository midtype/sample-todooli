import { gql } from 'apollo-boost';

export default gql`
  query GetCurrentUser {
    currentUser {
      id
      private {
        name
        email
        photoUrl
      }
      stripeSubscriptionBySubscriberId {
        active
        id
        pid
        stripePlan {
          id
          slug
          amount
        }
      }
    }
  }
`;

export interface ICurrentUser {
  currentUser: IUser;
}
