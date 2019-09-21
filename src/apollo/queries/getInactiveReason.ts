import { gql } from 'apollo-boost';

export default gql`
  query GetInactiveReason($id: UUID!) {
    mStripeSubscription(id: $id) {
      id
      inactiveReason {
        cause
        requiresActionSecret
      }
    }
  }
`;

export interface IInactiveReason {
  mStripeSubscription: {
    inactiveReason: {
      cause: string;
      requiresActionSecret: string;
    };
  };
}
