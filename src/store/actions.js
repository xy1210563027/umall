//根级别actions
export default {
    changeUser(context,obj){
        context.commit("changeUserInfo",obj)
    }
}