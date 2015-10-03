import React from 'react';
import Base from './layout/base';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  yieldMain() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  getNavItems() {
    return [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about/' },
    ];
  }

  render() {
    return (
      <Base navItems={this.getNavItems()}>
        {this.yieldMain()}
      </Base>
    );
  }
}

