import React from 'react';
import logo from '../logo.svg';
import './dashboard.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {}
  render() {
    return (
      <div className='container'>
        <div class="container">
          <div class="row">
            <div class="col-4">
              <h1 className='nombres'>Juan Carlos Navarro</h1>
            </div>
            <div class="col-4">
              <h1 className='nombres'>Brandon Chavarría</h1>
            </div>
            <div class="col-4">
              <h1 className='nombres'>Reggy Guevara</h1>
            </div>
          </div>
        </div>
        <div className="logo-container">
          <img src={logo} className="App-logo" alt='logo' />
        </div>
      </div>

    );
  }
}

export default Dashboard;
