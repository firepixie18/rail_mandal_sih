import React, { useState } from "react";
 // Replace with your actual import
import { Upload, AlertCircle, CheckCircle } from "lucide-react";

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
    } else {
      setFile(null);
      setFileName("");
      setFileTypeError("Invalid file type. Please upload an image, audio, or video file.");
    }
  };

  const upload = () => {
    if (!file) {
      setUploadStatus("error");
      return;
    }

    // Simulating upload process
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("success");
      setFileName("");
      setFile(null);
    }, 2000);
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
            accept="image/jpeg, image/png, audio/mpeg, video/mp4"
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
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
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
        disabled={uploadStatus === "uploading"}
      >
        {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
      </button>
      {uploadStatus === "success" && (
        <Alert className="mt-2">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>File uploaded successfully!</AlertDescription>
        </Alert>
      )}
      {uploadStatus === "error" && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please select a file before uploading.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;
