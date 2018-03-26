import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../redux/actions";

class PostList extends Component {

    componentDidMount() {
        this.props.fetchAllPosts()
    }
    
    render() {
        const { posts } = this.props

        return(
            <div>
                <h3>Category: </h3>
                {posts && posts.length > 0 ? 
                    (
                        posts.map( post => (
                            <div key={post.id}>
                                <p>{post.title}</p>
                            </div>
                            
                        ))
                    ) : (
                        <div>
                            <h3>Não há posts a ser exibido nesta categoria.</h3>
                        </div>
                    )
                }
                {/* {posts.map((post) => {
                    <div key={post.id}>
                        <p>
                            {post.title}
                        </p>
                    </div>
                })
                } */}
            </div>
        )
    }

}

const mapStateToProps = ({ posts }) => ({
        posts
})

export default connect(mapStateToProps, actions)(PostList)