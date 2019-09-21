import { gql } from 'apollo-boost';

export default gql`
  query GetProducts {
    mStripeProducts {
      nodes {
        id
        pid
        slug
        name
        mStripePlansByProductId {
          nodes {
            id
            pid
            slug
            amount
          }
        }
      }
    }
  }
`;

export interface IProducts {
  stripeProducts: {
    nodes: IStripeProduct[];
  };
}
