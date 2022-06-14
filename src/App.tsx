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
import QuotationsScreen from './Screens/Hardware/QuotationsScreen'
import { useSelector } from 'react-redux'
import AdminRoute from './components/AdminRoute'
import AccountsScreen from './Screens/Management/AccountsScreen'

function App() {
  
  
  const adminSignin = useSelector((state:any) => state.adminSignin);
  const {adminInfo, loading, error} = adminSignin;
  
  return (
    <BrowserRouter>
      <>  
              <Routes>

                <Route path='/' element={<AdminRoute><Layout><HomeScreen /></Layout></AdminRoute>} />
                <Route path='/signin' element={<SigninScreen />} />
                <Route path='/clients' element={<AdminRoute><Layout><ClientsScreen /></Layout></AdminRoute>} />
                <Route path='/employes' element={<AdminRoute><Layout><EmployesScreen /></Layout></AdminRoute>} />
                <Route path='/create-post-hardware' element={<AdminRoute><Layout><CreatePostScreen /></Layout></AdminRoute>} />
                <Route path='/brands' element={<AdminRoute><Layout><BrandsScreen /></Layout></AdminRoute>} />
                <Route path='/categories' element={<AdminRoute><Layout><CategoriesScreen /></Layout></AdminRoute>} />
                <Route path='/games' element={<AdminRoute><Layout><GamesScreen /></Layout></AdminRoute>} />
                <Route path='/programs' element={<AdminRoute><Layout><ProgramsScreen /></Layout></AdminRoute>} />
                <Route path='/computers' element={<AdminRoute><Layout><ComputersScreen /></Layout></AdminRoute>} />
                <Route path='/create-computer' element={<AdminRoute><Layout><CreateComputerScreen /></Layout></AdminRoute>} />
                <Route path='/products' element={<AdminRoute><Layout><ProductsScreen /></Layout></AdminRoute>} />
                <Route path='/create-product' element={<AdminRoute><Layout><CreateProductScreen /></Layout></AdminRoute>} />
                <Route path='/create-client' element={<AdminRoute><Layout><CreateClientScreen /></Layout></AdminRoute>} />
                <Route path='/quote' element={<AdminRoute><Layout><QuoteScreen /></Layout></AdminRoute>} />
                <Route path='/quotations' element={<AdminRoute><Layout><QuotationsScreen /></Layout></AdminRoute>} />
                
            
                <Route path='/task' element={<AdminRoute><Layout><TaskScreen /> </Layout></AdminRoute>} />
                <Route path='/documentation' element={<AdminRoute><Layout><DocumentationScreen /></Layout></AdminRoute>} />
                <Route path='/calendar' element={<AdminRoute><Layout><CalendarScreen /></Layout></AdminRoute>} />
                <Route path='/insigths' element={<AdminRoute><Layout><InsigthsScreen /></Layout></AdminRoute>} />
                <Route path='/accounts' element={<AdminRoute><Layout><AccountsScreen /></Layout></AdminRoute>} />
              
              </Routes>
            
          



      </>
    </BrowserRouter>
  )
}

export default App
