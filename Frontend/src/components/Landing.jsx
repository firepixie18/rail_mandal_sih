// import React, { useState, useEffect } from 'react';
// import { Star, Train, CheckCircle, Clock, AlertCircle, MessageCircle, X } from 'lucide-react';

// const ComplaintStatusPage = () => {
//   const [rating, setRating] = useState(0);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const [showPNR, setShowPNR] = useState(false);

//   // Mock data - replace with actual data in a real application
//   const complaintData = {
//     pnr: "PNR123456",
//     status: "In Progress",
//     submissionDate: "2024-09-15",
//     summary: "Delay in train arrival at destination"
//   };

//   const getStatusInfo = (status) => {
//     switch (status) {
//       case "Resolved":
//         return { color: "bg-green-500", icon: CheckCircle, text: "text-green-600", progress: 100 };
//       case "In Progress":
//         return { color: "bg-yellow-500", icon: Clock, text: "text-yellow-600", progress: 50 };
//       case "Pending":
//         return { color: "bg-red-500", icon: AlertCircle, text: "text-red-600", progress: 25 };
//       default:
//         return { color: "bg-gray-500", icon: AlertCircle, text: "text-gray-600", progress: 0 };
//     }
//   };

//   const statusInfo = getStatusInfo(complaintData.status);

//   useEffect(() => {
//     setIsLoading(true);
//     setLoadProgress(0);
//     const interval = setInterval(() => {
//       setLoadProgress(prev => {
//         if (prev >= statusInfo.progress) {
//           clearInterval(interval);
//           setIsLoading(false);
//           return statusInfo.progress;
//         }
//         return prev + 1;
//       });
//     }, 20);

//     // Trigger PNR animation after a short delay
//     const timer = setTimeout(() => setShowPNR(true), 500);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timer);
//     };
//   }, [statusInfo.progress]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-5 shadow-lg">
//         <div className="container mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Train size={36} className="animate-bounce" />
//             <h1 className="text-3xl font-extrabold tracking-wide">Rail Grievance Portal</h1>
//           </div>
//           <nav>
//             <ul className="flex space-x-6">
//               <li><a href="#" className="hover:text-blue-200 transition-colors duration-300">Home</a></li>
//               <li><a href="#" className="hover:text-blue-200 transition-colors duration-300">About</a></li>
//               <li><a href="#" className="hover:text-blue-200 transition-colors duration-300">Contact</a></li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-10">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
//           {/* Hero Section */}
//           <div className="relative h-48 bg-gradient-to-r from-blue-700 to-blue-800">
//             <img src="/api/placeholder/800/200" alt="Train" className="w-full h-full object-cover opacity-20" />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <h2 className="text-5xl font-extrabold text-white animate-fadeIn">Complaint Status</h2>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-10">
//             <p className="text-xl text-center text-gray-700 mb-10 font-light">Track Your Complaint Status Effortlessly</p>

//             {/* PNR Box with Animation */}
//             <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-1 shadow-lg mb-8">
//               <div className="relative bg-white rounded-lg p-6">
//                 <p className="text-lg font-semibold text-center text-gray-700">PNR Number</p>
//                 <div className="h-16 flex items-center justify-center overflow-hidden">
//                   <p 
//                     className={`text-4xl font-extrabold text-center text-blue-900 tracking-wide transition-all duration-1000 ease-out ${
//                       showPNR ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
//                     }`}
//                   >
//                     {complaintData.pnr}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Status Box with Progress Animation */}
//             <div className="relative mb-10 overflow-hidden">
//               <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-2xl font-bold text-gray-800">Complaint Status</h3>
//                   <div className={${statusInfo.color} p-3 rounded-full transition-transform duration-500 transform hover:scale-110}>
//                     <statusInfo.icon size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className={text-2xl font-bold ${statusInfo.text}}>
//                     {complaintData.status}
//                   </div>
//                   <div className="flex-grow h-3 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className={h-full ${statusInfo.color} transition-all duration-500 ease-out}
//                       style={{ width: ${loadProgress}% }}
//                     ></div>
//                   </div>
//                 </div>
//                 {isLoading && (
//                   <div className="mt-2 text-sm text-gray-500 animate-pulse">
//                     Updating status...
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Complaint Details */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <h3 className="text-2xl font-semibold mb-4 text-gray-800">Complaint Details</h3>
//               <p className="mb-2"><strong>Submitted on:</strong> {complaintData.submissionDate}</p>
//               <p><strong>Summary:</strong> {complaintData.summary}</p>
//             </div>

//             {/* Rating Section */}
//             <div className="text-center mb-8">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">Rate your experience</h3>
//               <div className="flex justify-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={36}
//                     fill={star <= rating ? "#FFC107" : "none"}
//                     stroke={star <= rating ? "#FFC107" : "currentColor"}
//                     className="cursor-pointer transition-all duration-300 hover:scale-110"
//                     onClick={() => setRating(star)}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-center space-x-4">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
//                 New Complaint
//               </button>
//               <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
//                 Home
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 Railway Grievance Portal. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* Chat Button */}
//       <button
//         onClick={() => setIsChatOpen(true)}
//         className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110"
//       >
//         <MessageCircle size={24} />
//       </button>

//       {/* Chat Window */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden animate-slideIn">
//           <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
//             <h3 className="font-bold">Customer Support</h3>
//             <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-blue-300">
//               <X size={24} />
//             </button>
//           </div>
//           <div className="h-64 p-4 overflow-y-auto">
//             <p className="text-gray-600">Welcome to Railway Grievance support. How may we assist you today?</p>
//           </div>
//           <div className="border-t p-4">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComplaintStatusPage;

import React, { useState, useEffect } from 'react';
import { Star, Train, CheckCircle, Clock, AlertCircle, MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePnr } from '../contexts/PnrContext.jsx';

const ComplaintStatusPage = () => {
  const [rating, setRating] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showPNR, setShowPNR] = useState(false);
    const navigate=useNavigate();
    const {pnrNumber}=usePnr();
  // Mock data - replace with actual data in a real application
  const complaintData = {
    pnr: pnrNumber,
    status: "In Progress",
    submissionDate: "2024-09-15",
    summary: "Delay in train arrival at destination"
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "Resolved":
        return { color: "bg-green-500", icon: CheckCircle, text: "text-green-600", progress: 100 };
      case "In Progress":
        return { color: "bg-yellow-500", icon: Clock, text: "text-yellow-600", progress: 50 };
      case "Pending":
        return { color: "bg-red-500", icon: AlertCircle, text: "text-red-600", progress: 25 };
      default:
        return { color: "bg-gray-500", icon: AlertCircle, text: "text-gray-600", progress: 0 };
    }
  };

  const statusInfo = getStatusInfo(complaintData.status);

  useEffect(() => {
    setIsLoading(true);
    setLoadProgress(0);
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= statusInfo.progress) {
          clearInterval(interval);
          setIsLoading(false);
          return statusInfo.progress;
        }
        return prev + 1;
      });
    }, 20);

    // Trigger PNR animation after a short delay
    const timer = setTimeout(() => setShowPNR(true), 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [statusInfo.progress]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-5 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Train size={36} className="animate-bounce" />
            <h1 className="text-3xl font-extrabold tracking-wide">Rail Grievance Portal</h1>
          </div>
          <nav>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-48 bg-gradient-to-r from-blue-700 to-blue-800">
            <img src="/api/placeholder/800/200" alt="Train" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-5xl font-extrabold text-white animate-fadeIn">Complaint Status</h2>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-10">
            <p className="text-xl text-center text-gray-700 mb-10 font-light">Track Your Complaint Status Effortlessly</p>

            {/* PNR Box with Animation */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-1 shadow-lg mb-8">
              <div className="relative bg-white rounded-lg p-6">
                <p className="text-lg font-semibold text-center text-gray-700">PNR Number</p>
                <div className="h-16 flex items-center justify-center overflow-hidden">
                  <p 
                    className={`text-4xl font-extrabold text-center text-blue-900 tracking-wide transition-all duration-1000 ease-out ${
                      showPNR ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                  >
                    {complaintData.pnr}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Box with Progress Animation */}
            <div className="relative mb-10 overflow-hidden">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Complaint Status</h3>
                  <div className={`${statusInfo.color} p-3 rounded-full transition-transform duration-500 transform hover:scale-110`}>
                    <statusInfo.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${statusInfo.text}`}>
                    {complaintData.status}
                  </div>
                  <div className="flex-grow h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${statusInfo.color} transition-all duration-500 ease-out`}
                      style={{ width: `${loadProgress}%` }}
                    ></div>
                  </div>
                </div>
                {isLoading && (
                  <div className="mt-2 text-sm text-gray-500 animate-pulse">
                    Updating status...
                  </div>
                )}
              </div>
            </div>

            {/* Complaint Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Complaint Details</h3>
              <p className="mb-2"><strong>Submitted on:</strong> {complaintData.submissionDate}</p>
              <p><strong>Summary:</strong> {complaintData.summary}</p>
            </div>

            {/* Rating Section */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Rate your experience</h3>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={36}
                    fill={star <= rating ? "#FFC107" : "none"}
                    stroke={star <= rating ? "#FFC107" : "currentColor"}
                    className="cursor-pointer transition-all duration-300 hover:scale-110"
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" onClick={()=>{navigate("/")}}>
                New Complaint
              </button>
              
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Railway Grievance Portal. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden animate-slideIn">
          <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Customer Support</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-blue-300">
                          <X size={24} />
            </button>
           </div>
           <div className="h-64 p-4 overflow-y-auto">
            <p className="text-gray-600">Welcome to Railway Grievance support. How may we assist you today?</p>
           </div>
           <div className="border-t p-4">
             <input
               type="text"
               placeholder="Type your message..."
               className="w-full border rounded-lg p-2"
             />
           </div>
         </div>
       )}
     </div>
   );
 };

export default ComplaintStatusPage;
