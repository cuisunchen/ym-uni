<template>
	<scroll-view scroll-y class="sameCityList">
		<view class="recommendBox">
			<recommend-list :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
		</view>
		
		<view class="listWrap" v-if="list.length > 0">
			<gl-list-item v-for="(item,index) in list" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
			<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
		</view>
		<div class="nodata flex-column align-center" v-if="list.length == 0">
				<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
				<view class="desc">暂无数据</view>
		</div>
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return{
				list: [],
				recommendList: [],
				pullupLoadingType:'more',
				param:{
					"typeId": '2',
					"cityCode": '440306',
					"pagesNum": 1,
					"pageSize": 8
				},
			}
		},
		props:{
			tabIndex:{
				type: Number,
				default(){
					return null
				}
			}
		},
		// watch:{
		// 	tabIndex(val){
		// 		// #ifdef APP-PLUS
		// 		this.param.cityCode = this.$parent.param.cityCode
		// 		// #endif
		// 		// #ifdef H5
		// 		this.param.cityCode = '440306'
		// 		// #endif
		// 		if(val == 2){
		// 			this.getGoodLuckTask()
		// 			this.getRecommendData()
		// 		}
		// 	}
		// },
		onShow() {
			console.log('samecity')
			if(this.tabIndex == 2){
				this.getGoodLuckTask()
				this.getRecommendData()
			}
		},
		methods:{
			getGoodLuckTask(type){
				console.log('samecity111')
				this.$request('/api/view/goodLuckTask','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(type == 'loadmore'){
							this.list.push(...res.data.homeAdList)
						}else{
							this.list = res.data.homeAdList
						}
						
						if(res.data.sumPage == this.param.pagesNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getRecommendData(){
				this.$request('/api/weChat/goodLuck','post',{"cityCode": this.param.cityCode}).then(res => {
					if(res.code == 200){
						// this.recommendDatas = res.data
						this.recommendList = res.data.nationwide
					}else{
						this.showToast(res.msg)
					}
				})
			},
			glDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)"; 
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服1')
					return
				}
				this.userClick(data)
				
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=goodLuck&index='+ index
				})
			},
			goDetail(data){
				if(!data.homeBigImgUrl && !data.bigImg && !data.contentImg){return}
				data.bigImg = data.homeBigImgUrl
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sameCityList{
		
	}
</style>
