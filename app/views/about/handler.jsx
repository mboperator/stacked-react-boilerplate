import React from 'react';

export default class App extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hope this works</h1>
    );
  }
}
