import {
    GET_ALLPOSTS, GET_ALLCATEGORIES, GET_CATEGORYPOSTS,
    VOTE, VOTE_COMMENT, DELETE_POST, ADD_POST, EDIT_POST, GET_POST,
    ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_COMMENT
} from '../../utils/constants'
import * as api from '../../utils/api'

export const getAllPosts = posts => ({
    type: GET_ALLPOSTS,
    posts
})

export const addPost = post => ({
    type: ADD_POST,
    post
})

export const editPost = (post, postId) => ({
    type: EDIT_POST,
    post,
    postId
})

export const postDelete = post => ({
    type: DELETE_POST,
    post
})

export const getPost = post => ({
    type: GET_POST,
    post
})

export const getAllCategories = categories => ({
    type: GET_ALLCATEGORIES,
    categories
})

export const getCategoryPosts = posts => ({
    type: GET_CATEGORYPOSTS,
    posts
})

export const postVote = post => ({
    type: VOTE,
    post
})

export const commentVote = comment => ({
    type: VOTE_COMMENT,
    comment
})

export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})

export const editComment = (comment, commentId) => ({
    type: EDIT_COMMENT,
    comment,
    commentId
})

export const deleteComment = comment => ({
    type: DELETE_COMMENT,
    comment
})

export const receiveComment = comments => ({
    type: GET_COMMENT,
    comments
})
  

export const fetchAllPosts = () => dispatch => api.fetchAllPosts()
    .then(posts => Promise.all(
        posts.map(post =>
            api.fetchGetComments(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
    )
    )
    .then(posts => dispatch(getAllPosts(posts)))

export const fetchAddPost = post => dispatch =>
    api.addPost(post).then(post => dispatch(addPost(post)))

export const fetchEditPost = (post, postId) => dispatch =>
    api.editPost(post, postId).then(post => dispatch(editPost(post)))

export const fetchPost = postId => dispatch =>
    api.getPost(postId).then(post => dispatch(getPost(post)))

export const fetchAllCategories = () => dispatch => api.fetchAllCategories()
    .then(categories => dispatch(getAllCategories(categories)))

export const fetchCategoriesPost = category => dispatch => api.fetchCategoriesPost(category)
    .then(posts => Promise.all(
        posts.map(post =>
            api.fetchGetComments(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
    ))
    .then(posts => dispatch(getCategoryPosts(posts)))

export const fetchPostVote = (idPost, opt) => dispatch =>
    api.fetchPostVote(idPost, opt).then(post => dispatch(postVote(post)))

export const fetchCommentVote = (idComment, option) => dispatch =>
    api.fetchCommentVote(idComment, option).then(comment => dispatch(commentVote(comment)))

export const fetchPostDelete = idPost => dispatch =>
    api.fetchPostDelete(idPost).then(post => dispatch(postDelete(post)))

export const fetchAddComment = comment => dispatch =>
    api.addComment(comment).then(comment => dispatch(addComment(comment)))

export const fetchDeleteComment = commentId => dispatch =>
    api.deleteComment(commentId).then(comment => dispatch(deleteComment(comment)))
  
export const fetchEditComment = (comment, commentId) => dispatch =>
    api.editComment(comment, commentId).then(comment => dispatch(editComment(comment)))
    
export const fetchComment = commentId => dispatch =>
    api.getComment(commentId).then(comments => {
        dispatch(receiveComment(comments))
    })
  