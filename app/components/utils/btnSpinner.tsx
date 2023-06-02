export default function BtnSppiner({
  color = "border-blue-500",
}: {
  color?: string;
}) {
  return (
    <div className="flex justify-center">
      <div
        className={`w-5 h-5 animate-spin rounded-full border-4 ${color} border-t-transparent`}
      />
    </div>
  );
}
