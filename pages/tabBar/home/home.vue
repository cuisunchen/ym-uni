<template>
	<view class="homePage page">
		<ygc-refresh class="lists flex-column"
		    @onRefresh="refresh" 
		    @scrolltolower="infiniteScroll">
				<view class="page-swiper">
					<special-banner :banner-list="bannerList" :swiper-config="swiperConfig" 
						:hasDesc="false" :scaleX="bannerList.length > 2 ? '1.1591': '1.2436'"
						@click="goDetail"/>
				</view>
				
				<view class="recommendBox">
					<recommend-list :data-obj="recommendList" @click="goDetail"></recommend-list>
				</view>
				
				<view class="qsList flex1">
					<view class="title flex align-center">
						<text class="tit">问答接单</text>
						<text style="font-size:12px; color: #666;margin-left: 10px">- 简单选择即可</text>
					</view>
					<scroll-view class="listWrap" scroll-y>
						<home-list-item v-for="(item,index) in questions" :key="item.id" :data-obj="item" @click="qsDetail(item,index)"></home-list-item>
						<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
					</scroll-view>
					<div class="nodata flex-column align-center" v-if="questions.length == 0">
						<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
						<view class="desc">暂无数据</view>
					</div>
				</view>
		</ygc-refresh>
		
		<view class="dialoagAD" v-if="isAlertImgShow">
			<view class="wrap flex-column all-center">
				<image :src="dialogObj.titleImg" mode="aspectFill" @click="goDetail(dialogObj)"></image>
				<uni-icons class="closeBtn" type="close" color="#fff" size="32" @click="closeAlertImg"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import specialBanner from "@/components/EtherealWheat-banner/specialBanner.vue"
	import homeListItem from "@/components/home-list-item/home-list-item.vue"
	import recommendList from "@/components/recommend-list/recommend-list.vue"
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue" 
	export default {
		components: {specialBanner,homeListItem,recommendList,ygcRefresh,uniLoadMore,uniIcons},
		data() {
			return {
				recomendItemHeight: '',
				swiperIndex:0,
				bannerList: [],
				swiperConfig: {
					indicatorDots: false,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: false,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx'
				},
				recommendList:[],
				questions:[],
				pullupLoadingType:'more',
				param:{
					"cityCode": "",
					"pageSize": 10,
					"pagesNum": 1
				},
				isAlertImgShow: false,
				dialogObj: {},
			}
		},
		onShow() {
			uni.$on('send', e =>{
				this.$set(this.questions,e.index,e.data)
			})
		},
		onUnload() {
			 uni.$off('send'); 
		},
		onLoad(){
			let userInfo = uni.getStorageSync('userInfo')
			if(!userInfo){return}
			uni.showLoading({
				title:'加载中'
			})
			this.param.cityCode = uni.getStorageSync('location')? JSON.parse(uni.getStorageSync('location')).adcode : '440306'
			this.getAlertData()
			this.getDatas()
			this.getRecommendData()
		},
		methods: {
			closeAlertImg(){
				this.isAlertImgShow = false
			},
			userClick(item,index){
				let param = {homeAdId : item.id}
				this.$request('/api/userClick','post',param).then(res => {
					if(res.code != 200){
						this.showToast(res.msg || res.data)
						return
					}
					item.clickNum ++
					this.$set(this.questions,index,item)
				})
			},
			getDatas(type){
				this.$request('/api/view/homeAdList','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(type == 'loadmore'){
							this.questions.push(...res.data.homeAdList)
						}else{
							this.questions = res.data.homeAdList
						}
						if(res.data.sumPage == this.param.pagesNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				},err =>{
					console.log(err)
				})
			},
			getAlertData(){ 
				let param = {
					"cityCode": this.param.cityCode,
					"homeType": 2
				}
				this.$request('/api/view/getAlertOrCover','post',param).then(res => {
					if(res.code == 200){
						if(res.data != null){
							let storageDate = uni.getStorageSync('date')
							let nowDate = new Date().getTime()
							let spaceTime = Math.floor((nowDate-storageDate)/1000/60/60)
							if(storageDate){
								if(spaceTime > 1 || spaceTime == 1){ // 每次弹出后更新缓存时间,清除缓存中弹框状态
									this.isAlertImgShow = true;
									wx.setStorage({
										key: 'date',
										data: nowDate
									})
								}
							}else{
								this.isAlertImgShow = true;
								wx.setStorage({
									key: 'date',
									data: nowDate
								})
							}
							this.dialogObj = res.data
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getRecommendData(){
				this.$request('/api/view/homeAdImg','get',{}).then(res => {
					if(res.code == 200){
						this.bannerList = res.data.carousel.map(item=>{
							item.picture = item.imgUrl
							item.bigImg = item.jumpUrl
							return item
						})
						this.recommendList = res.data.todayRecommend
					}else{
						this.showToast(res.msg)
					}
				})
			},
			qsDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				this.userClick(data,index)
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=question&index='+index
				})
			},
			goDetail(data){
				if(!data.homeBigImgUrl && !data.bigImg && !data.contentImg){return}
				uni.showLoading({
					title: '将前往详情页面',
					duration: 2000,
					mask: true
				})
				data.bigImg = data.homeBigImgUrl || data.jumpUrl || data.contentImg
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			},
			refresh() {
				this.questions=[]
				this.param.pageSize = 10
				this.param.pagesNum = 1
				uni.showLoading({
					title:'加载中'
				})
				this.pullupLoadingType == 'more'
				this.getDatas('refresh')
			},
			infiniteScroll() {
				if(this.param.pagesNum < 5 && this.pullupLoadingType == 'noMore'){
					uni.showModal({
						title:'提示',
						content:'等级不足,邀请好友提升等级,可展示更多广告,获取更多收益!',
						confirmText:'去分享',
						success: (res)=> {
							if (res.confirm) {
									uni.navigateTo({
										url:'../../subPages/download/download'
									})
							}
						}
					})
					return
				}
				
				this.param.pagesNum ++
				// console.log(this.param.pagesNum)
				this.pullupLoadingType = 'loading'
				uni.showLoading({
					title:'加载中'
				})
				this.getDatas('loadmore')
			},
		},
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #eee;
	}
</style>
<style lang="scss" scoped>
.homePage{
	height: 100%;
	.lists{
		/deep/ .uni-scroll-view-content{
			height: calc(100% + 100rpx);
			.refresh-moudle{
				height: 100%;
				display: flex;
				flex-direction: column;
			}
		}
	}
	.recommendBox{
		background-color: #fff;
	}
	.qsList{
		margin-top: 20rpx;
		padding: 0 20rpx;
		background-color: #fff;
		.listWrap{
			.listItem{
				&:last-child{
					border-bottom: none;
				}
			}
		}
		.title{
			line-height: 80rpx;
			position: sticky;
			top: 0;
			z-index: 999;
			background-color: #fff;
			.tit{
				font-size: 32rpx;
			}
		}
		.nodata{
			 margin-top: 100rpx;
			 background-color: #fff;
			 .img{
					width: 150rpx;
					height: 150rpx;
			 }
			 .desc{
					color: #999;
			 }
		}
	}
	.dialoagAD{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0, .5);
		.wrap{
			position: relative; 
			left: 50%; 
			top: 50%; 
			width: 90%; 
			height: auto; 
			transform:translate(-50%,-50%);
			image{
				width: 600rpx;
				height: 600rpx;
				border-radius: 10rpx;
			}
			.closeBtn{
				margin-top: 40rpx;
			}
		}
	}
}
</style>
