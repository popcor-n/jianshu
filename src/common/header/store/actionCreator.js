import *as constants from './constants'
import axios from 'axios'
export const FocusIp = () => ({
    type:constants.FOCUS_IP
})
export const BlurIp = () => ({
    type:constants.BLUR_IP
})
// export const getHotList = () => {
//     return (dispatch) => {
//             axios.get('http://localhost:3000/api/headList.json').then((data) => {
//                 dispatch({
//                     type:constants.CHANGE_LIST,
//                     value:data.data.data,
//                     length:data.data.data.length
//                 })
//             }).catch((error) => {
//                 throw(error);
//             })
//     }
// }
export const ChangeShow = () => ({
    type:constants.CHANGE_SHOW
})
export const mouseIn  = () => ({
    type:constants.MOUSE_IN
})
export const mouseOut  = () => ({
    type:constants.MOUSE_OUT
})
export const setContent = (data) =>({
    type: constants.SET_CONTENT,
    data
})
// export const search = (data) => {
//     return (dispatch) => {
//         axios.get(`http://47.94.91.9:8080/article/searchbytitle?pagenum=1&pagesize=3&title=${data}`).then((res) => {
//             console.log(res)
//         })
//     }
// }