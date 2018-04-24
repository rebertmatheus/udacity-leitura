import React, { Component } from 'react'
import CommentsList from './CommentsList'
import AddComments from '../components/AddComents'
import { timeToString } from '../utils/utils'
import { Link } from 'react-router-dom'
import { MdCancel, MdThumbUp, MdThumbDown } from 'react-icons/lib/md'
import * as actions from '../redux/actions'
import { connect } from 'react-redux'

import '../css/ThumbPost.css'

class ThumbPost extends Component {

    onVote = (idPost, opt) => {
        this.props.fetchPostVote(idPost, opt)
    }

    onDeletePost = (idPost) => {
        this.props.fetchPostDelete(idPost)
    }

    onCommentVote = (idComment, opt) => {
        this.props.fetchCommentVote(idComment, opt)
    }

    onDeleteComment = commentId => {
        this.props.fetchDeleteComment(commentId)
    }

    render() {
        
        const { id, title, timestamp, author, commentCount, voteScore, comments, category } = this.props

        return(
            <div key= {id} className="CardContent CardShadow">
                <div className="DivTitulo">
                    <p className="DivTitulo titulo"><Link to={`/${category}/${id}`}>{title}</Link><span className="CommentsTime"> &nbsp; ({timeToString(timestamp)})</span><MdCancel className="MdThumb Cancel" onClick={() => this.onDeletePost(id)} /></p>
                    <p className="DivTitulo author">by: {author}</p>
                </div>
                <div className="DivFooter">
                    <div className="DivFooter content">{commentCount} comments - Score: <MdThumbUp className="MdThumb Up" onClick={() => this.onVote(id, "upVote")} /> {voteScore} <MdThumbDown className="MdThumb Down" onClick={() => this.onVote(id, "downVote")} /> </div>
                </div>
                <div className="DivComments">
                    <h4>Comments:</h4>
                    {comments && comments.length > 0 ?
                        (
                            comments.map(comment => (
                                <div key={ comment.id }>
                                    <CommentsList
                                        id = { comment.id }
                                        author = { comment.author }
                                        body = { comment.body }
                                        voteScore = { comment.voteScore }
                                        timestamp = { comment.timestamp }
                                        parentId = { id }
                                        onCommentVote = { this.onCommentVote }
                                        onDeleteComment = { this.onDeleteComment }
                                    />
                                </div>
                            ))
                        ) : (
                            <div>
                            </div>
                        )
                    }
                    <AddComments
                        parentId={id} 
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})

export default connect(mapStateToProps, actions)(ThumbPost)