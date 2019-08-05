import { gql } from 'apollo-boost';

export default gql`
  mutation CreateSubscription($plan: UUID!, $token: String!, $coupon: String) {
    registerStripeSubscription(
      input: {
        stripePlanId: $plan
        paymentSourcePid: $token
        couponPid: $coupon
      }
    ) {
      stripeSubscription {
        id
        pid
        active
      }
    }
  }
`;
