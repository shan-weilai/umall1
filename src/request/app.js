import {get,post} from "./http";

// 菜单模块
// 添加
export const reqMenuadd = (params)=>post("/api/menuadd",params)

// 修改
export const reqMenuedit = (params)=>post("/api/menuedit",params)

// 删除
export const reqMenudelete = (params)=>post("/api/menudelete",params)

// 列表
export const reqMenulist = (params)=>get("/api/menulist",params)

// 查询1条
export const reqMenuinfo = (params)=>get('/api/menuinfo',params)



//角色模块
//角色添加
export const  reqRoleadd = (params)=>post('/api/roleadd',params)

//角色列表
export const reqRolelist = ()=>get('/api/rolelist')

//获取一条角色内容
export const reqRoleinfo = (params)=>get('/api/roleinfo',params)

//角色修改
export const reqRoleedit = (params)=>post('/api/roleedit',params)

//角色删除
export const reqRoledelete = (params)=>post('/api/roledelete',params)


//管理员模块
//管理员添加
export const reqManageadd = (params)=>post('/api/useradd',params)

//管理员总数
export const reqManagecount = ()=>get('/api/usercount')

//管理员列表
export const reqManagelist = (params) => get('/api/userlist',params)

//管理员获取
export const reqManageinfo = (params) =>get('/api/userinfo',params)

//管理员修改
export const reqManagedit = (params) =>post('/api/useredit',params)

//管理员删除
export const reqManageDelete = (params) => post('/api/userdelete',params)

//管理员登录
export const reqManagelogin =(params)=>post('/api/userlogin',params)



//商品分类
//分类添加
export const reqCateadd = (params)=>post('/api/cateadd',params,true)
//分类列表
export const reqCatelist = (params)=>get('/api/catelist',params)
//分类获取
export const reqCateinfo = (params)=>get('/api/cateinfo',params)
//分类修改
export const reqCatedit = (params)=>post('/api/cateedit',params,true) 
//分类删除
export const reqCatedelete = (params)=>post('/api/catedelete',params)


//商品规格管理
//规格添加
export const reqSpecsadd = (params)=>post('/api/specsadd',params)
//规格总数
export const reqSpecscount = ()=>get('/api/specscount')
//规格列表
export const reqSpecslist =(params)=>get('/api/specslist',params)
//规格获取
export const reqSpecsinfo = (params)=>get('/api/specsinfo',params)
//规格修改
export const reqSpecsedit = (params)=>post('/api/specsedit',params)
//商品规格删除
export const reqSpecsdelete = (params)=>post('/api/specsdelete',params)
