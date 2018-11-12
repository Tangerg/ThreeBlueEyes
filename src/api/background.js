import ajax from './ajax'
import {HOST} from '../common/js/config'
//获取必应壁纸
export const getBingPic= () => ajax(`https://api.lylares.com/bing/?AppKey=aHR0cHM6Ly93d3cubHlsYXJlcy5jb20v`)

//获取首页推荐
export const getRecommend= () => ajax(HOST+`/api/index`)



