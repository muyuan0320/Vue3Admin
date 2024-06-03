//该文件定义了一系列表单验证规则
export const passwordRules=(rule:any, value:string, callback:any)=>{
    const passwordReg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%\.^&+=!])[A-Za-z\d.@$!%*?&]{8,}$/
    if (!passwordReg.test(value)){

        callback(new Error('密码必须包含大小写字母、数字和特殊字符，长度在8-20之间'))
    }else{
        callback()
    }
}
export const emailRules=(rule:any, value:string, callback:any)=>{
    const emailReg= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!emailReg.test(value)){
        callback(new Error('请输入正确的邮箱'))
    }else{
        callback()
    }
}
export const phoneRules=(rule:any, value:string, callback:any)=>{
    const phoneReg= /^1[3-9]\d{9}$/
    if (!phoneReg.test(value)){
        callback(new Error('请输入正确的手机号'))
    }else{
        callback()
    }
}