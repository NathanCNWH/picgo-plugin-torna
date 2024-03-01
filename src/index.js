const fs = require('fs')
const path = require('path')

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.uploader.register('torna', {
      handle,
      name: 'torna 图床',
      config: config
    })
  }
  const postOptions = (token, myurl ,fileName, image) => {
    return {
      method: 'POST',
      url: `${myurl}/uploadFile`,
      headers: {
        contentType: 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      formData: {
        file: image
      }
    }
  }
  const handle = async (ctx) => {
    let userConfig = ctx.getConfig('picBed.torna')
    if (!userConfig.token) {
     
      return
      // throw new Error('请先配置token')
    }
   if (!userConfig.myurl) {
     
      return
      // throw new Error('请先配置token')
    }
    const token = userConfig.token
    const myurl = userConfig.myurl
    const imgList = ctx.output
    for (let i in imgList) {
      let image = imgList[i].buffer
      if (!image && imgList[i].base64Image) {
        image = Buffer.from(imgList[i].base64Image, 'base64')
      }
      const data = new Uint8Array(image)
      const fileName = imgList[i].fileName
      const filePath = path.join(__dirname, fileName)
      await fs.writeFileSync(filePath, data)
      const postConfig = postOptions(token, myurl, fileName, fs.createReadStream(filePath))
      let body = await ctx.Request.request(postConfig)
      fs.unlink(filePath, () => {})
      body = JSON.parse(body)
      if (body.data && body.data.url) {
        delete imgList[i].base64Image
        delete imgList[i].buffer
        //imgList[i].imgUrl = body.data.image_url.replace('http', 'https')
		imgList[i].imgUrl = myurl+""+body.data.url
      } else {
        ctx.emit('notification', {
          title: '上传失败',
          body: body.message
        })
        throw new Error(body.message)
      }
    }
    return ctx
  }

  const config = ctx => {
    let userConfig = ctx.getConfig('picBed.torna')
    if (!userConfig) {
      userConfig = {}
    }
    return [
     
      {
        name: 'token',
        type: 'input',
        default: userConfig.token,
        required: true,
        message: 'token',
        alias: 'token'
      },
	  
      {
        name: 'myurl',
        type: 'input',
        default: userConfig.myurl,
        required: true,
        message: 'url前缀',
        alias: 'myurl'
      }
    ]
  }
  return {
    uploader: 'torna',
    config: config,
    register
  }
}
