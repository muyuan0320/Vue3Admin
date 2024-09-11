const mysql =require('../../utils/mysql/index.js')
const insertOrderInfo = async (data)=>{

    for(let item of data.PidList) await mysql.insertData('OrderInfo',{Oid:data.Oid,Bid:data.Bid,Pid:item.Pid,Count:item.count})
}
 const writeOrder=async (Info,DetailData)=>{
 try{const result=  await mysql.insertData('`order`',Info)
    DetailData.Oid=result.insertId
    await  insertOrderInfo(DetailData)}
     catch (err){
        console.log(err)
        new Error('订单写入失败')
    }
}
const getOrderInfo=async (data)=>{
    try {
        let resultData = []

        if (data.results.length) {
            for (const resultDatum of data.results) {
                let resultData1 = []
                const result2 = await mysql.select('*', 'OrderInfo', `Oid=${resultDatum.Oid}`)
                for (let item of result2.results) {
                    const result3 = await mysql.select('*', 'Product', `Pid=${item.Pid}`)
                    resultData1.push({

                        Pid: result3.results[0].Pid,
                        Pimg: result3.results[0].Pimg,
                        Pname: result3.results[0].Pname,
                        Pprice: result3.results[0].Pprice,
                        Count: item.Count,
                    })
                }
                resultData.push({
                    Oid: resultDatum.Oid,
                    status:resultDatum.status,
                    ProuductList: resultData1,

                })
            }
            return resultData


        }
    }
    catch(err){
        console.log(err)
        new Error('订单信息获取失败')
    }
}
const getOrderInfoByUid=async (data)=>{
    try {
        const result = await mysql.select('*', '`order`', `Uid='${data.Uid}'`)
        return await getOrderInfo(result)
    }
    catch(err){
        console.log(err)
        new Error('订单信息获取失败')
    }
}
const getOrderInfoByBid=async (data)=>{
    try {
        const result = await mysql.select('*', '`order`', `Bid='${data.Bid}'`)
        return await getOrderInfo(result)
    }
    catch(err){
        console.log(err)
        new Error('订单信息获取失败')
    }
}
const getOrderInfoByStatus=async (data)=>{
    try {
        const result = await mysql.select('*', '`order`', `Uid='${data.Uid}' and status='${data.status}'`)
        return await getOrderInfo(result)
    }
    catch(err){
        console.log(err)
        new Error('订单信息获取失败')
    }
}
const finnishOrder =async(data)=>{
    console.log(data)
    try{
        await mysql.updateData('`order`',{status:'已完成'},`Oid=${data}`)
    }
    catch(err){
        console.log(err)
        new Error('订单发货失败')
    }
}
module.exports={
    writeOrder,
    getOrderInfoByUid,
    getOrderInfoByBid,
    getOrderInfoByStatus,
    finnishOrder
}