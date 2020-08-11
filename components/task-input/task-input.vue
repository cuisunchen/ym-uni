<template>
	<view class="taskCell flex flex-between align-center">
		<view class="leftBox flex flex-shrink align-center">
			<view class="icon flex all-center" v-if="showLeftSpace"><text class="iconBox" v-if="showLeftIcon">*</text></view>
			<view class="label" :style="{color: labelColor}">{{label}}</view>
		</view>
		<view class="rightInput flex1 flex align-center">
			<input type="number" value="" :placeholder="placeHolder" placeholder-class="holderClass" />
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
			labelColor:{
				type: String,
				default: '#333'
			},
			showLeftIcon:{
				type: Boolean,
				default: true
			},
			showLeftSpace:{
				type: Boolean,
				default: true
			},
			placeHolder:{
				type: String,
				default: '请输入...'
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.taskCell{
	height: 100rpx;
	padding: 0 30rpx;
	background-color: #fff;
	.leftBox{
		margin-right: 30rpx;
	}
	.icon{
		color: red;
		width: 20rpx;
		font-size: 38rpx;
		font-weight: bold;
		margin-right: 16rpx;
		.iconBox{
			margin-top: 8rpx;
		}
	}
}
</style>
