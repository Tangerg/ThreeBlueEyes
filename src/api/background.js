import ajax from './ajax'
import axios from 'axios'
import {HOST} from '../common/js/config'
//获取必应壁纸
export const getBingPic = () => ajax(`http://www.daiwei.org/vue/server/home.php?inAjax=1&do=getImageByBingJson`)

//获取首页推荐
export const getRecommend = () => ajax(HOST + `/api/index`)



