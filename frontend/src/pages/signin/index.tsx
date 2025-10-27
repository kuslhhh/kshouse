import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Cookies from "universal-cookie"
import { StreamVideoClient, type User } from "@stream-io/video-react-sdk"
import * as yup from "yup"
import { useUser } from '@/lib/userContext'
import { useNavigate } from 'react-router-dom'

interface FormValues {
   username: string;
   name: string;
}

export default function SignIn() {

   const cookie = new Cookies()
   const { setClient, setUser } = useUser()
   const navigate = useNavigate()

   const schema = yup.object().shape({
      username: yup.string().required("Username is required").matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid Username"),
      name: yup.string().required("Name is required")
   })

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<FormValues>({ resolver: yupResolver(schema) })

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      const { name, username } = data
      const image = `https://avatar.vercel.sh/${encodeURIComponent(username)}.svg`;


      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signin`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            username,
            name,
            image
         })
      });

      if (!response) {
         alert("Some error occured while sign in ")
      }

      const responseData = await response.json()

      const user: User = {
         id: username,
         name: name
      }

      const myClient = new StreamVideoClient({
         apiKey: import.meta.env.VITE_API_KEY,
         user,
         token: responseData.token
      })

      setClient(myClient)
      setUser({ username, name })

      const expires = new Date
      expires.setDate(expires.getDate() + 1)
      cookie.set("token", responseData.token, {
         expires,
      })
      cookie.set("username", responseData.username, {
         expires,
      })
      cookie.set("name", responseData.name, {
         expires,
      })

      navigate("/")
   }

   return (
      <>
         <div className=''>
            <Card className="w-80 h-full max-w-sm" >
               <CardHeader>
                  <CardTitle>Welcome to KSH house</CardTitle>
                  <CardDescription>
                     Sign In to your account
                  </CardDescription>
                  <CardAction>
                     <Button variant="link">Sign In</Button>
                  </CardAction>
               </CardHeader>

               <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                     <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                           <Label htmlFor="Username">Username</Label>
                           <Input
                              id="username"
                              type="text"
                              placeholder="John_18"
                              {...register("username")}
                           />
                           {errors.username && (
                              <p className='text-red-500 text-sm'>
                                 {errors.username.message}
                              </p>
                           )}
                        </div>
                        <div className="grid gap-2">
                           <div className="flex items-center">
                              <Label htmlFor="name">Name</Label>
                           </div>
                           <Input
                              id='name'
                              type='text'
                              placeholder='John Doe'
                              {...register("name")}
                           />
                           {errors.name && (
                              <p className='text-red-500 text-sm'>
                                 {errors.name.message}
                              </p>
                           )}
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 pt-6">
                     <Button type="submit" className="w-full">
                        Login
                     </Button>
                  </CardFooter>
               </form>
            </Card>
         </div>
      </>
   )
}


