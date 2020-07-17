<template>
	<view class="issueRecommend">
		<view class="info flex align-center">
			<view class="peoples box">
				<text class="label">用户总数:</text>
				<text class="num"> {{totalPeople}}人</text>
			</view>
			<view class="priceBox box"> 
				<text class="label">费用说明:</text>
				<text class="price"> {{unitPrice}} 元/条</text>
			</view>
		</view>
		
		<view class="formWrap">
			<view class="uplaodTitImgBox box">
				<issue-upload-card class="uploadCard" type="row1" title="推荐" :is-clear="topImgClear"
							width-height-rate="1:1" @choose="chooseTitImg"></issue-upload-card>
				<view class="conText flex align-center">
					<view class="label">标题:</view>
					<input class="flex1 input" type="text" v-model.trim="form.title" placeholder-class="holderClass" placeholder="请输入标题" />
				</view>
			</view>
						
			<issue-con-img-upload-card class="uplaodConImgBox" v-model="netUrl" :is-clear="conImgClear" @choose="chooseConImg"></issue-con-img-upload-card>
			
			<issue-form-cell class="cell location" label="发布位置:" :desc="pickerText" desc-color="red" 
									@click="openLevel"></issue-form-cell>
								
			<issue-form-cell class="cell issuTime" label="发布时间:" :page-url="true" desc-color="#999"
								:desc="chooseDays.length == 0 ? '请选择' : '您共选择了' + chooseDays.length + '天'"
								@click="goTimePage" :is-time="false"></issue-form-cell>
													
			<view class="tip">
				<view class="">说明:</view>  
				1.平台审核时间: 早9:00-晚9:00,请在这个时间段内提交审核,其他时间段提交审核的订单,次日内审核,请知悉;
				2.请先预览效果再确认提交,如因上传失误产生的损失,由商户自己承担;
			</view>
			
			<view class="btns flex">
				<view class="preview flex all-center" @click="goPreview">预览效果</view>
				<button type="default" class="flex1 flex all-center" @click="submit">确认提交-支付宝</button>
			</view>
			
			<view class="xy flex all-center">商户协议,点击查看,确认提交默认遵守协议</view>
		</view>
		
		<level-linkage ref="levelLinkage" 
		            :pickerValueDefault="pickerValueDefault" 
		            :allData="levelData"
		            @onConfirm="onConfirm" themeColor='#007AFF'></level-linkage>
	</view>
</template>

<script>
	import issueUploadCard from '@/components/issue-upload-card/issue-upload-card.vue'
	import issueConImgUploadCard from '@/components/issue-conImg-upload-card/issue-conImg-upload-card.vue'
	import issueFormCell from '@/components/issue-form-cell/issue-form-cell.vue'
	import levelLinkage from "@/components/three-level-linkage/linkage.nvue"
	import citysData from '../../../common/utils/citys.js'
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		components:{issueUploadCard,issueConImgUploadCard,issueFormCell,levelLinkage},
		data() {
			return {
				netUrl:'',
				form:{
					"title": "",
					"homeTopImgUrl": "",
					"homeBigImgUrl": "",
					"cityCode": "",
					"releaseTimes": ['2020-07-16 00:00:00'],
					"homeType": 0,
					// "address": ''
				},
				pageType:'',
				pickerValueDefault: [0, 0],   // 这里控制显示3级联动或是2级联动
				pickerText: '全国',
				levelData:[],
				
				totalPeople: null,
				unitPrice: '',
				topImgClear: false,
				conImgClear: false,
			}
		},
		computed: {
			...mapGetters([
				'chooseDays'
			]),
		},
		onUnload() {
			this.set_chooseDays([])
		},
		onLoad(opt) {
			this.levelData = citysData
			this.pageType = opt.type
			
			switch (opt.type){
				case 'recommend-home':
					uni.setNavigationBarTitle({
					　　title:'发布首页-今日推荐'
					})
					this.form.cityCode = '0'
					this.form.homeType = 4
					break;
				case 'recommend-GL1':
					uni.setNavigationBarTitle({
					　　title:'发布好运-祝您好运推荐'
					})
					this.form.cityCode = '0'
					this.form.homeType = 5
					break;
				case 'recommend-GL2':
					this.pickerText = '请选择发布城市'
					uni.setNavigationBarTitle({
					　　title:'发布好运-同城活动推荐'
					})
					this.form.homeType = 6
					this.pickerValueDefault = [0, 0]
					break;
				case 'recommend-GL3':
					this.pickerText = '请选择发布位置'
					uni.setNavigationBarTitle({
					　　title:'发布好运-附近活动推荐'
					})
					this.form.homeType = 7
					this.pickerValueDefault = [0, 0, 0]
					break;
			}
			
			this.getReleasePrice()
		},
		methods: {
			...mapMutations({
				set_chooseDays: 'SET_CHOOSEDAYS',
			}),
			initForm(){
				this.netUrl = ''
				this.form = {
					"title": "",
					"homeTopImgUrl": "",
					"homeBigImgUrl": "",
					"cityCode": "",
					"releaseTimes": [],
					"homeType": 0,
				}
				this.topImgClear = false
				this.conImgClear = false
				this.pickerText = '全国'
			},
			submit(){
				if(this.netUrl){
					let url  = this.netUrl.split('?')[0]
					var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
					let re=new RegExp(strRegex);
					if(!url.toLowerCase().includes('http') && !url.toLowerCase().includes('https')){
						this.showToast('网址需要包括http或者https协议头')
						return
					}else
					if (!re.test(url.toLowerCase())) {
						this.showToast('内容网址格式不规范,请重新填写')
						return
					}
					this.form.homeBigImgUrl = this.netUrl
				}
				
				this.form.releaseTimes = this.chooseDays.map(item => item.date + ' 00:00:00')
				let res = this.checkRecommend(this.form)
				if(!res){
					return
				}
				this.submitRequest()
			},
			submitRequest(){
				this.$request('/api/recommend','post',this.form).then(res => {
					if(res.code == 200){
						uni.showModal({
							title:"是否确定支付",
							content:`需支付金额: ${res.data.amount}元`,
							cancelText:'残忍拒绝',
							confirmText:'朕去支付',
							success:(re) => {
								if(re.confirm){
									this.userPayAd(res.data.homeAdId)
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}else{
						this.showToast(res.msg)
					}
				})
			},
			userPayAd(id){
				this.$request('/api/pay/userPayAd','post',{homeAdId: id}).then(res => {
					if(res.code == 200){
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: res.data, //微信、支付宝订单数据
								success: (res) => {
									let rawdata = JSON.parse(res.rawdata)
									let result = JSON.parse(rawdata.result)
									this.topImgClear = true
									this.conImgClear = true
									this.set_chooseDays([])
									this.initForm()
									if(rawdata.resultStatus == '9000' && result.code == 10000 && result.msg == "Success"){
										uni.showModal({
											title:'恭喜您,订单支付成功!',
											content:'如有疑问,请联系客服',
											showCancel:false,
											success: () => {
												uni.navigateBack({
													delta:1
												})
											}
										})
									}
									// this.initForm()
								},
								fail: (err)=> {
									uni.showModal({
										title:'很遗憾,订单支付失败!',
										content:'如有疑问,请联系客服',
										showCancel:false,
										success: () => {
											uni.navigateBack({
												delta:1
											})
										}
									})
									console.log('fail:' + JSON.stringify(err));
								}
						});
					}
				})
			},
			openLevel() {
				if(this.pageType == 'recommend-home' || this.pageType == 'recommend-GL1'){
					uni.showToast({
						title:'全国型,不能选择发布位置',
						icon: 'none',
						duration:2000
					})
					return
				}
				this.$refs.levelLinkage.open();
			},
			onConfirm(e) {
					// e 确认后选中的数据
				this.pickerText = e.name
				if(this.pageType == 'recommend-GL2'){
					this.form.cityCode = e.secondPick.code.slice(0,4)
					this.form.address = e.name.replace(/\-/g,' ')
				}else if(this.pageType == 'recommend-GL3'){
					this.form.cityCode = e.thirdPick.code
					this.form.address = e.name.replace(/\-/g,' ')
				}
			},
			goTimePage(){
				let url = ''
				if(this.chooseDays.length > 0){
					url = '../issue-time-list/issue-time-list?isEdit=true'
				}else{
					url = '../issue-time-list/issue-time-list?isEdit=false'
				}
				uni.navigateTo({
					url
				})
			},
			chooseConImg(url){
				this.form.homeBigImgUrl = url
			},
			chooseTitImg(url){
				this.form.homeTopImgUrl = url
			},
			goPreview(){
				let obj = {
					title: this.form.title,
					homeTopImgUrl: this.form.homeTopImgUrl,
					homeBigImgUrl: this.form.homeBigImgUrl || this.netUrl,
					bigImg: this.form.homeBigImgUrl,
				}
				let res = this.checkRecommend(obj)
				if(!res){
					return
				}
				if(this.netUrl){
					var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
					let re=new RegExp(strRegex);
					if (!re.test(this.netUrl)) {
						this.showToast('内容网址格式不规范,请重新填写')
						return
					}
				}
				uni.navigateTo({
					url: '../examples/recommend-example-page/recommend-example-page?type=preview&pageData='+ encodeURIComponent(JSON.stringify(obj))
				})
			},
			getReleasePrice(){
				let param = {
					"homeAdType": 8,
					"rangType": 1
				}
				this.$request('/api/releasePrice','post',param).then(res=>{
					if(res.code == 200){
						this.totalPeople = res.data.peopleTotal
						this.unitPrice = res.data.adUnitPrice
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.issueRecommend{
	padding-bottom: 80rpx;
	.info{
		height: 80rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		.peoples{
			margin-right: 40rpx;
		}
		.box{
			.num{
				color: green;
				margin-left: 14rpx;
			}
			.price{
				color: red;
				margin-left: 14rpx;
			}
		}
	}
	
	.formWrap{
		padding: 30rpx;
		.uplaodTitImgBox{
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
			.conText{
				margin-top: 30rpx;
				.label{
					color: #666;
				}
				.flex1{
					padding: 0 10rpx;
					margin-left: 10rpx;
				}
			}
		}
		
		.uplaodConImgBox{
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
		}
		.cell{
			background-color: #fff;
			border-radius: 10rpx;
			margin-top: 30rpx;
			&.issuTime{
				margin-top: 1rpx;
			}
		}
		
		.tip{
			color: #fff;
			margin-top: 30rpx;
			padding: 20rpx 30rpx;
			border-radius: 10rpx;
			background-color: rgba(0,0,0, .7);
		}
		.btns{
			color: #fff;
			font-size: 28rpx;
			margin: 30rpx 0;
			.preview{
				width: 200rpx;
				margin-right: 18rpx;
				border-radius: 6rpx;
				background-color: rgba(0,0,0, .7);
			}
			.flex1{
				color: #fff;
				height: 80rpx;
				font-size: 28rpx;
				border-radius: 6rpx;
				background-color: rgb(206,177,120);
				border-color: rgb(206,177,120);
			}
		}
		.xy{
			color: #51a3f0;
			height: 40rpx;
			font-size: 22rpx;
			border-radius: 20rpx;
			background-color: #fff;
		}
	}
}
</style>
