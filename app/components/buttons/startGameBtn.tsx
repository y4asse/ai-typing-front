'use client'

const StartGameBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="cursor-pointer text-center w-full  border border-gray-500 shadow-btn bg-btn hover:bg-btnHover hover:shadow-btnHover hover:text-gray-800  rounded-xl py-8   duration-200 transition-all text-2xl font-semibold   tracking-widest hover:scale-95"
      onClick={handleClick}
    >
      スタート
    </div>
  )
}

export default StartGameBtn
