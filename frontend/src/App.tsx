import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface FormValues {
   username: string;
   name: string;
}

export default function App() {

   const schema = yup.object().shape({
      username: yup.string().required("Username is required").matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid Username"),
      name: yup.string().required("Name is required")
   })

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<FormValues>({ resolver: yupResolver(schema) })

   const onSubmit: SubmitHandler<FormValues> = (data, event) => {
      event?.preventDefault()
      const { name, username } = data

      console.log(name, username);
   }

   return (
      <>
         <div className='min-h-screen items-center justify-center flex bg-dark text-light'>
            <Card className="w-full max-w-sm" >
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
                  <CardFooter className="flex-col gap-2 pt-5">
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


