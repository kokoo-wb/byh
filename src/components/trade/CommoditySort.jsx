import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import { Icon, Toast } from 'antd-mobile'
import { helper } from '../utils'
import { messageString } from 'component/user'

const DragHandle = SortableHandle(() =>
  <div className="-three">
    <Icon type={require('static/svg/c_move.svg')} />
  </div>
)

const SortableItem = SortableElement(({value, onClick}) => {
    return (
        <li className="rt-edit-ls">
          <div className="rt-ls">
            <div
              className="-one"
              onClick={
                (i) => {
                  onClick(value)
                }
              }
            >
              <Icon type={require('static/svg/delete.svg')}/>
            </div>
            <div className="-two">
              {value.name}
            </div>
            <DragHandle />
          </div>
        </li>
    )
});

const SortableList = SortableContainer(({items, onClick}) => {
  return (
    <ul className="-ls-all">
      {items.map((value, index) =>
        <SortableItem key={`item-${index}`} index={index} value={value} onClick={
            onClick
          }/>
      )}
    </ul>
  );
});

class CommoditySort extends Component {
  state = {
    items: [
    ]
  }
  data = []
  onSortEnd = ({oldIndex, newIndex}) => {
    let {items} = this.state;
    this.setState({
        items: arrayMove(items, oldIndex, newIndex)
    }, () => {
      this.props.onComplete(this.state.items)
    });
  }
  onDeleteClick = (value) => {
    let arr = []
    let result
    this.state.items.forEach((val, index) => {
      let obj = {}
      obj.id = val.id
      obj.ccyPair = val.ccyPair
      arr.push(obj)
    })
    result = arr.filter((val, index) => {
      if (val.id != value.id) {
        return val
      }
    })
    //localStorage.removeItem('ccy')
    this.onFetchStorage(result)
    //localStorage.setItem('ccy', JSON.stringify(result))
  }
  onFetchStorage = (data) => {
    let list
    list = data.map((val, index) => {
      let obj = {}
      obj.id = val.id
      obj.ccyPair = val.ccyPair
      obj.name = <span>
                  <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
                  <span>/</span>
                  <FormattedMessage id={helper.splitString(val.ccyPair)[1]}/>
                </span>
      return obj
    })
    this.setState({items: list}, () => {
      this.props.onComplete(this.state.items)
    })
  }
  componentDidMount() {
    this.data = JSON.parse(localStorage.ccy)
    this.onFetchStorage(this.data)
  }
  render() {
    const { items } = this.state
    const formatMessage = this.props.intl.formatMessage
    //console.log(items, 'items')
    let message = formatMessage(messageString.addProducts)
    return (
      <div className="rt-commodity-sort">
        <div className="rt-sort-instruction">
          <div className="-left">
            <FormattedMessage
              id="commoditySort"
            />
            <span className="-tips">
              <FormattedMessage
                id="sortInstructions"
              />
            </span>
          </div>
          <div
            className="-right"
            onClick={
              () => {
                //localStorage.removeItem('ccy')
                this.setState({
                  items: []
                }, () => {
                  this.props.onComplete(this.state.items)
                })
              }
            }
          >
            <FormattedMessage
              id="deleteAll"
            />
          </div>
        </div>
        {
          items.length < 1 ? 
          <div className="rt-add-products">
            <span>
              <FormattedMessage id="addProducts"/>
            </span>
            <span
              className="rt-add-btn"
              onClick={
                () => {
                  const ccy = JSON.parse(localStorage.ccy)
                  //console.log(ccy , 'ccc')
                  if (ccy.length < 1) {
                    hashHistory.push('/trade/search')
                  } else {
                    Toast.fail(formatMessage(messageString.PleaseClickFinishToJump), 1.2)
                  }
                  
                }
              }
            >
              <Icon type={require('static/svg/icon_53.svg')}/>
            </span>
          </div> : <SortableList items={items} onSortEnd={this.onSortEnd} useDragHandle={true} onClick={
            (i) => {
              //console.log(i, 'i')
              this.onDeleteClick(i)
            }
          }/>

        }
        
      </div>
    )
  }
}


export default injectIntl(CommoditySort)