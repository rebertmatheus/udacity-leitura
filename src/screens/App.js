import React, { Component } from 'react'
import logo from '../resources/logo.svg'
import '../css/App.css'
import PostList from './PostList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Udacity - Leitura</h1>
        </header>
        <p className="App-intro">Posts</p>
        <PostList/>
      </div>
    );
  }
}

export default App;
