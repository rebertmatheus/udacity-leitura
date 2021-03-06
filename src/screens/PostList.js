import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import ThumbPost from '../components/ThumbPost'
import AddButton from '../components/AddButton'
import SortPosts from '../components/SortPosts'
import sortBy from 'sort-by'

class PostList extends Component {

    state = {
        sort:'none'
    }

    componentDidMount() {
        this.props.fetchAllPosts()
    }

    onUpdateSort = (sort) => {
        this.setState(() => ({sort}))
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
                {posts && posts.length > 0 ? 
                    (
                        (sort !== 'none') ? postsSorted = posts.sort(sortBy(sort)) : postsSorted = posts,
                        postsSorted.map( post => (
                            <div key={post.id}>
                                <ThumbPost 
                                    id            = { post.id }
                                    title         = { post.title }
                                    timestamp     = { post.timestamp }
                                    author        = { post.author }
                                    commentCount  = { post.commentCount }
                                    voteScore     = { post.voteScore }
                                    comments      = { post.comments }
                                    category      = { post.category }
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

export default connect(mapStateToProps, actions)(PostList)