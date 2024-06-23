const mysql =require('../../utils/mysql/index.js')
const insertOrderInfo = async (data)=>{

    for(let item of data.PidList) await mysql.insertData('OrderInfo',{Oid:data.Oid,Bid:data.Bid,Pid:item.Pid,Count:item.count})
}
 const writeOrder=async (Info,DetailData)=>{
  const result=  await mysql.insertData('`order`',Info)
    DetailData.Oid=result.insertId
    await  insertOrderInfo(DetailData)
}
module.exports={
    writeOrder
}