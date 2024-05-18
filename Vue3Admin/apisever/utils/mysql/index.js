const mysql =require('mysql2')
const config =require('config')



const createPool = ()  => {
    return mysql.createPool(config.get('dbConfig'))
}

const pool=createPool()

const select= async (columnName,tableName,where='')=>{
return new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
        if (err) reject(err)
        else {
            connection.query(`select ${columnName} from ${tableName} ${where===''?'':'where '+ where}`,(err,results)=>{
                connection.release()//释放连接
                if (err) reject(err)
                else resolve ({results})

            })
        }
    }
    )
})
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


const selectUserAll = () => {
    return new Promise((resolve, reject) => {
        select('*', 'user')
            .then((res) => {
                resolve(res.results); // 当查询成功时，通过resolve传递结果
            })
            .catch((error) => {
                reject(error); // 如果查询出错，通过reject传递错误
            });
    });
};
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

    return password.results[0].password
}
const findPermissionByUsername= async (data)=>{


  const groupId =await select('permissionGroupId', 'user', `username = '${data}'`)

    console.log(groupId.results[0].permissionGroupId)
 const permission= await select('permission', 'permissiongroup', ` permissionGroupId = '${groupId.results[0].permissionGroupId}'`)
    return permission.results[0].permission
}
module.exports = {
    findPasswordByUsername,
    regist,
    insertData,
    selectUser,
    selectUserAll,
    findPermissionByUsername
}

