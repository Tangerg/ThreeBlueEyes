import ajax from './ajax'
import {HOST} from '../common/js/config'

//获取必应壁纸
export const getBingPic= (id) => ajax(HOST+`/api/index`)

//获取首页推荐
export const getRecommend= () => ajax(HOST+`/api/index`)


