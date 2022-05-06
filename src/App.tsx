import { useState } from 'react'
import EditablePage from './Screens/EditablePage'
import CalendarScreen from './Screens/CalendarScreen'
import ClientsScreen from './Screens/Hardware/ClientsScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DocumentationScreen from './Screens/Enterprise/Documentation/DocumentationScreen'
import HomeScreen from './Screens/HomeScreen'
import TaskScreen from './Screens/Enterprise/Task/TaskScreen'
import ProductsScreen from './Screens/Hardware/ProductsScreen'
import EmployesScreen from './Screens/Management/EmployesScreen'
import CreateProductScreen from './Screens/Hardware/CreateProductScreen'
import CategoriesScreen from './Screens/Hardware/CategoriesScreen'
import BrandsScreen from './Screens/Hardware/BrandsScreen'
import CreateClientScreen from './Screens/Hardware/CreateClientScreen'
import SigninScreen from './Screens/Login/SigninScreen'
import ComputersScreen from './Screens/Hardware/ComputersScreen'
import CreateComputerScreen from './Screens/Hardware/CreateComputerScreen'
import GamesScreen from './Screens/Hardware/GamesScreen'
import InsigthsScreen from './Screens/Hardware/InsigthsScreen'
import ProgramsScreen from './Screens/Hardware/ProgramsScreen'
import CreatePostScreen from './Screens/Hardware/CreatePostScreen'
import QuoteScreen from './Screens/Hardware/QuoteScreen'

function App() {
  const [count, setCount] = useState(0)


  const adminInfo = false;
  return (
    <BrowserRouter>
      <>
        {adminInfo ? (

          <Routes>
            <Route path='/login' element={<SigninScreen />} />
          </Routes>
        )

          : (
            <Layout>
              <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/clients' element={<ClientsScreen />} />
                <Route path='/employes' element={<EmployesScreen />} />
                <Route path='/create-post-hardware' element={<CreatePostScreen />} />
                <Route path='/brands' element={<BrandsScreen />} />
                <Route path='/categories' element={<CategoriesScreen />} />
                <Route path='/games' element={<GamesScreen />} />
                <Route path='/programs' element={<ProgramsScreen />} />
                <Route path='/computers' element={<ComputersScreen />} />
                <Route path='/create-computer' element={<CreateComputerScreen />} />
                <Route path='/products' element={<ProductsScreen />} />
                <Route path='/create-product' element={<CreateProductScreen />} />
                <Route path='/create-client' element={<CreateClientScreen />} />
                <Route path='/quote' element={<QuoteScreen />} />
                <Route path='/task' element={<TaskScreen />} />
                <Route path='/documentation' element={<DocumentationScreen />} />
                <Route path='/calendar' element={<CalendarScreen />} />
                <Route path='/insigths' element={<InsigthsScreen />} />
                {/* <ClientsScreen /> */}
                {/* <EditablePage /> */}
              </Routes>
            </Layout>
          )}




      </>
    </BrowserRouter>
  )
}

export default App
