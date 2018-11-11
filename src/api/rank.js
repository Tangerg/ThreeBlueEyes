import ajax from './ajax'
import {HOST1} from '../common/js/config'


//获取排行
export const getRankList= (id) => ajax(HOST1+`/top/list?idx=${id}`)
