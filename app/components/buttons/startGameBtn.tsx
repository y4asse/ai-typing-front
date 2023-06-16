'use client'

const StartGameBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="cursor-pointer text-center w-full  border-black border-4 rounded-xl py-8 hover:bg-black hover:text-white duration-200 transition-all text-2xl font-bold shadow-xl  tracking-widest"
      onClick={handleClick}
    >
      スタート
    </div>
  )
}

export default StartGameBtn
