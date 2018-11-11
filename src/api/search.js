import ajax from './ajax'
import {HOST1} from '../common/js/config'

//获取热搜
export const getHotKey = (cat) => ajax(HOST1+`/search/hot`)

//关键字搜索
export const getSearchSuggest = (keywords) => ajax(HOST1+`/search?keywords=${keywords}`)

//搜索歌手
export const getSearchSinger = (keywords) => ajax(HOST1+`/search?keywords=${keywords}&type=100`)

//搜索歌单
export const getSearchList = (keywords) => ajax(HOST1+`/search?keywords=${keywords}&type=1000`)

//分页
export const getSearchSongs = (keywords, page) => ajax(HOST1+`/search?keywords=${keywords}&offset=${page}`)

//歌曲详情
export const getSongDetail = (id) => ajax(HOST1+`/song/detail?ids=${id}`)
