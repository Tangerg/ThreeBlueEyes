import ajax from './ajax'
import {HOST} from '../common/js/config'

//网站留言
export const feedBack = (feedback) => ajax(HOST + `/api/feedback`, feedback, 'POST')

//文章评论
export const submitComment = (id, comment) => ajax(HOST + `/api/comment/${id}`, comment, 'POST')

export const getComment = (id) => ajax(HOST + `/api/comment/${id}`)
