import React, { useState } from "react";
import { Upload } from "lucide-react";
import Alert, { AlertDescription } from './Alert'; // Update the import path as needed
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileTypeError, setFileTypeError] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);

  const validFileTypes = ["image/jpeg", "image/png", "audio/mpeg", "video/mp4"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileTypeError("");
      setUploadStatus(null);
    } else {
      setFile(null);
      setFileName("");
      setFileTypeError("Invalid file type. Please upload an image, audio, or video file.");
      setUploadStatus(null);
    }
  };

  const upload = async () => {
    if (!file) {
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");

    try {
      const response = await uploadFileToRoboflow(file);
      console.log("Upload successful:", response);
      setUploadStatus("success");
      setFileName("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">File Upload</h2>
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition duration-500 ease-in-out"
        >
          <Upload className="w-8 h-8" />
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {fileName && (
        <p className="text-sm text-gray-600 mb-2">
          <strong>Selected File:</strong> {fileName}
        </p>
      )}
      {fileTypeError && (
        <Alert variant="error" className="mb-2">
          <AlertDescription>{fileTypeError}</AlertDescription>
        </Alert>
      )}
      <button
        type="button"
        onClick={upload}
        className={`w-full py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
          uploadStatus === "uploading"
            ? "bg-gray-800 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800 focus:ring-black"
        }`}
        disabled={uploadStatus === "uploading" || !file}
      >
        {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
      </button>
      {uploadStatus === "success" && (
        <Alert variant="success" className="mt-2">
          <AlertDescription>File uploaded successfully!</AlertDescription>
        </Alert>
      )}
      {uploadStatus === "error" && (
        <Alert variant="error" className="mt-2">
          <AlertDescription>Upload failed. Please try again.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;