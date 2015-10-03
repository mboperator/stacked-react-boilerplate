import React from 'react';
import { Link } from 'react-router';

export default class Base extends React.Component {
  static defaultProps = {
    navItems: [
      { label: 'Wizard', path: '/widgets/wizard' },
    ],
  };
  render() {
    return (
      <span>
        <div className='top-nav-bar company-area'>
          <nav className='nav-tab-container company-area'>
            <section className='nav-tabs'>
              <div className='tabs'>
                {this.props.navItems.map(navItem => {
                  return (
                    <div className='tab'>
                      <Link to={navItem.path}>{navItem.label}</Link>
                    </div>
                  );
                })}
              </div>
            </section>
          </nav>
        </div>
        <div className='wrap' id='main_content'>
          <div className='tool-content' id='main_panel'>
            <div className='tool-notifications'>
            </div>
            <div className='tool-body'>
              {this.props.children}
            </div>
          </div>
        </div>
      </span>
    );
  }
}
