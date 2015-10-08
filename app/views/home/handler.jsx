import React from 'react';
import { Jumbotron, Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BigCard from 'components/bigcard';
import SmallCard from 'components/smallCard';

class HomeHandler extends React.Component {
  render() {
    return (
      <span>
        <Jumbotron>
          <h1>Stacked.</h1>
          <p>This is a bootstrap based boilerplate focused on productivity and developer experience.</p>
          <p>
            <LinkContainer to='/about'>
              <Button bsStyle='primary'>Learn more</Button>
            </LinkContainer>
          </p>
        </Jumbotron>

        <Row>
          <BigCard
            imageDirection='right'
            header='React'
            imageUrl='http://formatjs.io/img/react.svg'>
            <p>A library for creating user interfaces</p>
          </BigCard>
        </Row>

        <Row>
          <SmallCard header='Redux'>
            <p>Functional state management</p>
          </SmallCard>
          <SmallCard header='Hot Loading'>
            <p>Injects CSS and Javascript changes</p>
          </SmallCard>
        </Row>
      </span>
    );
  }
}

export default HomeHandler;
