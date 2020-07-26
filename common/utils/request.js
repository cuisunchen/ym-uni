import urlConfig from './config.js'

const headers = {}


const request = (url, method='post', data, hasToken="true") => {
		let token = uni.getStorageSync('token')
		if(hasToken){
			headers['Authorization'] =  token ? 'Bearer ' + token : ''
		}else{
			headers['Authorization'] = '' 
		}
    
		let promise = new Promise((resolve, reject)=> {
				return uni.request({
						url: urlConfig + url,
						method,
						data: data,
						dataType: 'json',
						header: headers
				}).then(res => {
					uni.hideLoading()
						if ((res[1].data.code && res[1].data.code == 200) || res[1].data.code == 999 
								|| res[1].data.code == 500|| res[1].data.code == 555) {
							resolve(res[1].data)
						} else {
							if(res[1].data.code == 502 || res[1].data.code == 501 || res[1].data.code == 503){
								uni.showToast({
									icon:'none',
									title: res[1].data.msg,
									duration: 2000 
								}); 
								// uni.clearStorage()
								uni.removeStorageSync('token');
								uni.removeStorageSync('userInfo');
								uni.reLaunch({
									url: '/pages/subPages/login/login'
								});
								return false
							}else{
								uni.showToast({
									icon:'none',
									title: res[1].data.msg,
									duration: 2000 
								});
							}
						}
				}).catch(parmas => {
					console.log('错误')
					uni.showToast({
						title:'连接失败,请检查网络是否正常'
					})
		　　　　reject(response)
		　　})
		})
		return promise	
 } 
 
const uploadRequest = (url,file) => {
	let token = uni.getStorageSync('token')
	let promise = new Promise((resolve, reject) => {
	 return uni.uploadFile({
						url: urlConfig + url,
						filePath: file,
						name: 'file',
						header:{
							Authorization: token ? 'Bearer ' + token : ''
						},
						success: (res) => {
							const data = JSON.parse(res.data);
							if ((data.code && data.code == 200) || data.code == 999 || data.code == 500) {
								resolve(data)
							} else {
								if(data.code == 502 || data.code == 501){
									uni.showToast({
										icon:'none',
										title: data.msg,
										duration: 2000 
									}); 
									uni.clearStorage()
									uni.reLaunch({
										url: '/pages/subPages/login/login'
									});
									return false
								}
							}
							resolve(res)
						},
						fail:(err) =>{
							reject(err)
							// uni.hideLoading();
							this.showToast("图片上传失败，请联系开发！")
						}
					})
	})
	return promise	
 
}

module.exports = {
	request,
	uploadRequest
} 
