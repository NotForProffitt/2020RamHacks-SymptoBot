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
  fontFamily: 'Arial',
  headerBgColor: '#2C2F33',
  headerFontColor: '#fff',
  headerFontSize: '48px',
  botBubbleColor: '#a3acf7',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
}

function App () {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot />
    </ThemeProvider>
  )
}

export default App
