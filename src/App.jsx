import React, { Component } from 'react'
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl'
import { myFetch, helper, config } from 'component/utils'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
addLocaleData([...en, ...zh])
import en_US from './locales/en/en'
import zh_CN from './locales/zh/zh'


class App extends Component {
  state = {
    flag: false,
  }
  componentDidMount() {
    if (!localStorage.language) {
      let lang = navigator.language
      localStorage.setItem('language', lang)
    }
  }
  chooseLocale = (language) => {
    switch(language){
      case 'en-US':
        if (localStorage.language == 'en-US') return
        localStorage.setItem('language', 'en-US')
        this.setState({
          flag: true
        })
      break;
      case 'zh-CN':
        if (localStorage.language == 'zh-CN') return
        localStorage.setItem('language', 'zh-CN')
        this.setState({
          flag: true
        })
      break;
    }
  }
  render() {
    let lang = 'zh-CN'
    if (!localStorage.language) {
      lang = navigator.language
      localStorage.setItem('language', lang)
    }
    let messages
    if (localStorage.language == 'zh-CN') {
      messages = zh_CN
    } else {
      messages = en_US
    }
    return (
      <IntlProvider
        locale={localStorage.language ? localStorage.language : lang}
        messages={messages}
      >
        <div className={`rt-app-container`}>
          <div id="error-notice"></div>
          {React.cloneElement(this.props.children, {chooseLocale: this.chooseLocale, lang: this.state.lang})}
        </div>
      </IntlProvider>
    )
  }
}
export default App