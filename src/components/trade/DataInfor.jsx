import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { helper } from '../utils'
import { messageString } from 'component/user'

const DataInfor = function(props) {
	const { present } = props
	return (
		<div className="rt-information">
            <p>
              <FormattedMessage
                id='information'
              />
            </p>
            <ul>
              <li className="information-list">
                <span>
                  <FormattedMessage
                    id='name'
                  />
                </span>
                <span>
                	<FormattedMessage id={helper.splitString(present)[0]}/>
		            <span>/</span>
		            <FormattedMessage id={helper.splitString(present)[1]}/>
		            &nbsp;
                	{present}
                </span>
              </li>
              <li className="information-list">
                <span>
                  <FormattedMessage
                    id='currency'
                  />
                </span>
                <span>
                	<FormattedMessage id={helper.splitString(present)[0]}/>
                </span>
              </li>
              <li className="information-list">
                <span>
                  <FormattedMessage
                    id='differencetype'
                  />
                </span>
                <span>< FormattedMessage id="ChangeBugFloat"/></span>
              </li>
            </ul>
         </div>
		)
}

export default DataInfor