import ajax from './ajax'
import {HOST1} from '../common/js/config'

//获取轮播图
export const getBanner = () => ajax(HOST1 + `/banner`)

//获取推荐歌单
export const getRecommendList = () => ajax(HOST1 + `/personalized`)

//获取推荐歌曲
export const getRecommendSong = () => ajax(HOST1 + `/personalized/newsong`)
