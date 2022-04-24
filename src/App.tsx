import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import EditablePage from './Screens/EditablePage'
import CalendarScreen from './Screens/CalendarScreen'
import ClientsScreen from './Screens/Hardware/ClientsScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DocumentationScreen from './Screens/Enterprise/Documentation/DocumentationScreen'
import HomeScreen from './Screens/HomeScreen'
import TaskScreen from './Screens/Enterprise/Task/TaskScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
        <Layout>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/task' element={<TaskScreen />} />
            <Route path='/documentation' element={<DocumentationScreen />} />
            <Route path='/calendar' element={<CalendarScreen />} />
          {/* <ClientsScreen /> */}
          {/* <EditablePage /> */}
          </Routes>
        </Layout>

      </>
    </BrowserRouter>
  )
}

export default App
