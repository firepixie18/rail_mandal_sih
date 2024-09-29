// import React, { useState } from "react";
// import { Upload } from "lucide-react";
// import Alert, { AlertDescription } from './Alert'; // Update the import path as needed
// import axios from "axios";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [fileTypeError, setFileTypeError] = useState("");
//   const [uploadStatus, setUploadStatus] = useState(null);

//   const validFileTypes = ["image/jpeg", "image/png", "audio/mpeg", "video/mp4"];

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && validFileTypes.includes(selectedFile.type)) {
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//       setFileTypeError("");
//       setUploadStatus(null);
//     } else {
//       setFile(null);
//       setFileName("");
//       setFileTypeError("Invalid file type. Please upload an image, audio, or video file.");
//       setUploadStatus(null);
//     }
//   };

//   const upload = async () => {
//     if (!file) {
//       setUploadStatus("error");
//       return;
//     }

//     setUploadStatus("uploading");

//     try {
//       const response = await uploadFileToRoboflow(file);
//       console.log("Upload successful:", response);
//       setUploadStatus("success");
//       setFileName("");
//       setFile(null);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus("error");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">File Upload</h2>
//       <div className="mb-4">
//         <label
//           htmlFor="file-upload"
//           className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition duration-500 ease-in-out"
//         >
//           <Upload className="w-8 h-8" />
//           <span className="mt-2 text-base leading-normal">Select a file</span>
//           <input
//             id="file-upload"
//             type="file"
//             className="hidden"
//             accept="image/jpeg, image/png"
//             onChange={handleFileChange}
//           />
//         </label>
//       </div>
//       {fileName && (
//         <p className="text-sm text-gray-600 mb-2">
//           <strong>Selected File:</strong> {fileName}
//         </p>
//       )}
//       {fileTypeError && (
//         <Alert variant="error" className="mb-2">
//           <AlertDescription>{fileTypeError}</AlertDescription>
//         </Alert>
//       )}
//       <button
//         type="button"
//         onClick={upload}
//         className={`w-full py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
//           uploadStatus === "uploading"
//             ? "bg-gray-800 text-white cursor-not-allowed"
//             : "bg-black text-white hover:bg-gray-800 focus:ring-black"
//         }`}
//         disabled={uploadStatus === "uploading" || !file}
//       >
//         {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
//       </button>
//       {uploadStatus === "success" && (
//         <Alert variant="success" className="mt-2">
//           <AlertDescription>File uploaded successfully!</AlertDescription>
//         </Alert>
//       )}
//       {uploadStatus === "error" && (
//         <Alert variant="error" className="mt-2">
//           <AlertDescription>Upload failed. Please try again.</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import Alert, { AlertDescription } from './Alert';

const FileUpload = ({ label, uploadUrl, onFileUploadSuccess }) => {
  const [pnrFile, setPnrFile] = useState(null);
  const [additionalFile, setAdditionalFile] = useState(null);
  const [additionalFileName, setAdditionalFileName] = useState("");
  const [fileTypeError, setFileTypeError] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [departmentNotified, setDepartmentNotified] = useState("");

  const validFileTypes = ["image/jpeg", "image/png"];

  // Handle PNR file selection
  const handlePnrFileChange = (e) => {
    setPnrFile(e.target.files[0]);
  };

  // Handle additional file selection
  const handleAdditionalFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setAdditionalFile(selectedFile);
      setAdditionalFileName(selectedFile.name);
      setUploadStatus(null);
      setFileTypeError("");
      setDepartmentNotified("");
    } else {
      setAdditionalFile(null);
      setAdditionalFileName("");
      setFileTypeError("Invalid file type. Please upload an image (JPEG or PNG).");
      setUploadStatus(null);
      setDepartmentNotified("");
    }
  };

  // Handle PNR file upload
  const handlePnrFileUpload = async () => {
    if (!pnrFile) {
      alert("Please select a PNR file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", pnrFile);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.PNR) {
        onFileUploadSuccess(response.data.PNR);
      } else {
        alert("No PNR found in the uploaded document.");
      }
    } catch (error) {
      console.error("Error uploading the PNR file: ", error);
      alert("PNR file upload failed.");
    }
  };

  // Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload to Roboflow
  const uploadToRoboflow = async (base64Image) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/railway-madan-sih/2",
        params: {
          api_key: "BhDw1Gy7Gk2kWEe9UpPw",
        },
        data: base64Image.split(",")[1],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Map prediction classes to departments
  const mapClassesToDepartments = (predictions) => {
    const classToDepartmentMap = {
      clean_toilets: "Sanitation",
      garbage: "Sanitation",
      broken_unclean: "Maintenance",
      damage: "Maintenance",
      catering: "Catering",
      behaviour: "Customer Service",
      handicapped: "Divyang Facilities",
      non_damage: "Maintenance",
    };

    const departments = new Set();
    predictions.forEach((prediction) => {
      const department = classToDepartmentMap[prediction.class];
      if (department) {
        departments.add(department);
      }
    });

    return Array.from(departments);
  };

  // Update department based on predictions
  const onDepartmentUpdate = (predictions) => {
    if (predictions && predictions.length > 0) {
      const departments = mapClassesToDepartments(predictions);
      if (departments.length > 0) {
        setDepartmentNotified(departments.join(", "));
      } else {
        setDepartmentNotified("No department notified");
      }
    } else {
      setDepartmentNotified("Miscellaneous Complaints");
    }
  };

  // Handle additional file upload
  const handleAdditionalFileUpload = async () => {
    if (!additionalFile) {
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");

    try {
      const base64Image = await convertToBase64(additionalFile);
      const response = await uploadToRoboflow(base64Image);
      console.log("Upload successful:", response);

      onDepartmentUpdate(response.predictions);

      setUploadStatus("success");
      setAdditionalFileName("");
      setAdditionalFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">File Upload</h2>

      {/* PNR File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input type="file" onChange={handlePnrFileChange} className="mt-2" />
        <button
          onClick={handlePnrFileUpload}
          className="w-full bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition-colors mt-2"
        >
          Upload PNR
        </button>
      </div>

      {/* Additional File Upload */}
      <div className="mb-4">
        <label
          htmlFor="additional-file-upload"
          className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition duration-500 ease-in-out"
        >
          <Upload className="w-8 h-8" />
          <span className="mt-2 text-base leading-normal">Select additional file</span>
          <input
            id="additional-file-upload"
            type="file"
            className="hidden"
            accept="image/jpeg, image/png"
            onChange={handleAdditionalFileChange}
          />
        </label>
      </div>

      {additionalFileName && (
        <p className="text-sm text-gray-600 mb-2">
          <strong>Selected File:</strong> {additionalFileName}
        </p>
      )}

      {fileTypeError && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{fileTypeError}</AlertDescription>
        </Alert>
      )}

      <button
        type="button"
        onClick={handleAdditionalFileUpload}
        className={`w-full py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
          uploadStatus === "uploading"
            ? "bg-gray-800 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800 focus:ring-black"
        }`}
        disabled={uploadStatus === "uploading" || !additionalFile}
      >
        {uploadStatus === "uploading" ? "Uploading..." : "Upload Additional"}
      </button>

      {uploadStatus === "success" && (
        <Alert className="mt-2">
          <AlertDescription>File uploaded successfully!</AlertDescription>
        </Alert>
      )}

      {uploadStatus === "error" && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>Upload failed. Please try again.</AlertDescription>
        </Alert>
      )}

      {departmentNotified && (
        <div className="mt-4 p-4 bg-green-100 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Department Notified:</h3>
          <p className="text-sm text-gray-800">{departmentNotified}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;