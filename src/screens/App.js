import React, { Component } from 'react'
import logo from '../resources/logo.svg'
import { Route, Switch } from "react-router-dom"
import EditAddPost from './EditAddPost'
import EditComment from './EditComment'
import Post from './Post'
import PostList from './PostList'
import Categories from '../components/Categories'
import CategoriesList from '../screens/CategoriesList'
import NotFound from './NotFound'

import '../css/App.css'

class App extends Component {

  render() {

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Udacity - Leitura</h1>
        </header>
        <div className='Categories' >
          <Categories />
        </div>
        <Switch>
          <Route exact path='/' component={PostList} />
          <Route exact path='/EditComments/:id' component={EditComment} />
          <Route exact path='/AddPost' component={EditAddPost} />
          <Route exact path='/EditPost/:id' component={EditAddPost} />
          <Route exact path='/:category/:id/' component={Post} />
          <Route exact path='/:categories/' component={CategoriesList} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App