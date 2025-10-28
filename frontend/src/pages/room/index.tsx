import { useCallStateHooks } from "@stream-io/video-react-sdk"

export default function Room() {

   const {
      useCallCustomData,
      useParticipants,
      useCallCreatedBy
   } = useCallStateHooks()

   const custom = useCallCustomData()
   const Participants = useParticipants()
   const createdBy = useCallCreatedBy()


   return (
      <div>
         <h2>
            {custom?.title ?? "Title"}
         </h2>
         <h3>
            {custom?.description ?? "Description"}
         </h3>
         <p>
            {Participants.length} Participants
         </p>
      </div>
   )
}
