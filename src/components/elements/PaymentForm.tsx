import React, { useState } from 'react';
import styled from 'styled-components';
import {
  StripeProvider,
  CardElement,
  Elements,
  ReactStripeElements,
  injectStripe
} from 'react-stripe-elements';
import { Query, QueryResult, Mutation, MutationFn } from 'react-apollo';

import PoweredByStripe from './PoweredByStripe';
import Loader from '../Loader';
import Button from '../Button';

import * as styles from '../../constants/styles';
import * as colors from '../../constants/colors';

import GET_PRODUCTS, { IProducts } from '../../apollo/queries/products';
import CREATE_SUBSCRIPTION from '../../apollo/mutations/createSubscription';

type Stripe = ReactStripeElements.StripeProps & {
  handleCardPayment: (
    code: string
  ) => Promise<{ error?: Error; paymentIntent: {} }>;
};

interface IProps {
  title?: string;
  description?: string;
  stripe?: Stripe;
}

const Styled = styled.div`
  .payment__header {
    margin-bottom: 2rem;
  }
  .payment__header h2 {
    margin-bottom: 0.5rem;
  }
  .payment__products {
    margin: 2rem 0;
  }
  .payment__products__container {
    display: flex;
    margin: 1rem 0;
  }
  .payment__products__plan {
    padding: 1rem;
    border: 1px solid ${colors.BLACK()};
    border-radius: 5px;
    flex: 0 0 33%;
    margin-right: 0.5rem;
    opacity: 0.6;
    transition: 250ms all;
    cursor: pointer;
  }
  .payment__products__plan:hover {
    opacity: 1;
  }
  .payment__products__plan h4,
  .payment__products__plan p {
    color: ${colors.BLACK()};
    transition: 250ms all;
  }
  .payment__products__plan--active {
    border: 1px solid ${colors.BRAND_1()};
    opacity: 1;
  }
  .payment__products__plan--active h4,
  .payment__products__plan--active p {
    color: ${colors.BRAND_1()};
  }
  .payment__products__plan__price span {
    font-size: 0.7rem;
  }
  .payment__cc__name input,
  .payment__cc__details {
    padding: 1rem;
    margin: 0.5rem auto;
    background: ${colors.WHITE()};
    box-shadow: ${styles.BOX_SHADOW};
  }
  .payment__cc__name {
    width: 100%;
    margin-top: 1rem;
  }
  .payment__cc__name label {
    font-size: 0.8rem;
  }
  .payment__cc__name input {
    font-size: 0.8rem;
    outline: none;
    border: none;
    margin: 0.5rem 0;
    padding: 0.8rem;
  }
  .payment__powered {
    margin-top: 2rem;
    width: 120px;
    height: 30px;
  }
  .payment__powered svg {
    width: 100%;
    height: 100%;
  }
  .payment__buttons {
    margin-top: 2rem;
  }
`;

interface IProductProps {
  active: boolean;
  amount: number;
  name: string;
  onClick: () => void;
}

const Product: React.FC<IProductProps> = props => (
  <div
    className={`payment__products__plan payment__products__plan--${
      props.active ? 'active' : 'inactive'
    }`}
    onClick={props.onClick}
  >
    <h4>{props.name}</h4>
    {props.amount ? (
      <p className="payment__products__plan__price payment__products__plan__price--free">
        ${(props.amount / 100).toFixed(2)}
        <span>/month</span>
      </p>
    ) : (
      <p className="payment__products__plan__price">Free</p>
    )}
  </div>
);

const PaymentForm: React.FC<IProps> = props => {
  const { stripe } = props;

  const [plan, setPlan] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const SubscribeButton = (
    <Mutation mutation={CREATE_SUBSCRIPTION}>
      {(subscribe: MutationFn) => {
        const onSubscribe = async () => {
          if (stripe) {
            setLoading(true);
            try {
              const res = await stripe.createToken({ name });
              const { token } = res;
              if (token) {
                subscribe({ variables: { plan, token } });
              } else {
                throw new Error('Invalid credit card details.');
              }
            } catch (e) {
              throw new Error('Invalid credit card details.');
            } finally {
              setLoading(false);
            }
          }
        };
        return <Button onClick={onSubscribe}>Subscribe</Button>;
      }}
    </Mutation>
  );

  return (
    <Styled className="payment">
      <div className="payment__header">
        <h2>{props.title || 'Subscription'}</h2>
        <p>
          {props.description ||
            'Select a plan and enter your billing information to begin.'}
        </p>
      </div>

      <div className="payment__products">
        <h4>Plans</h4>
        <Query query={GET_PRODUCTS}>
          {(query: QueryResult<IProducts>) => {
            const { loading, data } = query;
            if (loading) {
              return <Loader />;
            }
            if (data && data.stripeProducts) {
              return (
                <div className="payment__products__container">
                  {data.stripeProducts.nodes
                    .filter(product => product.stripePlans.nodes.length > 0)
                    .map(product => (
                      <Product
                        key={product.id}
                        active={plan === product.stripePlans.nodes[0].id}
                        name={product.name}
                        amount={product.stripePlans.nodes[0].amount}
                        onClick={() => setPlan(product.stripePlans.nodes[0].id)}
                      />
                    ))}
                </div>
              );
            }
          }}
        </Query>
        <a href="/pricing" target="_blank" rel="">
          Learn more about our pricing plans.
        </a>
      </div>

      <div className="payment__cc">
        <h4>Credit Card Information</h4>
        <div className="payment__cc__name">
          <label>Cardholder Name</label>
          <input
            className="payment__cc__name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="payment__cc__details">
          <CardElement />
        </div>
      </div>

      <div className="payment__powered">
        <PoweredByStripe />
      </div>

      <div className="payment__buttons">{SubscribeButton}</div>
    </Styled>
  );
};

const PaymentFormInjectedStripe = injectStripe(PaymentForm);

const PaymentFormWrappedStripe: React.FC<IProps> = props => (
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK as string}>
    <Elements>
      <PaymentFormInjectedStripe {...props} />
    </Elements>
  </StripeProvider>
);

export default PaymentFormWrappedStripe;
