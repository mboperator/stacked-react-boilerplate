import React from 'react';
import { Jumbotron, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

        <Col md={4}>
          <h2>React</h2>
          <p>A library for creating user interfaces</p>
        </Col>

        <Col md={4}>
          <h2>Redux</h2>
          <p>Functional state management</p>
        </Col>

        <Col md={4}>
          <h2>Hot Loading</h2>
          <p>Instant feedback</p>
        </Col>
      </span>
    );
  }
}

export default HomeHandler;
