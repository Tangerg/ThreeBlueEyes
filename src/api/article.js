import ajax from './ajax'
import {HOST} from '../common/js/config'

//所有的分类
export const getCategory = () => ajax(HOST + `/api/category`)

//http://localhost:8080/api/category/recommend/1?pageNum=1&pageSize=2
export const getRecArticleByCategoryId = (id, pageNum, pageSize) => ajax(HOST + `/api/category/recommend/${id}?pageNum=${pageNum}&pageSize=${pageSize}`)

export const getHotArticleByCategoryId = (id, pageNum, pageSize) => ajax(HOST + `/api/category/hot/${id}?pageNum=${pageNum}&pageSize=${pageSize}`)

export const getLateArticleByCategoryId = (id, pageNum, pageSize) => ajax(HOST + `/api/category/lately/${id}?pageNum=${pageNum}&pageSize=${pageSize}`)
//http://localhost:8080/api/article/4
export const getArticleById = (id) => ajax(HOST + `/api/article/${id}`)
