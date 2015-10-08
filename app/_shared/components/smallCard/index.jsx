import React from 'react';
import { Col } from 'react-bootstrap';

export default class SmallCard extends React.Component {
  static propTypes = {
    header: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
  }

  static defaultProps = {
    imageDirection: 'left',
  };

  constructor(props) {
    super(props);
  }

  renderImage() {
    const { imageUrl } = this.props;
    return (
      <Col md={6}>
        {imageUrl ? <img style={{maxHeight: '200px'}} src={imageUrl}></img> : null}
      </Col>
    );
  }

  render() {
    const {header, children, imageDirection} = this.props;
    return (
      <Col md={4} style={{height: '350px'}}>
        {this.renderImage()}
        <h2>{header}</h2>
        {children}
      </Col>
    );
  }
}
