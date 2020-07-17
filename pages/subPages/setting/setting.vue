<template>
	<view class="settingPage page">
		<view class="cellsWrap">
			<cell icon-path="../../../static/gw.png" title="官网" desc="- http://www.guangyi009.com" right-text="" :is-icon-show="false"></cell>
			<cell icon-path="../../../static/xcx.png" title="小程序" desc="- 小程序搜索米圈日记" desc-color="red" :is-icon-show="false"></cell>
			<cell icon-path="../../../static/gw1.png" title="官方微信" desc="- youmi" right-text="" :is-icon-show="false"></cell>
			<cell icon-path="../../../static/xq.png" title="设置兴趣" desc="- 根据兴趣推送广告" border-bottom-color="transparent" @click="goSubPage"></cell>
		</view>
		
		<view class="btn">
			<button type="default" class="logout" @click="logout">退出登录</button>
		</view>
	</view>
</template>
<script>
	import cell from '@/components/cell/cell.vue'
	import { mapGetters } from 'vuex'
	export default {
		comments:{cell},
		data() {
			return {
			}
		},
		computed: {
			...mapGetters([
				'checked_hobbys_id',
				'checked_hobbys_name'
			]),
		},
		methods: {
			logout(){
				this.$request('/api/loginOut','',{}).then(res=>{
					if(res.code == 200){
						// uni.clearStorage()
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
						uni.reLaunch({
							url: '../login/login'
						})
					}
				})
			},
			goSubPage(){
				uni.navigateTo({
					url:'../interest/interest'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.settingPage{
	padding: 30rpx;
	.cellsWrap{
		border-radius: 10rpx;
		background-color: #fff;
	}
	.btn{
		margin-top: 80rpx;
		button{
			color: #fff;
			height: 80rpx;
			font-size: 32rpx;
			background-color: rgb(206,177,120);
		}
	}
}
</style>
