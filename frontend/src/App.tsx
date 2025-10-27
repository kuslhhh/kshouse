import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Main from "./pages/main"
import SignIn from "./pages/signin"
import Room from "./pages/room"
import Error from "./pages/error"

export default function App() {
   return (
      <>
         <div className="bg-dark text-light items-center justify-center flex min-h-screen">
            <Router>
               <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/room" element={<Room />} />
                  <Route path="/*" element={<Error />} />
               </Routes>
            </Router>
         </div>
      </>
   )
}
