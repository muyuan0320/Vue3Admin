
 const OpenAi = require('openai')
const client = new OpenAi({
    apiKey:"sk-a630fd33314640959d1920b16da56c9b",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",

})



 const chat = async  (prompt,history) =>{

    try {
        if(history.length>=5){
            history.splice(1,2)
        }
        history.push({role: "user", content: prompt})
        return  client.chat.completions.create(
            {
                model: "qwen-max",
                messages: history,
                stream: true,
            }
        )
    }
    catch(err){
        console.log(err)
    }
}

module.exports = chat