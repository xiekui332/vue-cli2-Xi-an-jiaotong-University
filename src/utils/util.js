export const getUrlParams = (url) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
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