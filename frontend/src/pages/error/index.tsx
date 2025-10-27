
export default function Error() {
   return (
      <div className='min-h-screen flex-col items-center gap-3 justify-center flex '>
         <h1 className='text-3xl font-medium text-white '>
            404. Page not found.
         </h1>
         <p className='font-medium '>
            Go to {" "}
            <a
               className='underline  text-xl text-orange-500'
               href="/"
            >Home</a>{" "}
            Page
         </p>
      </div>
   )
}
