export default function Spinner({ color = 'border-blue-500' }: { color?: string }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`} />
    </div>
  )
}
