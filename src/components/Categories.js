import React, { Component } from 'react'
import * as actions from '../redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/Categories.css'

//import ThumbPost from '../components/ThumbPost'
//import PropTypes from 'prop-types'

class Categories extends Component {

    componentDidMount () {
        this.props.fetchAllCategories()
    }
    render() {

        const { categories } = this.props

        return(
            <div>
                <div className="Content">
                    <Link className="close-search" to={`/`}>Principal</Link>
                </div>
                {categories &&
                    categories.map((categ) => (
                        <div key={categ.name} className="Content">
                        <Link className="close-search" to={`/${categ.path}/`}>{categ.name}</Link>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = ({categories}) => ({
    categories
})

export default connect(mapStateToProps, actions)(Categories)