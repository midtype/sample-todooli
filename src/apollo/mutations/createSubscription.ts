import { gql } from 'apollo-boost';

export default gql`
  mutation CreateSubscription(
    $plan: String!
    $token: String!
    $coupon: String
  ) {
    mCreateStripeSubscription(
      input: { planId: $plan, paymentSourcePid: $token, couponPid: $coupon }
    ) {
      mStripeSubscription {
        id
        pid
        active
      }
    }
  }
`;
