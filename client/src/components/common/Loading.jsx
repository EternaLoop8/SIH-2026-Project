const Loading = () => {
  return (
    <div className="min-h-100 w-full flex flex-col justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">
        Mapping paths and preparing viewpoints...
      </p>
    </div>
  );
};

export default Loading;
