//根级别mutations state getters
export const state={
    // 4.初始值
    //存储在 sessionStorage 里面的数据在页面会话结束时会被清除。
    //sessionStorage.getItem从 sessionStorage 获取数据
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const mutations={
    changeUserInfo(state,obj){
        // vuex和本地存储同步
        state.userInfo=obj
        if(obj.token){
            //sessionStorage.setItem 保存数据到 sessionStorage
            sessionStorage.setItem("userInfo",JSON.stringify(obj))
        }else{
            //sessionStorage.removeItem从 sessionStorage 删除保存的数据
            sessionStorage.removeItem("userInfo")
        }
        
    }
}
export const getters={
    userInfo(state){
        return state.userInfo
    }
}