<template>
	<view class="cell flex" :style="{backgroundColor: bgColor,'borderBottomColor':borderBottomColor}" @click="itemClick">
		<view class="left flex all-center">
			<image :src="iconPath" mode=""></image>
		</view>
		<view class="center flex1 flex align-center">
			<view class="title">{{title}}</view>
			<view class="desc" :style="{color: descColor || '#D4BA88',fontSize: descSize+'px'}">{{desc}}</view>
		</view>
		<view class="right flex align-center">
			<uni-icons v-if="isIconShow" type="arrowright" color="#999" size="18"></uni-icons>
			<text v-if="!isIconShow && rightText.length > 0">{{rightText}}</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue" 
	export default {
		components:{uniIcons},
		props:{
			descSize:{
				type: String,
				default(){
					return '12'
				}
			},
			isIconShow:{
				type: Boolean,
				default(){
					return true
				}
			},
			bgColor:{
				type: String,
				default(){
					return '#fff'
				}
			},
			height:{
				type: Number,
				default(){
					return 80
				}
			},
			iconPath:{
				type: String,
				default(){
					return ''
				}
			},
			title:{
				type: String,
				default(){
					return ''
				}
			},
			desc:{
				type: String,
				default(){
					return ''
				}
			},
			descColor:{
				type: String,
				default(){
					return '#D4BA88'
				}
			},
			rightText:{
				type: String,
				default(){
					return ''
				}
			},
			borderBottomColor:{
				type: String,
				default(){
					return '#eee'
				}
			},
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		methods:{
			itemClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.cell{
	border-radius: 8rpx;
	border-style: solid;
	border-width: 1rpx;
	border-top: none;
	border-left: none;
	border-right: none;
	padding: 5rpx 0;
	.left{
		width: 110rpx;
		height: 110rpx;
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}
	.center{
		.title{
			font-size: 30rpx;
		}
		.desc{
			margin-left: 10rpx;
		}
	}
	.right{
		padding-right: 30rpx;
		text{
			color: #51a3f0;
			font-weight: bold;
		}
	}
}
</style>
