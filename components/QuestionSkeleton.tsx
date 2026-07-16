export default function QuestionSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 animate-pulse">
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-16 rounded-full bg-gray-200" />
        <div className="h-4 w-3/4 rounded-full bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-4 w-12 rounded-full bg-gray-200" />
          <div className="h-4 w-16 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-9 rounded-md bg-gray-200" />
        <div className="h-9 w-9 rounded-md bg-gray-200" />
      </div>
    </div>
  )
}