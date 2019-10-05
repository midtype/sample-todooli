import { gql } from 'apollo-boost';

export default gql`
  mutation CreateSubscription($plan: UUID!, $token: String!, $coupon: String) {
    createMStripeSubscription(
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
