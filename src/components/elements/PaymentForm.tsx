import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import {
  StripeProvider,
  CardElement,
  Elements,
  ReactStripeElements,
  injectStripe
} from 'react-stripe-elements';
import {
  Query,
  QueryResult,
  Mutation,
  MutationFn,
  withApollo
} from 'react-apollo';
import { ApolloClient } from 'apollo-boost';

import PoweredByStripe from './PoweredByStripe';
import Loader from '../Loader';
import Button from '../Button';

import * as styles from '../../constants/styles';
import * as colors from '../../constants/colors';

import GET_PRODUCTS, { IProducts } from '../../apollo/queries/products';
import CREATE_SUBSCRIPTION from '../../apollo/mutations/createSubscription';
import UPDATE_SUBSCRIPTION from '../../apollo/mutations/updateSubscription';
import GET_CURRENT_USER, {
  IUserInSession
} from '../../apollo/queries/userInSession';
import GET_INACTIVE_REASON, {
  IInactiveReason
} from '../../apollo/queries/getInactiveReason';

type Stripe = ReactStripeElements.StripeProps & {
  handleCardPayment: (
    code: string
  ) => Promise<{ error?: Error; paymentIntent: {} }>;
};

const STRIPE_KEY = process.env.REACT_APP_STRIPE_PK || '';
const GlobalStripe: Stripe = (window as any).Stripe(STRIPE_KEY);

interface IProps {
  title?: string;
  description?: string;
  stripe?: Stripe;
  client?: any;
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
  input,
  .payment__cc__details {
    padding: 1rem;
    margin: 0.5rem auto;
    background: ${colors.WHITE()};
    box-shadow: ${styles.BOX_SHADOW};
  }
  .payment__cc__name,
  .payment__cc__coupon {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-flow: column;
  }
  .payment__cc__name label,
  .payment__cc__coupon label {
    font-size: 0.8rem;
  }
  input {
    font-size: 0.8rem;
    outline: none;
    border: none;
    margin: 0.5rem 0;
    padding: 0.8rem;
  }
  .payment__cc__coupon {
    margin-top: 2rem;
  }
  .payment__buttons {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .payment__powered {
    width: 120px;
    height: 28px;
  }
  .payment__powered svg {
    width: 100%;
    height: 100%;
  }
  .payment__error {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    width: fit-content;
    border-radius: 3px;
    margin-top: 1rem;
    margin-left: 1rem;
    background: ${colors.RED(0.1)};
    color: ${colors.RED()};
    font-weight: bold;
    animation: slide 250ms ease-in-out;
    will-change: transform;
  }

  @keyframes slide {
    from {
      transform: translateX(calc(100% + 2rem));
    }
    to {
      transform: translateX(0);
    }
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

const checkActive = (client: ApolloClient<any>, stripe?: Stripe) => {
  if (client && stripe) {
    client.query<IUserInSession>({ query: GET_CURRENT_USER }).then(res => {
      if (res.data && res.data.mUserInSession) {
        const { subscription: sub } = res.data.mUserInSession;
        if (sub && !sub.active) {
          client
            .query<IInactiveReason>({
              query: GET_INACTIVE_REASON,
              variables: { id: sub.id }
            })
            .then(res => {
              const { inactiveReason } = res.data.mStripeSubscription;
              if (inactiveReason.requiresActionSecret) {
                GlobalStripe.handleCardPayment(
                  inactiveReason.requiresActionSecret
                );
              }
            });
        }
      }
    });
  }
};

const PaymentForm: React.FC<IProps> = props => {
  const { stripe, client } = props;

  useEffect(() => {
    checkActive(client, stripe);
  }, [client, stripe]);

  const [plan, setPlan] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onError = useCallback(
    (message: string, time?: number) => {
      setError(message);
      setTimeout(() => setError(null), time || 5000);
    },
    [setError]
  );

  const getSubscribeButton = useCallback(
    (sub?: IStripeSubscription) => (
      <Mutation mutation={sub ? UPDATE_SUBSCRIPTION : CREATE_SUBSCRIPTION}>
        {(subscribe: MutationFn) => {
          const onSubscribe = async () => {
            if (stripe && plan) {
              setError(null);
              setLoading(true);
              try {
                const res = await stripe.createToken({ name });
                const { token } = res;
                if (token) {
                  await subscribe({
                    variables: {
                      id: sub ? sub.id : '',
                      plan,
                      token: token.id,
                      coupon: coupon || undefined
                    }
                  })
                    .then(res => {
                      if (
                        res &&
                        res.data.registerStripeSubscription.stripeSubscription
                          .active
                      ) {
                        window.location.assign('/app');
                      } else {
                        checkActive(client, stripe);
                      }
                    })
                    .catch(e => onError(e.message));
                } else {
                  onError('Invalid credit card details.');
                }
              } catch (e) {
                onError('Invalid credit card details.');
              } finally {
                setLoading(false);
              }
            } else if (!plan) {
              onError('You must pick a plan to subscribe to.');
            }
          };
          return (
            <Button loading={loading} onClick={onSubscribe}>
              Subscribe
            </Button>
          );
        }}
      </Mutation>
    ),
    [client, coupon, loading, name, onError, plan, stripe]
  );

  return (
    <Query query={GET_CURRENT_USER}>
      {(query: QueryResult<IUserInSession>) => {
        const { loading, data } = query;
        if (loading) {
          return <Loader />;
        }
        if (data && data.mUserInSession) {
          const { subscription: sub } = data.mUserInSession;
          const SubscribeButton = getSubscribeButton(sub);
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
                    if (data && data.mStripeProducts) {
                      return (
                        <div className="payment__products__container">
                          {data.mStripeProducts.nodes
                            .filter(product => product.plans.nodes.length > 0)
                            .map(product => (
                              <Product
                                key={product.id}
                                active={plan === product.plans.nodes[0].id}
                                name={product.name}
                                amount={product.plans.nodes[0].amount}
                                onClick={() =>
                                  setPlan(product.plans.nodes[0].id)
                                }
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
                  <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="payment__cc__details">
                  <CardElement />
                </div>
                <div className="payment__cc__coupon">
                  <label>Coupon Code</label>
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                  />
                </div>
              </div>

              <div className="payment__buttons">
                {SubscribeButton}
                <div className="payment__powered">
                  <PoweredByStripe />
                </div>
              </div>

              {error && <div className="payment__error">{error}</div>}
            </Styled>
          );
        }
        return null;
      }}
    </Query>
  );
};

const PaymentFormInjectedStripe = injectStripe(withApollo(PaymentForm));

const PaymentFormWrappedStripe: React.FC<IProps> = props => (
  <StripeProvider apiKey={STRIPE_KEY}>
    <Elements>
      <PaymentFormInjectedStripe {...props} />
    </Elements>
  </StripeProvider>
);

export default PaymentFormWrappedStripe;
