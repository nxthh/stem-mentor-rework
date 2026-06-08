export default function CourseDetailsSkeleton() {
  return (
    <div className="p-4 sm:p-6 container mx-auto animate-pulse">
      {/* Header */}
      <div className="bg-gray-200 dark:bg-darksecbg rounded-md flex flex-wrap justify-between md:flex-2 gap-15 p-4 sm:p-6 items-center">
        <div className="max-w-sm space-y-4">
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-gray-400 dark:bg-gray-700 rounded mt-5"></div>
        </div>
        <div className="w-full lg:w-1/3 h-60 lg:h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mt-4">
        <div className="bg-gray-200 dark:bg-darksecbg rounded-md lg:col-span-3 p-4 sm:p-6 space-y-4">
          <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-2 bg-gray-200 dark:bg-darksecbg rounded-md p-4 sm:p-6 space-y-3">
          <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
