import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProductPage from "./pages/ProductPage"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage"
import { useThemeStore } from "./store/useThemeStore"


function App() {
const theme = useThemeStore((state) => state.theme);

 return (
    <div className="min-h-screen transition-colors duration-300 bg-base-200" data-theme={theme}>
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:id" element={<ProductPage/>} />
    </Routes>

    <Toaster />
  </div>
 )
  
}

export default App
