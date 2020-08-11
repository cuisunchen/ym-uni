<template>
	<label class="taskTypeCard flex-column" @click="itemClick">
		<view class="flex align-center">
			<view class="typeInfo flex1 flex">
				<view class="typeImg">
					<image class="img" src="../../static/naozhong.png" mode=""></image>
				</view>
				<view class="flex-column flex-between">
					<view class="tit">{{item.title}}</view>
					<view class="desc">最低单价: <text class="price">{{item.price}}元</text></view>
				</view>
			</view>
			<radio :value="item.title" :checked="isChecked"/>	
		</view>
		<view class="tip">
			{{item.desc}}
		</view>
	</label>
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
			},
			isChecked:{
				type: Boolean,
				default: false
			}
		},
		watch:{
			dataObj(val){
				// #ifdef APP-PLUS
				this.item=JSON.parse(this.dataObj)
				// #endif
				// #ifdef H5
				this.item=this.dataObj
				// #endif
			}
		},
		data(){
			return{
				item:{},
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
		methods:{
			itemClick(){
				this.$emit('click')
			},
		}
	}
</script>

<style lang="scss" scoped>
.taskTypeCard{
	padding: 20rpx;
	border-radius: 10rpx;
	background-color: #fff;
	.typeInfo{
		.typeImg{
			width: 90rpx;
			height: 80rpx;
			margin-right: 20rpx;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.tit{
			font-size: 28rpx;
		}
		.desc{
			color: #666;
			font-size: 26rpx;
			.price{
				color: orange;
			}
		}
	}
	.tip{
		color: #666;
		margin-top: 16rpx;
		border-radius: 6rpx;
		padding: 8rpx 20rpx;
		background-color: #eee;
	}
}
/deep/ .uni-radio-input{
		width: 30rpx;
		height: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-color: #999;
		background-color: transparent!important;
		&.uni-radio-input-checked{
			border-color: #2C405A!important;
			&:before{
				content:'' !important;
				display:block;
				height: 24rpx;
				width: 24rpx;
				background-color: #2C405A;
				border-radius: 50%;
			}
		}
	}
</style>
