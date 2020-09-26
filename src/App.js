import React from 'react'
import logo from './logo.svg'
import './App.css'
import ChatBot from './ChatBot'
import { ThemeProvider } from 'styled-components'

const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1'
  },
  {
    id: '1',
    message: 'Bye!',
    end: true
  }
]

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
}

function App () {
  return (
    <div className='App'>
      <ChatBot />
    </div>
  )
}

export default App
