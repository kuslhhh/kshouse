import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import MainPage from "./pages/main"
import SignIn from "./pages/sign-in"
import RoomPage from "./pages/room"

function App() {

   return (
      <>
         <div className=" bg-[#181818] text-[#808080] text-3xl min-h-screen justify-center items-center flex">
            <Router>
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/room" element={<RoomPage />} />
               </Routes>
            </Router>
         </div>
      </>
   )
}

export default App
