import './App.css'
import MainContent from './components/MainContent'
import ProductPage from './components/ProductPage'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap ">
          <Routes>
            <Route path='/' element={<MainContent />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>

        </div>
      </div>
    </Router >
  )
}

export default App
