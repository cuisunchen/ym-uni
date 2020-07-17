<template>
	<view class="issueCard" @click="itemClick">
		<view class="title">订单编号: {{item.orderNum}}</view>
		<view class="con flex">
			<view class="imgBox">
				<image :src="item.imgUrl" mode=""></image>
			</view>
			<view class="info flex1 flex-column flex-between">
				<view class="status">订单状态: <text style="color: orange;">{{item.status}}</text></view>
				<view class="type">订单类型: <text style="color: #51a3f0;">{{item.homeType}}</text></view>
				<view class="money">发布费用: <text style="color: #b6298c;">{{item.releasePrice}}</text></view>
				<view class="status">发布时间: <text style="color: #4f8f24;">{{item.releaseTime}}等</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataObj:{
				// #ifdef APP-PLUS
				type: String,
				// #endif
				// #ifdef H5
				type: Object,
				// #endif
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				item:{}
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.item=JSON.parse(this.dataObj)
			// #endif
			// #ifdef H5
			this.item=this.dataObj
			// #endif
			
		},
		methods: {
			itemClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.issueCard{
	border-radius: 10rpx;
	overflow: hidden;
	.title{
		color: #fff;
		line-height: 80rpx;
		padding: 0 20rpx;
		background-color: #B4C386;
	}
	.con{
		padding: 26rpx 20rpx;
		background-color: #fff;
		.imgBox{
			width: 170rpx;
			height: 170rpx;
			border-radius: 10rpx;
			overflow: hidden;
			margin-right: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.info{
			color: #333;
			>view{
				text{
					margin-left: 14rpx;
				}
			}
		}
	}
}
</style>
