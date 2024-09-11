import SparkMD5 from "spark-md5";

/**
 * 创建文件的一个分块，并计算该分块的 MD5 值。
 *
 * @param file - 要处理的文件对象。
 * @param index - 分块的索引。
 * @param ChunkSize - 每个分块的大小。
 * @returns {Promise<{start: number, end: number, index: number, blob: Blob, md5: string}>} - 包含分块信息及其 MD5 值的对象。
 * @author MuYuan
 */
export const createChunk = async (file, index, ChunkSize) => {
    return new Promise((resolve, reject) => {
        // 计算分块的起始位置
        const start = index * ChunkSize;
        // 计算分块的结束位置
        const end = start + ChunkSize;

        // 初始化 SparkMD5 实例
        const spark = new SparkMD5.ArrayBuffer();
        // 创建文件读取器实例
        const reader = new FileReader();

        // 创建 Blob 对象表示当前分块
        const blob = file.slice(start, end);

        // 当文件读取完成时调用的回调函数
        reader.onload = (e) => {
            // 将读取到的 ArrayBuffer 添加到 SparkMD5 实例中
            spark.append(e.target.result);
            // 解析并返回包含分块信息及其 MD5 值的对象
            resolve({
                start,
                end,
                index,
                blob,
                md5: spark.end()
            });
        };

        // 开始读取 Blob 数据为 ArrayBuffer
        reader.readAsArrayBuffer(blob);
    });
};
