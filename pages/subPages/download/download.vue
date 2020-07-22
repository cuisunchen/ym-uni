<template>
	<view class="downloadPage page" id="_poster">
		<view class="contentWrap" id="contentWrap">
			<view class="userInfo flex">
				<image class="img" src="../../../static/place/fang@2x.png" mode=""></image>
				<view class="wrap">
					<view class="phone">{{userInfo.nickName.slice(0,3) + '****' + userInfo.nickName.slice(-4)}}</view>
					<view class="text flex all-center">向你推荐</view>
				</view>
			</view>
			
			<image class="shareImg" src="../../../static/other/shareImg.png" mode="widthFix"></image>
			<view class="bot flex">
				<view class="leftCon flex1">
					<view class="title">今日友米</view>
					<view class="desc">让你足不出户,轻松有财</view>
					<view class="injoin">微信小程序搜索"米圈日记"</view>
					<view class="injoin">或扫描右方二维码即可加入</view>
				</view>
				<view class="code">
					<tki-qrcode
					    ref="qrcode"
					    cid="qrcode"
							:val="val"
							:size="size"
							:background="background"
							:foreground="foreground"
							:pdground="pdground"
							:icon="icon"
							:iconSize="iconsize"
							:lv="lv" 
							:onval="onval"
							:loadMake="loadMake"
							/>
				</view>
			</view>
			<view class="tip">
				<view class="title">温馨提示:</view>
				<view class="con">
					1. 邀请好友可以提升等级,等级越高,分配的广告越多,等级达到5级以后,可以无限制浏览广告赚取收益;
				</view>
				<view class="con">
					2. 每邀请一位好友可以获取一次好运抽奖的机会,最高可获取奖励500元;
				</view>
				<view class="con">
					3. 邀请好友越多获取好友返利就越多,如果您有50名好友,那么每天您的好友会给您带来70~200元的收益,好友越多收益越多。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components:{tkiQrcode},
		data() {
			return {
				//  二维码组件配置
				statusBarHeight: 0,
				base64:null,
				val:'',
				size:240,
				background:'#ffffff',
				foreground:'#000000',
				pdground: '#000000',
				icon:'../../../static/appLogo.png',
				iconsize: 25,
				lv: 3,
				onval: true,
				loadMake: true,
				
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.val = 'https://www.guangyi009.com/mp/mp?agentCode=' + this.userInfo.agentCode;
			let systemInfo = uni.getSystemInfo({
				success:(data) =>{
					this.statusBarHeight = data.statusBarHeight + 45
				}
			})
		},
		onNavigationBarButtonTap() {
			
			this.toImage();
		},
		methods: {
			toImage() {
					/* 获取屏幕信息 */
					let ws = this.$mp.page.$getAppWebview();
					let bitmap = new plus.nativeObj.Bitmap('downloadPage');
						// 将webview内容绘制到Bitmap对象中
						ws.draw( bitmap,
							(e)=> {
								/* 获取base64 */
								// this.test= bitmap.toBase64Data();
								/* 加载base64编码 */
								bitmap.loadBase64Data(bitmap.toBase64Data(),
									() => {
										console.log('加载Base64图片数据成功');
										let timeStamp = new Date().getTime()
										/* 保存图片 */
										bitmap.save('_doc/share' + timeStamp + '.jpg',{},
											async (i)=>{
												console.log('保存图片成功：' + JSON.stringify(i));
												uni.saveImageToPhotosAlbum({
													filePath: i.target,
													success: ()=> {
														/* 清除 */
														bitmap.clear();
														this.showToast('下载成功,请到相册中查看')
													},
													fail(e) {
														this.showToast('下载失败,请联系系统管理员')
													}
												});
											},
											(e) => {
												this.showToast('下载失败,请联系系统管理员' + JSON.stringify(e))
												console.log('保存图片失败：' + JSON.stringify(e));
											}
										);
									},
									() => {
										console.log('加载Base64图片数据失败：' + JSON.stringify(e));
									}
								);
							},
							(e) => {
								console.log('截屏绘制图片失败：' + JSON.stringify(e));
							},
							{
								check: true, // 设置为检测白屏
								clip: { top: this.statusBarHeight +'px', left: '0px', height:'100%', width: '100%' } // 设置截屏区域
							},
						)
			}
		}
	}
</script>

<style lang="scss" scoped>
.downloadPage{
	height: 100%;
	position: relative;
	background-color: #95ae84;
	.contentWrap{
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch
	}
	.test{
		color: red;
	}
	.userInfo{
		padding: 30rpx 30rpx 0 30rpx;
		.img{
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.wrap{
			.phone{
				color: #fff;
				font-size: 32rpx;
				font-weight: bold;
				margin: 10rpx;
			}
			.text{
				width: 140rpx;
				height: 40rpx;
				color: #FFFFFF;
				font-size: 26rpx;
				background-color: orange;
				border-radius: 6rpx;
			}
		}
	}
	.shareImg{
		width: 100%;
		// margin: 30rpx 0;
	}
	.bot{
		margin: 0 16rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.leftCon{
			>view{
				text-align: center;
			}
			.title{
				font-size: 38rpx;
				line-height: 70rpx;
			}
			.desc{
				color: #666;
				margin-bottom: 20rpx;
			}
			.injoin{
				color: red;
				line-height: 60rpx;
			}
		}
		.code{
			width: 250rpx;
			height: 250rpx;
		}
	}
	.tip{
		padding: 0 20rpx;
		margin-top: 20rpx;
		.title{
			color: red;
		}
		.con{
			color: #fff;
			font-size: 24rpx;
		}
	}
	

}
</style>
