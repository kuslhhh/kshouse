import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function SignIn() {
   return (
      <div >
         <h1>Welcome to KSH house of audio chats</h1>
         <form>
            <div className="flex flex-col">
               <label>Username: </label>
               <input type="text" />
            </div>
            <div>
               <label>Password: </label>
               <input type="text" />
            </div>
            <button type="submit">Sign In</button>
         </form>
      </div>
   )
}
