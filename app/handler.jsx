import React from 'react';
import {Grid, Col} from 'react-bootstrap';
import NavBar from './components/NavBar';

class App extends React.Component {
  render() {
    return (
      <div style={{margin: '0 auto'}}>
        <Grid>
          <Col xs={12} md={12}>
            <NavBar/>
          </Col>
          <Col xs={12} md={12}>
            {this.props.children}
          </Col>
        </Grid>
      </div>
    );
  }
}

export default App;
