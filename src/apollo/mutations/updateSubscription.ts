import { gql } from 'apollo-boost';

export default gql`
  mutation UpdateSubscription($id: UUID!, $token: String!) {
    updateMStripeSubscription(
      input: { id: $id, patch: { paymentSourcePid: $token } }
    ) {
      mStripeSubscription {
        id
        pid
        active
      }
    }
  }
`;
