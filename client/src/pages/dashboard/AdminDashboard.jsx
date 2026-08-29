const AdminDashboard = () => {
  const stats = [
    { name: "Total Users", value: "1,240" },
    { name: "Verified Businesses", value: "84" },
    { name: "Flagged Content", value: "0" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            System Administration
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Platform management, validation pipelines, and security controls.
          </p>
        </div>
        <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-md font-semibold tracking-wider uppercase">
          Live System
        </span>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{s.name}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Pending Approvals
          </h3>
          <p className="text-sm text-gray-500 py-4 text-center bg-gray-50 rounded-lg border border-gray-100">
            All vendor registrations have been cataloged and processed.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            System Alerts & Logs
          </h3>
          <div className="space-y-3">
            <div className="text-xs p-3 bg-blue-50 border border-blue-100 rounded text-blue-700 flex justify-between">
              <span>System Backup Successful</span>
              <span className="font-mono">Just Now</span>
            </div>
            <div className="text-xs p-3 bg-gray-50 border border-gray-200 rounded text-gray-600 flex justify-between">
              <span>Database Optimization Pipeline Run</span>
              <span className="font-mono">2 hrs ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
