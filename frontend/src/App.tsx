import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Main from "./pages/main"
import SignIn from "./pages/signin"
import Room from "./pages/room"
import Error from "./pages/error"
import { StreamCall } from "@stream-io/video-react-sdk"
import { useUser } from "./lib/userContext"

export default function App() {

   const { call } = useUser()

   return (
      <>
         <div className="bg-dark text-light items-center justify-center flex min-h-screen">
            <Router>
               <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/room" element={
                     call ?
                        <StreamCall call={call}>
                           <Room />
                        </StreamCall> : <Navigate to={"/main"} />
                  } />
                  <Route path="/*" element={<Error />} />
               </Routes>
            </Router>
         </div>
      </>
   )
}
