import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { useUser } from "@/lib/userContext";
import { StreamVideo } from "@stream-io/video-react-sdk";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import CryptoJS from "crypto-js"

interface NewRoom {
   name: string;
   description: string;
}

export default function Main() {

   const { client, user, setCall } = useUser()
   const [newRoom, SetNewRoom] = useState<NewRoom>({ name: "", description: "" })

   const navigate = useNavigate()

   const hashRoomname = (roomName: string): string => {
      const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
      return hash.replace(/[^a-zA-z0-9_-]/g, "")
   }

   if (!client) {
      return <Navigate to="/signin" />
   }

   const createRoom = async () => {
      const { name, description } = newRoom
      if (!client || !user || !name || !description) {
         return
      }

      const call = client.call("audio_room", hashRoomname(name))
      await call.join({
         create: true,
         data: {
            members: [{ user_id: user.username }],
            custom: {
               title: name,
               description,
            }
         }
      })
      setCall(call)
      navigate("/room")
   }
   return (
      <StreamVideo client={client}>

         <div>
            <Card className="w-80 h-full max-w-sm" >
               <CardHeader>
                  <CardTitle>Welcome, {user?.name}</CardTitle>
                  <CardDescription>
                     Create your own Room
                  </CardDescription>
                  <CardAction>
                     {/* <Button variant="link">Room</Button> */}
                  </CardAction>
               </CardHeader>

               <form onSubmit={createRoom}>
                  <CardContent>
                     <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                           <Label htmlFor="Username">Room Name</Label>
                           <Input
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetNewRoom((prev) => ({ ...prev, name: event.target.value }))}
                              type="text"
                           />
                        </div>
                        <div className="grid gap-2">
                           <div className="flex items-center">
                              <Label htmlFor="name">Room Description</Label>
                           </div>
                           <Input
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetNewRoom((prev) => ({ ...prev, description: event.target.value }))}

                              type='text'
                           />
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 pt-6">
                     <Button type="submit" className="w-full">
                        Create Room
                     </Button>
                  </CardFooter>
               </form>
            </Card>
         </div>
      </StreamVideo>
   )
}
