import { gql } from 'apollo-boost';

export default gql`
  query GetInactiveReason($id: UUID!) {
    stripeSubscription(id: $id) {
      id
      inactiveReason {
        cause
        requiresActionSecret
      }
    }
  }
`;

export interface IInactiveReason {
  stripeSubscription: {
    inactiveReason: {
      cause: string;
      requiresActionSecret: string;
    };
  };
}
