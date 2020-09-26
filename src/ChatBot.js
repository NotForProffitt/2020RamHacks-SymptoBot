import React, { Component } from 'react'
import ChatBot, { Loading } from 'react-simple-chatbot'

class ChatBotBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      result: '',
      trigger: false
    }

    this.triggetNext = this.triggetNext.bind(this)
    this.locateCovidCenters = this.locateCovidCenters.bind(this)
  }

  componentWillMount () {
    const self = this
    const { query } = this.props
    const queryUrl = `http://localhost:8001/api/query?query=${encodeURI(this.props.steps.search.value)}`

    const xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', readyStateChange)

    function readyStateChange () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        const data = JSON.parse(this.responseText)
        self.setState({ loading: false, result: data.fulfillmentText })
      }
    }

    xhr.open('GET', queryUrl)
    xhr.send()
  }

  triggetNext () {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep()
    })
  }

  locateCovidCenters () {
    this.setState({ trigger: true }, () => {
      window.location.href = 'https://www.google.com/maps/search/covid+testing+near+me'
    })
  }

  render () {
    const { trigger, loading, result } = this.state

    return (
      <div className='dbpedia'>
        { loading ? <Loading /> : result }
        {
          !loading &&
            <div
              style={{
                textAlign: 'center',
                marginTop: 20
              }}
            >
              {
                !trigger &&
                <button
                  onClick={() => this.triggetNext()}
                >
                  Ask More
                </button>
              }
              {
                !trigger &&
                <button
                  onClick={() => this.locateCovidCenters()}
                >
                  Find COVID testing centers near me
                </button>
              }
            </div>
        }
      </div>
    )
  }
}

export default () => {
  return (<ChatBot
    steps={[
      {
        id: '1',
        message: 'Hi, I\'m Sympto-bot! Give me your symptoms or a situation and I\'ll do my best to guide you.',
        trigger: 'search'
      },
      {
        id: 'search',
        user: true,
        trigger: '3'
      },
      {
        id: '3',
        component: <ChatBotBox />,
        waitAction: true,
        trigger: '1'
      }
    ]}
  />)
}
