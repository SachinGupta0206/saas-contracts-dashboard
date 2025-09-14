import React, { useState, useRef } from "react";
import { useContracts } from "../context/ContractsContext";

const UploadModal = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const { uploadFiles, uploading, uploadedFiles, clearUploadedFiles } =
    useContracts();
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    // Filter for document files
    const validFiles = files.filter((file) => {
      const validTypes = [".pdf", ".doc", ".docx", ".txt"];
      return validTypes.some((type) => file.name.toLowerCase().endsWith(type));
    });

    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "uploading":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "📄";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "uploading":
        return "Uploading...";
      case "success":
        return "Upload successful";
      case "error":
        return "Upload failed";
      default:
        return "Pending";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleClose = () => {
    clearUploadedFiles();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Upload Contracts
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Upload Area */}
        <div className="mb-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.txt"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="text-center">
              <span className="text-4xl mb-4 block">📁</span>
              <div className="text-sm text-gray-600">
                <button
                  onClick={onButtonClick}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Click to upload
                </button>
                <span> or drag and drop</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PDF, DOC, DOCX, TXT files only
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Uploaded Files
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {getStatusIcon(file.status)}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {getStatusText(file.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {uploadedFiles.length > 0 ? "Done" : "Cancel"}
          </button>
          {uploadedFiles.length === 0 && (
            <button
              onClick={onButtonClick}
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Select Files"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
