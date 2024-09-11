import { createChunk } from "@/utils/file/CreateChunk.js";

// 当 Worker 收到消息时执行此函数
onmessage = async (e) => {
    // 解构接收到的数据
    const { file, ChunkSize, start, end } = e.data;

    // 创建一个 Promise 数组，用于存储每个分块处理的 Promise
    const proms = [];

    // 遍历从 start 到 end 的索引范围
    for (let i = start; i < end; i++) {
        // 对于每个索引，创建一个分块处理的 Promise，并将其添加到 Promise 数组中
        proms.push(createChunk(file, i, ChunkSize));
    }

    // 等待所有分块处理的 Promise 完成
    const chunks = await Promise.all(proms);

    // 将处理好的分块发送回主线程
    postMessage(chunks);
};
