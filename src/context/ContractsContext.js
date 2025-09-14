import React, { createContext, useContext, useState } from "react";

const ContractsContext = createContext();

export const useContracts = () => {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error("useContracts must be used within a ContractsProvider");
  }
  return context;
};

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    risk: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchContracts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/contracts.json");
      if (!response.ok) {
        throw new Error("Failed to fetch contracts");
      }
      const data = await response.json();
      setContracts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContractDetails = async (id) => {
    try {
      const response = await fetch("/contract-details.json");
      if (!response.ok) {
        throw new Error("Failed to fetch contract details");
      }
      const data = await response.json();
      return data[id] || null;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      status: "uploading",
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload process
    for (let i = 0; i < newFiles.length; i++) {
      const fileId = newFiles[i].id;

      // Simulate upload time
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 + Math.random() * 3000)
      );

      // Simulate success/failure (90% success rate)
      const success = Math.random() > 0.1;

      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, status: success ? "success" : "error" }
            : file
        )
      );
    }

    setUploading(false);
  };

  const clearUploadedFiles = () => {
    setUploadedFiles([]);
  };

  const value = {
    contracts,
    loading,
    error,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    uploading,
    uploadedFiles,
    fetchContracts,
    fetchContractDetails,
    uploadFiles,
    clearUploadedFiles,
  };

  return (
    <ContractsContext.Provider value={value}>
      {children}
    </ContractsContext.Provider>
  );
};
