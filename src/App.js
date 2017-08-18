import React, { Component } from 'react';
import MainNav from './components/MainNav';
import BlogBox from './components/BlogBox';

class App extends Component {
  render() {
    return (
      <div className="container">
        <MainNav />
        <BlogBox />
      </div>
    );
  }
}

export default App;
