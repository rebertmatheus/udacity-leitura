import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import ThumbPost from '../components/ThumbPost'
import AddButton from '../components/AddButton'
import SortPosts from '../components/SortPosts'
import sortBy from 'sort-by'

//import { Link } from 'react-router-dom'

class CategoriesList extends Component {

    state = {
        sort:'none',
        currCategory: ''
    }

    componentDidMount() {
        this.props.fetchCategoriesPost(this.props.match.params.categories)
    }

    componentDidUpdate() {
        if(this.state.currCategory !== this.props.match.params.categories) {
            this.setState(() => ({ currCategory: this.props.match.params.categories }))
            this.props.fetchCategoriesPost(this.props.match.params.categories)
        }
    }

    onUpdateSort = (sort) => {
        this.setState(() => ({sort:sort}))
    }
    
    render() {
        const { posts } = this.props
        const { sort } = this.state
        let postsSorted

        return(
            <div>
                <SortPosts 
                    onUpdateSort = {this.onUpdateSort}
                />
                <AddButton />
                { posts && posts.length > 0 ? 
                    (
                        (sort !== 'none') ? postsSorted = posts.sort(sortBy(sort)) : postsSorted = posts,
                        postsSorted.map( post => (
                            <div key={post.id}>
                                <ThumbPost 
                                    id = {post.id}
                                    title = {post.title}
                                    timestamp = {post.timestamp}
                                    author = {post.author}
                                    commentCount = {post.commentCount}
                                    voteScore = {post.voteScore}
                                    comments = {post.comments}
                                />
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>Não há posts a ser exibido nesta categoria.</h3>
                        </div>
                    )
                }
            </div>
        )
    }

}

const mapStateToProps = ({ posts }) => ({
        posts
})

export default connect(mapStateToProps, actions)(CategoriesList)