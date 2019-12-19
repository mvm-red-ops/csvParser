import React, {Component} from 'react';
import './App.css';
import CSVParser from './CSVParser/CSVParser'
import OrderColumnHome from './ColumnFormatter/OrderColumnHome'
import ParserDropdown from './ParserDropdown'


class App extends Component {
  constructor(){
    super()
    this.state = {
      tableDisplayed: null
    }
  }
  
  render(){
    return (
      <div className="App" style={appStyle}>
          <div className="text-box">
            <h1 className="heading-primary">
              <span class="heading-primary-main">Refactor</span>
              <span class="heading-primary-sub">CSV Parser</span>
            </h1>
          </div>
          <div className="main-wrapper">
            <CSVParser />
          </div>
        </div>
    );
  }
}

export default App

const appStyle = {
  height: '50%',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  resize: 'both',
  overflow: 'none',
  borderRadius: '5px'
}
