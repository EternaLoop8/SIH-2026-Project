const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 text-center">
      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
        404 Error
      </p>
      <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-2 text-base text-gray-500 max-w-md">
        Sorry, we couldn’t find the page you’re looking for. Perhaps the
        destination has shifted.
      </p>
      <div className="mt-6">
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
