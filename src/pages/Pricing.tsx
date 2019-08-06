import React from 'react';
import styled from 'styled-components';
import { Text } from 'atomize';
import { Query, QueryResult } from 'react-apollo';

import MarketingHeader from '../components/MarketingHeader';
import Container from '../components/MarketingContainer';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

import * as colors from '../constants/colors';

import GET_PRODUCTS, { IProducts } from '../apollo/queries/products';

interface IEmployeeProps {
  image: string;
  name: string;
  title: string;
}

const Styled = styled.div`
  .pricing__plans {
    display: flex;
    justify-content: center;
    margin-bottom: 10rem;
  }
  .pricing__plans__plan {
    margin: auto;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 32px 40px -1px rgba(8, 11, 14, 0.1);
    margin: 1rem;
    padding: 2rem;
    min-width: 20rem;
  }
  .pricing__plans__plan__illustration {
    width: 10rem;
    height: 10rem;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    margin: auto;
    margin-bottom: 1rem;
    border-radius: 50%;
  }
`;

const Plan: React.FC<IEmployeeProps> = props => (
  <div className="pricing__plans__plan">
    <div
      className="pricing__plans__plan__illustration"
      style={{ backgroundImage: `url('${props.image}')` }}
    />
    <Text tag="h3" textAlign="center" textSize="heading">
      {props.name}
    </Text>
    <Text textAlign="center" textSize="subheader" m={{ b: '2rem' }}>
      {props.title}
    </Text>
    <div>{props.children}</div>
  </div>
);

const PricingPage: React.FC = () => {
  return (
    <Styled>
      <MarketingHeader bg={colors.BRAND_1}>
        <Container>
          <Text
            tag="h1"
            textAlign="center"
            textSize="display2"
            textColor="white"
            m={{ b: '1rem' }}
          >
            To do lists for everyone.
          </Text>
          <Text
            tag="p"
            textAlign="center"
            textColor="white"
            textSize="heading"
            maxW="50rem"
            p={{ b: '5rem' }}
            m="auto"
          >
            Whether you just want something to keep track of tasks or you're a
            cross-functioning team, we have a plan for you.
          </Text>
        </Container>
      </MarketingHeader>
      <Query query={GET_PRODUCTS}>
        {(query: QueryResult<IProducts>) => {
          const { loading, data } = query;
          if (loading) {
            return <Loader />;
          }
          if (data && data.stripeProducts) {
            return (
              <div className="pricing__plans">
                {data.stripeProducts.nodes.map((product: any) => (
                  <Plan
                    image={`/images/illustrations/products/${product.slug}.png`}
                    name={product.name}
                    title={
                      product.stripePlans.nodes[0].amount
                        ? `$${(
                            product.stripePlans.nodes[0].amount / 100
                          ).toFixed(2)}/month`
                        : 'Free'
                    }
                  />
                ))}
              </div>
            );
          }
        }}
      </Query>
      <Footer />
    </Styled>
  );
};

export default PricingPage;
