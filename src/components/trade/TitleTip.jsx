import React from 'react'
import { FormattedMessage } from 'react-intl'

const TitleTip = () => {
  return (
    <div className="rt-title-tip">
      <FormattedMessage
        id="foreignName"
      />
      <span className="-sell">
        <FormattedMessage
          id="sell"
        />
      </span>
      
      <FormattedMessage
        id="spread"
      />
      <span className="-sell">
        <FormattedMessage
          id="buy"
        />
      </span>
      
    </div>
  )
}

export default TitleTip
