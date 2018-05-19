import Reflux from 'reflux'
import { AccountAction } from '../actions'
import { config, helper, myFetch } from '../components/utils'
import math from 'mathjs'

class AccountStore extends Reflux.Store {
	constructor() {
		super()
		this.listenables = AccountAction
	}
	onAccountInfo() {
		const options = {
	      method: 'POST'
	    }
	    myFetch(`${config.rootApi}/mAccount`, options, true)
	      .then((rs) => {
	        if (rs) {
	          this.setState({
	          	accountData: rs
	          })
	          //console.log(12)
	          
	        }
	      })
	}
}

export default AccountStore