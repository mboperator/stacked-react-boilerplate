import React from 'react';
import SplitContent from 'components/splitContent';

const mockData = require('utils/mockData.json');

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>
          About
        </h2>
        <SplitContent
          leftPane={() => {
            return mockData[0];
          }}
        />
        <SplitContent
          leftWeighted={false}
          rightPane={() => {
            return mockData[0];
          }}
          leftPane={() => {
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
          }}
        />
        <SplitContent
          leftPane={() => {
            return mockData[0];
          }}
          rightPane={() => {
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
          }}
        />
      </div>
    );
  }
}
