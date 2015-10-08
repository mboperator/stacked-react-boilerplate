import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class SplitContent extends React.Component {
  static propTypes = {
    leftPane: React.PropTypes.func,
    leftWeighted: React.PropTypes.bool,
  };

  static defaultProps = {
    leftWeighted: true,
    leftPane: () =>  null,
    rightPane: () => {
      return (
        <span>
          <img
            style={{width: '100%'}}
            src='http://formatjs.io/img/react.svg'/>
          <div style={{textAlign: 'center', paddingTop: '10px'}}>
            <p>Picture here.</p>
          </div>
        </span>
      );
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      leftWeighted, leftPane, rightPane
    } = this.props;

    return (
      <Row style={{display: 'flex', alignItems: 'center'}}>
        <Col md={leftWeighted ? 8 : 4}>
          {leftPane()}
        </Col>
        <Col md={leftWeighted ? 4 : 8}>
          {rightPane()}
        </Col>
      </Row>
    );
  }
}
