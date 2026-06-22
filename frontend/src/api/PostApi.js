// axios는 FastAPI 서버에 HTTP 요청을 보내는 도구
import axios from 'axios'

// FastAPI 서버의 기본 주소
const BASE_URL = 'http://127.0.0.1:8000'

// 게시글 목록을 요청하는 함수
export const getPosts = (search = '', tag = '') => {
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set('search', search.trim())
    }
    if (tag.trim()) {
        params.set('tag', tag.trim())
    }
    const queryString = params.toString()
    return axios.get(
        `${BASE_URL}/posts${queryString ? `?${queryString}` : ''}`
    )
}

// 게시글 상세 정보를 요청하는 함수
export const getPost = (postId) => {
    return axios.get(`${BASE_URL}/posts/${postId}`)
}

// 새 게시글을 FastAPI에 저장하는 함수
export const createPost = (postData) => {
    return axios.post(
        `${BASE_URL}/posts`,
        postData
    )
}

// 특정 게시글을 수정하는 함수
export const updatePost = (postId, postData) => {
    return axios.put(
        `${BASE_URL}/posts/${postId}`,
        postData
    )
}
// 특정 게시글을 삭제하는 함수
export const deletePost = (postId) => {
    return axios.delete(
        `${BASE_URL}/posts/${postId}`
    )
}