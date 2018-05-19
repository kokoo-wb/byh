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
    language: 'zh-CN',
    obj: zh_CN,
    lang: 'zh'
  }
  componentDidMount() {
    localStorage.setItem('language', 'zh-CN')
  }
  chooseLocale = (language) => {
    switch(language){
      case 'en':
       if (this.state.language == 'en') return
        this.setState({
          obj: en_US,
          language: 'en',
          lang: 'en'
        }, () => {
          localStorage.setItem('language', 'en')
        })
        break;
      case 'zh-CN':
        if (this.state.language == 'zh-CN') return
          this.setState({
            obj: zh_CN,
            language: 'zh-CN',
            lang: 'zh'
          }, () => {
            localStorage.setItem('language', 'zh-CN')
          })
        
        break;
    }
  }
  render() {
     // console.log(this.state.language, 'language')
    return (
      <IntlProvider
        locale={this.state.language}
        messages={this.state.obj}
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