import React, { Component } from 'react'
import ChatBot, { Loading } from 'react-simple-chatbot'

class ChatBotBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      result: '',
      trigger: false,
      displayData: false,
      assessmentEmbed: false
    }

    this.triggetNext = this.triggetNext.bind(this)
    this.locateCovidCenters = this.locateCovidCenters.bind(this)
  }

  componentWillMount () {
    const self = this
    const { query } = this.props
    const queryUrl = `https://curtisf.dev:8001/api/query?query=${encodeURI(this.props.steps.search.value)}`

    const xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', readyStateChange)

    function readyStateChange () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        const data = JSON.parse(this.responseText)
        self.setState({ loading: false, result: data.fulfillmentText, displayData: !!((data.intent && data.intent.displayName === 'symptobot.displaydata')), assessmentEmbed: !!((data.intent && data.intent.displayName === 'symptobot.risk')) })
      }
    }

    xhr.open('GET', queryUrl)
    xhr.send()
  }

  triggetNext () {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep()
      this.setState({ trigger: true, result: '', loading: this.state.loading, displayData: false, assessmentEmbed: false })
    })
  }

  locateCovidCenters () {
    this.setState({ trigger: true }, () => {
      window.location.href = 'https://www.google.com/maps/search/covid+testing+near+me'
    })
  }

  get dataEmbed () {
    if (!this.state.displayData) return
    return (
      <div>
        <iframe src='https://ourworldindata.org/coronavirus-data-explorer?tab=map&yScale=log&zoomToSelection=true&time=earliest..latest&country=~USA&region=World&casesMetric=true&interval=smoothed&aligned=true&smoothing=7&pickerMetric=location&pickerSort=asc' loading='lazy' style={{ width: '1800px', height: '900px' }} />
        <button onClick={() => window.location.href = 'https://ourworldindata.org/coronavirus-data-explorer?tab=map&yScale=log&zoomToSelection=true&time=earliest..latest&country=~USA&region=World&casesMetric=true&interval=smoothed&aligned=true&smoothing=7&pickerMetric=location&pickerSort=asc'}>View Stats</button>
      </div>
    )
  }

  get assessmentEmbed () {
    if (!this.state.assessmentEmbed) return
    return (
      <iframe id='hf-iframe' src='https://covid19.infermedica.com/en' style={{ width: '1600px', height: '600px' }} />
    )
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
              {
                !trigger &&
                this.dataEmbed
              }
              {
                !trigger &&
                this.assessmentEmbed
              }
            </div>
        }
      </div>
    )
  }
}

export default () => {
  return (<ChatBot
    headerTitle='Sympto-bot'
    recognitionEnable
    botAvatar='https://cdn.discordapp.com/attachments/759402857669328920/759636605802905680/symptobot.png'
    floatingIcon={() => {
      return (<p>Floating lad</p>)
    }}
    steps={[
      {
        id: '1',
        message: 'Hi, I\'m Sympto-bot! Give me a situation and I\'ll do my best to guide you, or ask for a risk assessment to take a quiz.',
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
    // floatingStyle={{ height: '100vh', width: '100%' }}
    // customStyle={{ height: '100vh', width: '100%' }}
    style={{ height: '99vh', width: '100%', fontSize: '24px' }}
    contentStyle={{ height: '88vh', width: '100%', fontSize: '24px' }}
    bubbleStyle={{ fontSize: '24px', backgroundColor: '#105eab', color: 'white' }}
    // inputStyle={{ marginBottom: '0px', height: '10vh', width: '100%' }}
  />)
}
