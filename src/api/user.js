import ajax from './ajax'
import {HOST} from '../common/js/config'

//登陆
export const login = (user) => ajax(HOST + `/api/login`, user, 'POST')

//注册
export const sign = (user) => ajax(HOST + `/api/sign`, user, 'POST')
