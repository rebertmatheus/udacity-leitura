const server = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchAllPosts = () =>
  fetch(`${server}/posts`, { headers }).then(res => res.json())

export const fetchPostDelete = idPost => 
  fetch(`${server}/posts/${idPost}`, { method: "DELETE", headers }).then(res => res.json())

export const addPost = post =>
  fetch(`${server}/posts`, {
    method: "POST", headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(data => data.json())

export const addComment = comment => { 
    return fetch(`${server}/comments/`, { 
      method: "POST", headers : {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(data => data.json())
}

export const editPost = (post, postId) => {
  return fetch(`${server}/posts/${postId}`, {
    method: "PUT", headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(data => data.json())
}

export const getPost = postId =>
  fetch(`${server}/posts/${postId}`, { headers }).then(res => res.json())
  
export const fetchGetComments = post =>
  fetch(`${server}/posts/${post}/comments`, { headers }).then(res => res.json().then(data => data))

export const getComment = (commentId) => {
  return fetch(`${server}/comments/${commentId}`, { headers }).then(res => res.json().then(data => data))
}
export const fetchAllCategories = () =>
  fetch(`${server}/categories`, { headers }).then(res => res.json().then(data => data.categories))

export const fetchCategoriesPost = categ =>
  fetch(`${server}/${categ}/posts`, { headers }).then(res => res.json())

export const fetchPostVote = (idPost, option) =>
  fetch(`${server}/posts/${idPost}`, {
    method: `POST`, headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const fetchCommentVote = (idComment, option) => {
  return fetch(`${server}/comments/${idComment}`, {
    method: "POST", headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(data => data.json())
}

export const deleteComment = commentId => {
  return fetch(`${server}/comments/${commentId}`, {
    method: "DELETE",
    headers
  }).then(response => response.json())
}

export const editComment = (comment, commentId) => {
  return fetch(`${server}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(data => data.json())
}