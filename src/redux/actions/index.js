import { GET_ALLPOSTS } from '../../utils/constants'
import * as api from '../../utils/api'


export const getAllPosts = posts => ({
        type: GET_ALLPOSTS,
        posts
})

export const fetchAllPosts = () => dispatch => api.fetchAllPosts()
    .then( posts => Promise.all(
        posts.map( post => 
            api.getComments(post.id)
                .then( comments => (post.comments = comments))
                .then(() => post)
            )
        )
    )
    .then( posts => dispatch(getAllPosts(posts)))