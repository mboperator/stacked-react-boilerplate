import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Base extends React.Component {
  render(){
    const {
      main,
      sidebar,
    } = this.props;

    return (
      <Row>
        {main ? <Col sm={sidebar ? 10 : 12}>{main()}</Col> : null }
        {sidebar ? <Col sm={2}>{sidebar()}</Col> : null }
      </Row>
    )
  }
};

export default Base;
