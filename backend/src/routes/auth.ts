import { Router } from "express";
import type { Request, Response } from "express";
import { client } from "../streamClient";
import type { UserRequest } from "@stream-io/node-sdk";

const router = Router()

router.post("/signin", async (req: Request, res: Response) => {
   const { username, name, image } = req.body;

   if (!username || !name || !image) {
      return res.status(400).json({ message: "Required fields were empty" })
   }

   const newUser: UserRequest = {
      id: username,
      role: "user",
      name: name,
      image: image
   }

   await client.upsertUsers([newUser])

   const expiry: number = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

   const token = client.createToken(username, expiry)
   return res.status(200).json({ token, username, name, image })

})

export default router;

