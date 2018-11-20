import ajax from './ajax'
import {HOST1} from '../common/js/config'

//获取默认歌手
export const getSinger = (cat) => ajax(HOST1 + `/artist/list?cat=${cat}`)

//根据歌手姓名首字母获取歌手
export const getSingerByName = (cat, name) => ajax(HOST1 + `/artist/list?cat=${cat}&initial=${name}`)



