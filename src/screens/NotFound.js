import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import '../css/App.css'

class NotFound extends Component {

    render() {
        return (
            <div className='App-title'>
                <h1>Página não encontrada !</h1>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, actions)(NotFound)