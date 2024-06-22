const mysql =require('mysql2')
const config =require('config')



const createPool = ()  => {
    return mysql.createPool(config.get('dbConfig'))
}

const pool=createPool()

const select= async (columnName,tableName,where='',order='')=>{
   try{ return new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
        if (err) reject(err)
        else {
            connection.query(`select ${columnName} from ${tableName} ${where===''?'':'where '+ where} ${order===''?'':'order by '+ order}`,(err,results)=>{
                connection.release()//释放连接
                if (err) reject(err)
                else resolve ({results})

            })
        }
    }
    )
})}
    catch(err){
        console.log(err)
   throw err
   }
}
const insertData = async (table, data) => {
    try {
        const connection = await pool.promise().getConnection(); // 使用await获取连接
        const [result] = await connection.query(`INSERT INTO ${table} SET ?`, data);
        console.log(`成功插入，受影响的行数: ${result.affectedRows}`);
        connection.release(); // 成功后释放连接
        return result;
    } catch (error) {
        console.error('插入数据时出错:', error);
        throw error; // 重新抛出错误，以便外部调用者可以处理
    }
};
const deleteData = async (table, where) => {
    try{
       const connection = await pool.promise().getConnection();
       const [result] = await connection.query(`DELETE FROM ${table} WHERE `+where);
       console.log(`成功删除，受影响的行数: ${result.affectedRows}`);
       connection.release();
       return result;
        }
        catch(err){
            console.log(err)
            throw err
        }

};
const updateData = async (table, data, where) => {
    try{
       const connection = await pool.promise().getConnection();
       const [result] = await connection.query(`UPDATE ${table} SET ? WHERE `+where, [data]);
       console.log(`成功更新，受影响的行数: ${result.affectedRows}`);
       connection.release();
       return result;
        }
        catch(err){
            console.log(err)
            throw err
        }

};


const selectUserAll= async ()=>{
    try{

      return ( await select('*','user','','username '))}
    catch (err){
        console.log(err)
        throw  err
    }

}
const selectUser = (username) => {
    return new Promise((resolve, reject) => {
        select('*', 'user', `username='${username}'`)
            .then((res) => {
                resolve(res.results[0]); // 当查询成功时，通过resolve传递结果
            })
            .catch((error) => {
                reject(error); // 如果查询出错，通过reject传递错误
            });
    });
};
const regist=(data)=>{
 return    insertData('user',data)
}
const findPasswordByUsername= async (data)=>{

const password = await  select('password','user',` username = '${data.username}'`)
if (password.results[0]?.password)
    return password.results[0].password
    else return false
}
const userExist= async (data)=>{
    const user = await select('*', 'user', `username = '${data}'`)
    return !user.results[0];
}
const findPermissionByUsername= async (data)=>{
  const groupId =await select('permissionGroupId', 'user', `username = '${data}'`)
 const permission= await select('permission', 'permissiongroup', ` permissionGroupId = '${groupId.results[0].permissionGroupId}'`)
    return permission.results[0].permission
}

module.exports = {
    select,
    findPasswordByUsername,
    regist,
    insertData,
    selectUser,
    selectUserAll,
    findPermissionByUsername,
    userExist,
    updateData,
    deleteData
}

