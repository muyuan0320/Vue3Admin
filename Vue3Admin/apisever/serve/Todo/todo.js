const mysql=require('../../utils/mysql')
const nanoid = require('nanoid')
const bcrypt = require('bcrypt')

const insertTodo= async (data)=>{
    const todoData={
        Uid:data.Uid,
        todo:data.todo,
        createTime:new Date().toLocaleString()
    }
  try{ await mysql.insertData('Todo',todoData)}
    catch (err) {
        new Error(err)
        return false;
    }
    return true
}
const getTodo =async (data) =>{
    console.log(data)
    try {
        return await mysql.select('*', 'Todo', `Uid='${data}'`,'CreateTime desc')
    }
    catch (err) {
        console.log(err)
        new Error(err)
    }

}
module.exports={
    insertTodo,
    getTodo
}