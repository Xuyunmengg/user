import axios from 'axios'

function checkStatus (response) {
  if (response.status === 200) {
    return response
  } else {
    console.log(response)
  }
}
// 共通请求头部
// function requestHeader (opt) {
//   let myHeaders = opt.headers;
//   if (!myHeaders) {
//     myHeaders = {};
//      myHeaders['Content-Type'] = "application/json;charset=utf-8";
//   }
//   return myHeaders
// }

export function request (options) {
  return axios({
    method: options.method,
    url: options.url ? options.url : undefined,
    data: options.data,
    params:options.params,
    headers: requestHeader(options),
    withCredentials:true,
  })
    .then(checkStatus)
    .then(res => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: true}
      } else {
        if(res.status === 200){
          return res.data //这个返回需要看您们后端返回的是什么参数，可能会需要调
        }else if(res.status === 401){

        }else if(res.status === 500){
          console("服务器出错，请稍后重试");
        }else{
          //这个返回需要看您们后端返回的是什么参数，可能会需要调
          if(res && res.data && res.data.msg){
            return res.data.msg
          }
        }
      }
    })

    .catch(function (err){
      if(err && err.response){
        console.log("服务器出错，请稍后重试")
      }
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: false}
      } else {}
    })
}

