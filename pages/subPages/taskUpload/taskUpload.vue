<template>
	<view class="taskUploadPage">
		<view class="chooseType flex align-center">
			<view class="label">类型:</view>
			<view class="types flex1 flex">
				<view class="btn flex all-center" :class="{active: currentIndex == index}" v-for="(item,index) in types" :key="index" @click="typeChange(index)">{{item}}</view>
			</view>
		</view>
		
		<view class="codeWrap" v-if="currentIndex == 0">
			<view class="uploadCard flex">
				<view class="chooseImgBox flex all-center" @click="chooseImg">
					<uni-icons type="plusempty" size="30" color="#999" v-if="!imgUrl"></uni-icons>
					<image src="" mode="aspectFill" v-else></image>
				</view>
				<view class="con flex-column justifu-center">
					<view class="title">建议尺寸800*800</view>
					<view class="percent">请不要上传与任务无关的图片</view>
				</view>
			</view>
			
			<view class="desc">
				<view class="title">描述用户如何操作</view>
				<textarea class="textareaBox" type="text" value="" placeholder="请输入..." placeholder-class="holderClass" />
			</view>
		</view>
		
		<view class="netPath" v-if="currentIndex == 1">
			<input class="inputBox" type="text" value="" placeholder="请输入网址" placeholder-class="holderClass" />
			<view class="openType flex">
				<label class="flex align-center wechat" @click="openTypeClick(1)">
					<view>
							<radio value="r1" :checked="openType == 1"/>
					</view>
					<view>微信打开</view>
				</label>
				<label class="flex align-center" @click="openTypeClick(2)">
					<view>
							<radio  :checked="openType == 2"/>
					</view>
					<view>手机浏览器打开</view>
				</label>
			</view>
			<view class="desc">
				<view class="title">描述用户如何操作</view>
				<textarea class="textareaBox" type="text" value="" placeholder="请描述需要用户注意的事项" placeholder-class="holderClass" />
			</view>
		</view>
		
		<view class="tokenBox" v-if="currentIndex == 2">
			<view class="desc">
				<view class="title">口令信息</view>
				<textarea class="textareaBox" type="text" value="" placeholder="请描述需要用户注意的事项" placeholder-class="holderClass" />
			</view>
		</view>
		
		<view class="textBox" v-if="currentIndex == 3">
			<view class="desc">
				<textarea class="textareaBox" type="text" value="" placeholder="请在此描述用户如何完成任务" placeholder-class="holderClass" />
			</view>
		</view>
		
		<button class="saveBtn flex all-center" type="default">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:0,
				types:['二维码','网址','口令','纯文本'],
				openType: 2
			};
		},
		methods:{
			typeChange(i){
				this.currentIndex = i
			},
			openTypeClick(i){
				this.openType = i
			},
			chooseImg(){
				uni.chooseImage({
					count: 1,
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title:'图片上传中'
						});
						this.$upload('/image/upload',tempFilePaths[0]).then(res => {
							uni.hideLoading();
							if(res.code=="200"){
								this.imgUrl = res.data;
								// this.$emit('choose',this.imgUrl)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.taskUploadPage{
	height: 100%;
	padding: 0 30rpx;
	background-color: #fff;
	.chooseType{
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
		.types{
			margin-left: 20rpx;
			.btn{
				flex: 1;
				color: #999;
				height: 60rpx;
				margin-right: 16rpx;
				border-radius: 10rpx;
				border: 1rpx solid #2C405A;
				&.active{
					color: #fff;
					background-color: #2C405A;
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
	.holderClass{
		color: #999;
		line-height: 40rpx;
	}
	.desc{
		margin-top: 40rpx;
		.textareaBox{
			width: auto;
			height: 250rpx;
			font-size: 26rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 10rpx;
			background-color: #eee;
		}
	}
	.codeWrap{
		margin-top: 40rpx;
		.chooseImgBox{
			width: 200rpx;
			height: 200rpx;
			overflow: hidden;
			background-color: #eee;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.con{
			margin-left: 20rpx;
			.title{
				color: #666;
				font-size: 28rpx;
			}
			.percent{
				color: #666;
				font-size: 26rpx;
			}
		}	
	}
	.netPath{
		.inputBox{
			height: 80rpx;
			font-size: 26rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 0 10rpx;
			background-color: #eee;
		}
		.openType{
			height: 80rpx;
			padding: 0 30rpx;
			background-color: #eee;
			border-radius: 10rpx;
			margin-top: 20rpx;
			.wechat{
				margin-right: 60rpx;
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
		}
		
	}
	
	.saveBtn{
		color: #fff;
		height: 90rpx;
		margin-top: 50rpx;
		background-color: #2C405A;
	}
}
</style>
