import { GET_ALLPOSTS } from '../../utils/constants'

function posts ( state = {}, action ) {
    switch( action.type ) {
        case GET_ALLPOSTS:
        return {
            ...state,
            posts: action.posts
        }
        default:
            return state
    }
}

export default posts