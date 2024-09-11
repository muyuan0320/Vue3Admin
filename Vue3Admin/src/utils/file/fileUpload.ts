import SparkMD5 from "spark-md5";

const baseUrl = "http://localhost:8080/" // 后端服务器地址
const WorkerNum = navigator.hardwareConcurrency || 4

/*文件切片类型

Author:MuYuan

 */
type chunk= {
    start: number,//切片开始位置
    end: number,//切片结束位置
    index: number,//切片索引
    blob: Blob,//切片
    md5: string//切片md5码
}

/**
 * @description 使用get方法发送一个md5值，判断文件是否已经存在
 * @param md5Code 文件md5码
 * @author MuYuan
 * @returns {Promise<any>} 返回一个promise 标识文件是否存在
 */
export const fileExit = async (md5Code: string): Promise<any> => {
    const request = new XMLHttpRequest() // 创建请求对象
    request.responseType = "json" // 设置响应类型为json
    request.open("get", baseUrl + `fileExit?md5=` + md5Code, true) // 设置请求方式
    request.send() // 发送请求
    request.onreadystatechange = () => {
        //判断链路层是否成功
        if (request.status === 200 && request.readyState === 4) {
            return new Promise((resolve) => {
                // 处理promise
                resolve(request.response)
            })
        } else {
            // 网络错误
            new Error('网络错误')
        }
    }
}
/**
 * @description 上传文件切片
 * @param fileChunk 文件切片
 * @param md5Code   文件的md5码
 * @param fileName  文件名
 * @param chunkNum  切片数量
 * @author MuYuan
 */
const uploadChunk = async (fileChunk: any, md5Code: string, fileName: String, chunkNum: number) => {
    return new Promise(async (resolve) => {
        if (!await chunkExist(fileChunk.md5)) {
            const request = new XMLHttpRequest()
            request.open("post", baseUrl + `uploadChunk?md5code=${md5Code}&filename=${fileName}&chunkNum=${chunkNum}`, true)
            request.send(JSON.stringify(fileChunk)) // 发送请求
            request.onreadystatechange = () => {
                //判断链路层是否成功
                if (request.status === 200 && request.readyState === 4) {// 判断是否上传成功
                    if (request.response.code === 400) {// 如果上传失败，则重新上传
                        request.send(JSON.stringify(fileChunk))
                    } else {
                        // 上传成功
                        resolve(request.response)
                    }
                } else {// 网络错误
                    new Error('网络错误')
                }

            }
        }


    })
}
const chunkExist = async (md5Code: string): Promise<any> => {
}
/**
 * @description 上传文件 使用一个任务队列，并发上传文件切片，限制并发数量
 * @param cutChunksList 文件切片列表
 * @param md5Code 文件md5码
 * @param fileName
 * @param startIndex
 * @author MuYuan
 */
export const uploadFile = async (cutChunksList: any[], md5Code: string, fileName: string, startIndex: number) => {
    // 创建promise队列
    const prosQueue = []
    const limitNum = 5
    let activeTaskList = []
    //往promise队列中添加promise
    for (let i = startIndex; i < cutChunksList.length; i++) {
        const chunk = cutChunksList[i]// 获取切片
        prosQueue.push(uploadChunk(chunk, md5Code, fileName, cutChunksList.length))// 添加promise
    }
    // 循环执行promise
    while (prosQueue.length > 0) {
        // 判断当前任务队列是否小于限制数量，如果小于，则添加任务
        if (activeTaskList.length < limitNum) {
            const task = prosQueue.shift()!// 获取任务
            activeTaskList.push(task) // 添加任务
            task.then(async () => {
                // 任务完成，从任务队列中移除
                activeTaskList.splice(activeTaskList.indexOf(task), 1)
            })
        }
        //如果任务队列大于限制数量，则等待任务完成
        if (activeTaskList.length >= limitNum) {
            await Promise.race(activeTaskList)
        }
    }
}
/**
 * @description 获取文件md5码
 * @param file
 * @author MuYuan
 * @returns {promise<string>} 文件md5码 使用分块技术，防止一次性计算太大的文件导致内存溢出
 */
export const getFileMd5 = async (file: File): Promise<string> => {
    return new Promise(async (resolve,) => {
        const spark = new SparkMD5.ArrayBuffer()
        const chunkSize = 1024 * 1024 * 5// 5M
        const chunkNum = Math.ceil(file.size / chunkSize) // 计算切片总数1
        const proms = []// 创建promise数组
        for (let i = 0; i < chunkNum; i++) {
            const blob = file.slice(i * chunkSize, (i + 1) * chunkSize) // 对文件进行切片
            proms.push(new Promise((resolve, reject) => {
                const fileReader = new FileReader()// 创建文件读取对象
                fileReader.readAsArrayBuffer(blob)// 读取文件切片
                fileReader.onload = (e) => {
                    try {
                        spark.append(e.target?.result as ArrayBuffer) // 将切片添加到spark对象中
                        resolve(null) // 处理resolve 返回promise
                    } catch (e) {
                        reject(e)
                    }
                }
            }))
        }
        await Promise.all(proms) // 等待所有任务完成
        resolve(spark.end()) // 返回md5码
    })
}


/**
 * @description 文件切片 该函数调用多线程worker处理一个文件，将文件切片,线程数取决于客户端计算机的cpu核心数，若浏览器不支持获取，则默认为4
 * @param file
 * @returns {Promise<chunk[]>} 切片数组
 * @author MuYuan
 *
 */
export const cutFile = async (file: File): Promise<chunk[]> => {
    return new Promise((resolve) => {
        const result: chunk[] = []// 创建结果数组
        const ChunkSize = 1024 * 1024 * 5// 5M
        const ChunkNum = Math.ceil(file.size / ChunkSize) // 计算切片总数
        const threadChunkNum = Math.ceil(ChunkNum / WorkerNum)// 计算每个线程处理的切片数
        let count = 0 // 计数器
        for (let i = 0; i < WorkerNum; i++) {
            const start = i * threadChunkNum // 计算每个线程处理的切片开始位置
            let end = (i + 1) * threadChunkNum // 计算每个线程处理的切片结束位置
            if (end > ChunkNum) { // 如果结束位置大于切片总数，则结束位置等于切片总数
                end = ChunkNum
            }
            // 创建线程
            const worker = new Worker("src/utils/file/worker.js", {
                type: "module"
            })
            // 发送消息
            worker.postMessage({
                file, ChunkSize, start: start, end: end
            })
            // 接收消息
            worker.onmessage = async function (e) {
                for (let i = start; i < end; i++) {
                    result[i] = e.data[i - start] // 将结果添加到结果数组中 此处不使用push添加是因为存在异步问题
                }
                worker.terminate() // 关闭线程
                count++ // 计数器加一
                if (count === WorkerNum) {
                    resolve(result) // 所有线程都结束，则返回结果
                }
            }
        }
    })
}



