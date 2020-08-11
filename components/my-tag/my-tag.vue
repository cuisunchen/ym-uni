<template>
	<view class="tagBox row">
		<text class="myTag" :style="{backgroundColor: bgColor,color}">{{text}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			bgColor:{
				type: String,
				default: '#eee'
			},
			color:{
				type: String,
				default: '#666'
			},
			text:{
				type: String,
				default: ''
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
.myTag{
	color: #666;
	font-size: 22rpx;
	line-height: 20rpx;
	padding: 6rpx;
	border-radius: 4rpx;
}
.text{
	font-size: 24rpx;
}
</style>
