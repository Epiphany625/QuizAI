import Landing from './components/landing/Landing.jsx'
import Quiz from './components/quiz/Quiz.jsx'
import Summary from './components/summary/Summary.jsx'
import Chatbot from './components/chatbot/Chatbot.jsx'
import Profile from './components/profile/Profile.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/summary' element={<Summary />} />
      <Route path='/quiz' element={<Quiz/>} />
      <Route path='/chatbot' element={<Chatbot />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App
