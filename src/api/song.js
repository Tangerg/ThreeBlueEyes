import ajax from './ajax'
import {HOST1} from '../common/js/config'


export const getPlaySong = (id) => ajax(HOST1 + `/music/url?id=${id}`)

//由歌手得到歌曲
export const getSongBySinger = (id) => ajax(HOST1 + `/artists?id=${id}`)

export const getSongLyric = (id) => ajax(HOST1 + `/lyric?id=${id}`)
