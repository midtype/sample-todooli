import { gql } from 'apollo-boost';

export default gql`
  query GetUserInSession {
    mUserInSession {
      id
      private {
        name
        email
        photoUrl
      }
      subscription {
        active
        id
        pid
        plan {
          id
          slug
          amount
        }
      }
    }
  }
`;

export interface IUserInSession {
  mUserInSession: IUser;
}
