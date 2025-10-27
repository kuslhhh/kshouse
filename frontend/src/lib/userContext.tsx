import type { StreamVideoClient } from "@stream-io/video-react-sdk";
import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
   username: string;
   name: string;
}

interface UserContextProps {
   user: User | null,
   setUser: (user: User | null) => void,
   client: StreamVideoClient | undefined;
   setClient: (client: StreamVideoClient | undefined) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

interface UserProviderProps {
   children: ReactNode,
}

export const UserProvider = (props: UserProviderProps) => {

   const [user, setUser] = useState<User | null>(null)
   const [client, setClient] = useState<StreamVideoClient>()

   return <UserContext.Provider value={{ client, setClient, user, setUser }}>
      {props.children}
   </UserContext.Provider>
}

export const useUser = () => {
   const context = useContext(UserContext)

   if (!context) {
      throw new Error("useUser must be within a provider")
   }

   return context;
}