import axios from "axios"
import qs from "qs"
import { errorAlert } from "./alert"
import store from "../store"
import router from "../router"
import Vue from "vue"
//开发环境使用 8080
let baseUrl = "/aa"
Vue.prototype.$imgPre="http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""


//响应拦截
axios.interceptors.response.use(res=>{
    console.log("本次请求地址是："+res.config.url);
    console.log(res);
    if(res.data.code!==200){
        errorAlert(res.data.msg)
    }
    return res
})

// ===========菜单接口 开始====================

//13.添加
export const reqMenuAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(form)
    })
}

//18.列表交互
export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}

// 29.删除
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// 35.获取一条数据
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//38.修改
export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}
// ===========菜单接口 结束====================

// ===========角色接口 开始====================
// 8.添加
export const reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })
}

// 18.列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get"
    })
}
//26.删除
export const reqUserDell= (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}



// 33.详情
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 38.修改
export const reqUserUpdates = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===========角色接口 结束====================

// ===========管理员接口 开始====================

// 8.添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqUserList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

// 33.详情
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 38.修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}
// 52 总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
        
    })
}
// ===========管理员接口 结束====================

// 1.登录
export const reqLogin =(user)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(user)
    })
}
// ===========分类接口 开始====================

// 8.添加 文件
export const reqcateAdd = (cate) => {
    // cate={name:12,img:File,age:20}

    let d=new FormData()
    /*
    d.append("name",12)
    d.append("img",file)
    d.append("age",20)
    */

    for(let i in cate){
        d.append(i,cate[i])
    }

    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data:d
    })
}

//18.列表 p={istree:true}  p={pid:1}
export const reqcateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqcateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqcateDetail = id => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqcateUpdate = (cate) => {
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}

// ===========分类接口 结束====================
// ===========规格接口 开始====================

// 8.添加 文件
export const reqspecsAdd = (user) => {
 
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqspecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 38.修改 文件
export const reqspecsUpdate = (user) => {
   
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
export const reqspecsCount = () => {
   
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// ===========规格接口 结束====================

// ===========商品管理接口 开始====================
// 添加文件
export const reqgoodsAdd=(user)=>{
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:d
    })
}

// 列表 p={page:1,size:10}
export const reqgoodsList=(p)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:p
    })
}

// 删除
export const reqgoodsDel=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringifl({
            id:id
        })
    })
}

// 详情
export const reqgoodsDetail=id=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
// 修改 文件
export const reqgoodsUpdate = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
// export const reqgoodsCount = () => {
   
//     return axios({
//         url: baseUrl + "/api/goodscount",
//         method: "get",
//     })
// }
// ===========商品管理接口 结束====================
// ===========会员接口 开始====================
    // 会员列表
 export const reqViplist = () =>{
    return axios({
        url:baseUrl+"//api/memberlist",
        method:"get",
    })
 }
//  .会员获取（一条）
export const reqMenuInfo=(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}
// 38.会员修改
export const reqEdit = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}

export const reqgoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}
// ===========会员接口 结束====================


// ===========秒杀接口 开始====================

//13.添加
export const reqSeckadd=(form)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(form)
    })
}

//18.列表交互
export const reqSeckList=()=>{
    return axios({
        url:baseUrl+"/api/secklist",
        method:"get",
        params:{
            istree:true
        }
    })
}

// 29.删除
export const reqSeckdelete=(id)=>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// 35.获取一条数据
export const reqSeckinfo=(id)=>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//38.修改
export const reqSeckedit=(form)=>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(form)
    })
}
// ===========秒杀接口 结束====================