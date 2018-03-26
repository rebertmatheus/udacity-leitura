const server = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)

const headers = {
    'Accept' : 'application/json',
    'Authorization': token
}

export const fetchAllPosts = () =>
  fetch(`${server}/posts`, { headers })
    .then(res => res.json())

export const getComments = post =>
  fetch(`${server}/posts/${post}/comments`, { headers })
  .then(res => res.json().then(data => data))