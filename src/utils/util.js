export const getUrlParams = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象 
    if(window.location.href.split("?")[1]){
        let r=window.location.href.split("?")[1].match(reg);//匹配目标参数
        if (r != null) return decodeURI(r[2]);
    }
    return null; //返回参数值 
}

export const setSession = (item, val) => {
    sessionStorage.setItem(item, val)
}

export const getSession = (item) => {
    return sessionStorage.getItem(item)
}

export const clearSession = () => {
    sessionStorage.clear()
}


export const splitUrl = (name) => {
    let r=window.location.href
    let pos=r.indexOf("?");//匹配目标参数
    if(r.substr(pos) != null) return r.substr(pos)
    return null; //返回参数值 
}

export const format = (num) => {
    let str = num+'';
    return str.split("").reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev;
    })
}


export const regexFile = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG|PDF|pdf)$/



export const baseUrl = process.env.NODE_ENV == "development"?"http://192.168.31.173:8081":"http://10.49.7.111"



export const uploadUrl = baseUrl + '/api/system/project/uploadTemplate' //上传模板地址

export const uploadUrl1 = baseUrl + '/api/project/uploadNodeAppendixLxsq' //上传资料附件和其他资料

export const nodeUploadUrl = baseUrl + '/api/system/project/uploadAppdenix'  //上传节点附件

// test download
export const file_download = "http://timesheet.pactera.com/Log/Unlockapplicationform.xlsx" 

export const img_download = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2943410095,2495017621&fm=11&gp=0.jpg" 

export const pdf_download = "http://ms.ga.tj.gov.cn/fjsmswap/img/show.pdf" 
