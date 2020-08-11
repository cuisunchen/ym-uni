<template>
	<view class="taskCell flex flex-between align-center" @click="goPage">
		<view class="leftBox flex align-center">
			<view class="icon flex all-center"><text class="iconBox" v-if="showLeftIcon">*</text></view>
			<view class="label">{{label}}</view>
		</view>
		<view class="rightBox flex align-center">
			<view class="desc">{{desc}}</view>
			<view class="link"><uni-icons class="flex all-center" type="arrowright" color="#999" size="16"></uni-icons></view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			label:{
				type: String,
				default: '任务类型'
			},
			desc:{
				type: String,
				default: '未选择'
			},
			showLeftIcon:{
				type: Boolean,
				default: true
			},
			link:{
				type: String,
				default: ''
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			goPage(){
				uni.navigateTo({
					url:this.link
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.taskCell{
	height: 100rpx;
	padding: 0 30rpx;
	background-color: #fff;
	.icon{
		color: red;
		width: 20rpx;
		font-size: 38rpx;
		font-weight: bold;
		margin-right: 16rpx;
		.iconBox{
			line-height: 0;
			margin-top: 8rpx; 
		}
	}
	.label{
		color: #333;
	}
	.desc{
		color: #b5b0b8;
		margin-right: 10rpx;
	}
	.uniIcons{
		margin-top: 14rpx;
	}
}
</style>
