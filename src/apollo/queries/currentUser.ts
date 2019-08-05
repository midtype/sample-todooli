import { gql } from 'apollo-boost';

export default gql`
  {
    currentUser {
      id
      name
      email
      photoUrl
      stripeSubscriptionBySubscriberId {
        id
        plan {
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
