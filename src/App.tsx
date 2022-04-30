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

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
        <Layout>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/clients' element={<ClientsScreen />} />
            <Route path='/employes' element={<EmployesScreen />} />
            <Route path='/brands' element={<BrandsScreen />} />
            <Route path='/categories' element={<CategoriesScreen />} />
            <Route path='/products' element={<ProductsScreen />} />
            <Route path='/create-product' element={<CreateProductScreen />} />  
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
