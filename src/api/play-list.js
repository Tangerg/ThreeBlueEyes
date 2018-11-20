import ajax from './ajax'
import {HOST1} from '../common/js/config'


//获取音乐列表
export const getPlayList = (id) => ajax(HOST1 + `/playlist/detail?id=${id}`)
