import React from 'react'
import { timeToString } from '../utils/utils'
import { Link } from 'react-router-dom'
import { MdThumbUp, MdThumbDown, MdCancel, MdEdit } from 'react-icons/lib/md'

import '../css/Comments.css'

const CommentsList = props => {
    const {id, author, body, voteScore, timestamp, onCommentVote, onDeleteComment }  = props

    return (
        <div className="CommentsTitulo">
            <div>
                <span className="CommentsAuthor">{author} </span>
                <span className="CommentsTime"> &nbsp; ({timeToString(timestamp)})</span>
                <span><Link to={`/EditComments/${id}`}><MdEdit className="MdThumb Up"/></Link></span>
                <span><MdCancel className="MdThumb Up" onClick={() => onDeleteComment(id)} /></span>
            </div>
            <div>
                <span className="CommentsBody">{body}</span>
                <p> <MdThumbUp className="MdThumb Up" onClick={() => onCommentVote(id, "upVote")} /> {voteScore}  <MdThumbDown className="MdThumb Down" onClick={() => onCommentVote(id, "downVote")} /> </p>
            </div>
            <hr/>
        </div>
    )
}
export default CommentsList