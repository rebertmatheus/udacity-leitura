import React, { Component } from 'react'
import CommentsList from '../components/CommentsList'
import AddComments from '../components/AddComents'
import { timeToString } from '../utils/utils'
import { MdCancel, MdThumbUp, MdThumbDown, MdEdit } from 'react-icons/lib/md'
import * as actions from '../redux/actions'
import { connect } from 'react-redux'

import '../css/PostDetail.css'

class Post extends Component {

  onVote = (idPost, opt) => {
    this.props.fetchPostVote(idPost, opt)
  }

  onCommentVote = (idComment, opt) => {
      this.props.fetchCommentVote(idComment, opt)
  }

  onDeleteComment = commentId => {
    this.props.fetchDeleteComment(commentId)
  }

  onDeletePost = (idPost) => {
    this.props.fetchPostDelete(idPost)
  }

  render() {

    const _id = this.props.match.params.id
    let _post = this.props.posts.filter((p) => (p.id === _id))
    
    return (
      <div>
        {

          _post && _post.length > 0 ? 
          (
            _post.map( p => (
              <div key= {p.id} className="DetailContent DetailShadow">
                <div className="DetailDivTitulo">
                  <p className="DetailDivTitulo titulo">{p.title}</p>
                  <p className="DetailDivTitulo author">by: {p.author} <span className="DetailCommentsTime">({timeToString(p.timestamp)})</span></p>
                </div>
                <div>
                  <p className="DetailDivTitulo body">{p.body}</p>
                </div>
                <div className="DetailDivTitulo Edit">
                  <MdEdit className="DetailMdThumb Edit" onClick={() => this.props.history.push(`/EditPost/${p.id}`)} />
                  <MdCancel className="DetailMdThumb Cancel" onClick={() => this.onDeletePost(p.id)} />
                </div>
                <div className="DetailDivFooter">
                    <div className="DetailDivFooter content">{p.commentCount} comments - Score: <MdThumbUp className="DetailMdThumb Up" onClick={() => this.onVote(p.id, "upVote")} /> {p.voteScore} <MdThumbDown className="DetailMdThumb Down" onClick={() => this.onVote(p.id, "downVote")} /> </div>
                </div>
                <div className="DetailDivComments">
                  <h4>Comments:</h4>
                  {p.comments && p.comments.length > 0 ?
                    (
                      p.comments.map(comment => (
                        <div key={comment.id}>
                          <CommentsList
                            id = {comment.id}
                            author = {comment.author}
                            body = {comment.body}
                            voteScore = {comment.voteScore}
                            timestamp = {comment.timestamp}
                            onCommentVote = {this.onCommentVote}
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
                  parentId = { p.id }
                  />
                </div>
              </div>
            ))
          ) : (
            <div>
              <h3>Não há posts a ser exibido</h3>
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

export default connect(mapStateToProps, actions)(Post)