import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContracts } from "../context/ContractsContext";

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchContractDetails } = useContracts();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const loadContract = async () => {
      try {
        setLoading(true);
        const data = await fetchContractDetails(id);
        if (data) {
          setContract(data);
        } else {
          setError("Contract not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContract();
  }, [id, fetchContractDetails]);

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Renewal Due":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <div className="flex">
            <span className="mr-2">⚠️</span>
            <div>
              <h3 className="font-medium">Error loading contract</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-500"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <span className="text-4xl">📄</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Contract not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The contract you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:text-blue-500"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 hover:text-blue-500 mb-4"
        >
          ← Back to Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {contract.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{contract.parties}</p>
          </div>
          <button
            onClick={() => setShowEvidence(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            📋 View Evidence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Metadata */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Contract Details
            </h2>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Start Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{contract.start}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Expiry Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {contract.expiry}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      contract.status
                    )}`}
                  >
                    {contract.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Risk Score
                </dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(
                      contract.risk
                    )}`}
                  >
                    {contract.risk}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Clauses Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Key Clauses
            </h2>
            <div className="space-y-4">
              {contract.clauses?.map((clause, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {clause.title}
                    </h3>
                    <span
                      className={`text-sm font-medium ${getConfidenceColor(
                        clause.confidence
                      )}`}
                    >
                      {Math.round(clause.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{clause.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              AI Insights
            </h2>
            <div className="space-y-3">
              {contract.insights?.map((insight, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-3 ${getRiskColor(
                    insight.risk
                  )}`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {insight.risk} Risk
                    </span>
                  </div>
                  <p className="text-sm">{insight.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                📄 Download PDF
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                📧 Send Reminder
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                📝 Add Note
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                🔄 Request Renewal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Panel */}
      {showEvidence && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Evidence & Sources
              </h3>
              <button
                onClick={() => setShowEvidence(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contract.evidence?.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600">
                      {item.source}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round(item.relevance * 100)}% relevance
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded italic">
                    "{item.snippet}"
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowEvidence(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;
