import ajax from './ajax'
import {HOST} from '../common/js/config'

//http://localhost:8080/api/star/1/1
//获取点赞
export const starById = (articleId,userId) => ajax(HOST+`/api/star/${articleId}/${userId}`)

//http://localhost:8080/api/star/1/1?starInfo=2
//点赞
export const starForId = (articleId,userId,starInfo) => ajax(HOST+`/api/star/${articleId}/${userId}?starInfo=${starInfo}`,null,'POST')
