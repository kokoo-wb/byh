import Reflux from 'reflux'
import { config, helper, myFetch } from '../components/utils'

const PriceAction = Reflux.createActions(['changePrice','inforAll'])

export default PriceAction