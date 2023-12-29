import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

function App() {

  return (
    <div className='font-mukta'>
    <Header /> 
    
    <div>
      <Outlet />
    </div>
    </div>
  )
}

export default App
