import React from "react";

const Reports = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <span className="text-6xl">📊</span>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">
          Generate and view detailed reports about your contract portfolio.
        </p>
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-sm text-gray-500">
            This section will include contract reports, compliance summaries,
            and export functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
