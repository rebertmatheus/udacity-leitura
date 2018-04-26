import {
    GET_ALLPOSTS, GET_ALLCATEGORIES, GET_CATEGORYPOSTS,
    DELETE_POST, VOTE, VOTE_COMMENT, ADD_POST, EDIT_POST, GET_POST,
    ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_COMMENT
} from '../../utils/constants'

function posts(state = {}, action) {
    switch (action.type) {
        case GET_ALLPOSTS:
            return {
                ...state,
                posts: action.posts
            }
        
        case ADD_POST:
            return { 
                ...state, 
                ...action.post 
            }

        case EDIT_POST:
            return { 
                ...state,
                ...action.post
            }

        case GET_POST:
            return {
                ...state,
                post: action.post
            }

        case DELETE_POST:
            const deletedPosts = state.posts.filter( item =>  item.id !== action.post.id )
            return {
                ...state,
                posts: deletedPosts
            }

        case GET_ALLCATEGORIES:
            return {
                ...state,
                categories: action.categories
            }

        case GET_CATEGORYPOSTS:
            return {
                ...state,
                posts: action.posts
            }

        case VOTE:
            const updatedPosts = state.posts.map(item => {
                if (item.id === action.post.id) {
                    item.voteScore = action.post.voteScore;
                }
                return item
            })
            return {
                ...state,
                posts: updatedPosts
            }

        case VOTE_COMMENT:
            const updatedComment = state.posts.map(post => {
                post.comments.map(comment => {
                    if (comment.id === action.comment.id) {
                        comment.voteScore = action.comment.voteScore
                    }
                    return comment
                })
                return post
            })
            return {
                ...state,
                posts: updatedComment
            }

        case DELETE_COMMENT:
            const arrPosts = (
                state.posts.map(post => {
                    let arrcomments = post.comments.filter(p => p.id !== action.comment.id)
                    post.comments = arrcomments
                    return post
                })
            )
            return {
                ...state,
                posts: arrPosts
            }
            
        case ADD_COMMENT:
            const addComment = state.posts.map(post => {
                if (post.id === action.comment.parentId) {
                    post.comments.push(action.comment)
                }
                return post
            })
            return {
                ...state,
                posts: addComment
            }
        
        case EDIT_COMMENT:
            return {
                ...state,
                ...action.comment 
            }
        
        case GET_COMMENT:
            return {
                ...state,
                comments: action.comments
            }

        default: return state
    }
}

export default posts