import Reflux from 'reflux'
import { PriceAction } from '../actions'
import { config, helper, myFetch } from '../components/utils'
import math from 'mathjs'
import moment from 'moment'
const onInit = () => {
    const options = {
      method: 'POST'
    }
    myFetch(`${config.rootApi}/mInit`, options, true)
    .then((rs) => {
      //console.log(rs, 'us')
      //return
      if (rs) {
        localStorage.setItem('ladderdate',rs.ladderLatestdate)
        localStorage.setItem('markupdate',rs.markupLatestdate)
      }
      if (rs && rs.dataInfoInitCcypair && rs.dataInfoInitCcypair.dataListInitCcypairs) {
        localStorage.setItem('init', JSON.stringify(rs.dataInfoInitCcypair.dataListInitCcypairs))
        let arr = rs.dataInfoInitCcypair.dataListInitCcypairs
        let result = []
        arr.map((val, index) => {
          let obj = Object.assign({}, {id: index, ccyPair: val.ccyPair})
          result.push(obj)
        })
        if (!localStorage.all && !localStorage.ccy) {
          //console.log('app2')
          localStorage.setItem('all', JSON.stringify(result))
          localStorage.setItem('ccy', JSON.stringify(result))
        }
      }
    })
}
class PriceStore extends Reflux.Store {
	constructor() {
		super()
		this.listenables = PriceAction
	}
	onChangePrice(status, number, promise) {
		//console.log(status, number, 10)
		promise.then((rs) => {
			//console.log(rs, 'rs')
			if (rs) {
				const rateladderdate = rs.ladderLatestdate
				const ratemarkupdate = rs.markupLatestdate
				let ladderdate = localStorage.ladderdate
        let markupdate = localStorage.markupdate
        //console.log(rateladderdate, ladderdate, ratemarkupdate, markupdate)
        //console.log(moment(rateladderdate).isSame(ladderdate),
        	//moment(ratemarkupdate).isSame(markupdate))
        if (!moment(rateladderdate).isSame(ladderdate) || !moment(ratemarkupdate).isSame(markupdate)) {
        	//console.log(1)
        	onInit()
        }
			}
        //console.log(localStorage.ladderdate)
        
        //console.log(localStorage.markupdate)
        //console.log(status, 'status')
		 	if (rs && rs.dataInfoRate && rs.dataInfoRate.dataListRates) {
		 		let ladderSpreadBid = 0, ladderSpreadAsk = 0, sellPrice, buyPrice, length = 5
		 		let init = JSON.parse(localStorage.init)
		 		if (status.includes('JPY')) {
			      length = 3
			    }
		 		let initfilter = []
		 		initfilter = init.filter((val, index) => {
		 			return val.ccyPair == status
		 		})

		 		let data = rs.dataInfoRate.dataListRates
		 		let result = []
		 		result = data.filter((val, index) => {
		 			return val.ccyPair == status
		 		})
		 		if (number == 0) {
		 			ladderSpreadBid = 0;
		 			ladderSpreadAsk = 0;
		 			sellPrice = helper.accSub(result[0].bidPriceFix, initfilter[0].markupValueBid)
		 			buyPrice = helper.accAdd(result[0].askPriceFix, initfilter[0].markupValueAsk)
		 		} else {
		 			let ladderarr = initfilter[0].dataInfoLadder.dataListLadders
		 			let newladder = ladderarr.filter((val, index) => {
		 				if (number >= val.orderAmtLower && number <= val.orderAmtUpper ) {
		 					return true
		 				}
		 			})
		 			//console.log(number)
		 			//console.log(parseFloat(initfilter[0].markupValueBid), 10)
		 			ladderSpreadBid = newladder[0].ladderSpreadBid
		 			ladderSpreadAsk = newladder[0].ladderSpreadAsk
		 			//console.log(parseFloat(ladderSpreadBid), 11)
		 			//console.log(result[0].bidPriceFix)
		 			if (newladder[0].fixFlag == 1) {
		 		sellPrice = math.chain(parseFloat(result[0].bidPriceFix))
		 						.subtract(parseFloat(ladderSpreadBid))
		 						.subtract(parseFloat(initfilter[0].markupValueBid))
		 						.done()
		 		buyPrice = math.chain(parseFloat(ladderSpreadAsk))
		 					   .add(parseFloat(initfilter[0].markupValueAsk))
		 					   .add(parseFloat(result[0].askPriceFix))
		 					   .done()
		 			} else if (newladder[0].fixFlag == 2) {
		 		sellPrice = math.chain(parseFloat(result[0].bidPriceVar))	
		 						.subtract(parseFloat(ladderSpreadBid))
		 						.subtract(parseFloat(initfilter[0].markupValueBid))
		 						.done()
		 		buyPrice = math.chain(parseFloat(ladderSpreadAsk))
		 					   .add(parseFloat(initfilter[0].markupValueAsk))
		 					   .add(parseFloat(result[0].askPriceVar))
		 					   .done()
		 			}
		 			//console.log(parseFloat(initfilter[0].markupValueBid).toString(),15)
		 		}
		 		//console.log(status,number, sellPrice, buyPrice, '平仓')
		 		let highPrice
		 		let lowPrice
		 		let openPrice, askPriceVar, bidPriceVar, changePriceBid
		 		

		 		highPrice = result[0].highPriceBid
		 		lowPrice = result[0].lowPriceBid
		 		openPrice = result[0].openPriceBid
		 		askPriceVar = result[0].askPriceVar
		 		bidPriceVar = result[0].bidPriceVar
		 		changePriceBid = result[0].changePriceBid
		 		//console.log(askPriceVar, bidPriceVar, 120)

		 		this.setState({
		 			sellPrice: Number(sellPrice).toFixed(length),
		 		    buyPrice: Number(buyPrice).toFixed(length),
		 		    highPrice, lowPrice, openPrice, bidPriceVar, askPriceVar, changePriceBid
		 		})

		 	}
		 })
	}
	onInforAll() {
		//console.log(1)
		const options = {
	      method: 'POST'
	    }
	    myFetch(`${config.rootApi}/mRatelist`, options, true)
	     .then((rs) => {
	     		if (rs) {
						const rateladderdate = rs.ladderLatestdate
						const ratemarkupdate = rs.markupLatestdate
						let ladderdate = localStorage.ladderdate
		        let markupdate = localStorage.markupdate
		        //console.log(rateladderdate, ladderdate, ratemarkupdate, markupdate)
		        //console.log(moment(rateladderdate).isSame(ladderdate),
		        	//moment(ratemarkupdate).isSame(markupdate))
		        if (!moment(rateladderdate).isSame(ladderdate) || !moment(ratemarkupdate).isSame(markupdate)) {
		        	//console.log(1)
		        	onInit()
		        }
					}
	       if (rs && rs.dataInfoRate && rs.dataInfoRate.dataListRates) {
	         if (!localStorage.ccy) {
	           return
	         }
           //console.log(456)
	         let ccy = JSON.parse(localStorage.ccy)
           if (ccy.length < 1) {
              this.setState({
               dataRatelist: []
             })
            return
           }
	         //console.log(ccy, 'ccy')
	         let obj = {}
	         rs.dataInfoRate.dataListRates.forEach((val, index) => {
	           obj[val.ccyPair] = val
	         })
	         let init = JSON.parse(localStorage.init)
	 		 //console.log(init, 'init')
	 		 let initfilter = {}
	 		 init.forEach((val, index) => {
	 			let obj = {}
	 			obj.markupValueBid = val.markupValueBid
	 			obj.markupValueAsk = val.markupValueAsk
	 			initfilter[val.ccyPair] = obj
	 		 })
	         let arr = []
	         ccy.forEach((val, index) => {
	           arr.push(Object.assign({}, obj[val.ccyPair], initfilter[val.ccyPair]))
	         })
	         if (arr.length < 1) {
	           return
	         }
	         this.setState({
	           dataRatelist: arr
	         })
	       }
	     })
	}
}

export default PriceStore