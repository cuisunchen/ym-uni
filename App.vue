<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-NVUE
		plus.screen.lockOrientation('portrait-primary');   //  控制app竖屏正方向锁死
		// #endif
	},
	onShow: function() {
		console.log('App Show');
		this.getLocation()
		const userInfo = uni.getStorageSync('userInfo');
		const token = uni.getStorageSync('token');
		if(!token){
			uni.reLaunch({
				url:'./pages/subPages/login/login'
			})
		}
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		getLocation(){
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					uni.request({
						url: 'https://api.map.baidu.com/geocoder/v2/?ak=Vh0ALNzHjjEm5RP0Ie16dlBhZbdEQip9&location=' + res.latitude + ',' + res.longitude + '&output=json',
						data: {},
						header: { 'Content-type': 'application/json' },
						success:(ops)=>{ 
							uni.setStorage({
								key: 'location',
								data: JSON.stringify(ops.data.result.addressComponent)
							})
						},
						fail: function (resq) {
							this.showToast("获取地址失败,请退出重试")
						}
					})
				}
			});
		},
	},
	
};
</script>

<style>
	
	@import url("./common/public.css");
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
