import React from "react";

const Settings = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <span className="text-6xl">⚙️</span>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure your account and application preferences.
        </p>
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-sm text-gray-500">
            This section will include user preferences, notification settings,
            and system configuration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
