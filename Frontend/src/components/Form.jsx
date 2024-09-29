import React, { useContext, useState } from "react";
import axios from "axios"; // Make sure to import axios
import { Label } from "./ui/Label.jsx";
import { Input } from "./ui/Input.jsx";
import FileUpload from "./FileUpload.jsx";
import { useNavigate } from 'react-router-dom';
import { usePnr } from "../contexts/PnrContext.jsx";
import { Link } from "react-router-dom";

import TypebotComponent from "./Chatbot.jsx";
export function SignupFormDemo() {
  
  const { setPnrNumber } = usePnr();
  const [selectedType, setSelectedType] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [journeyDetails, setJourneyDetails] = useState("");
  const [pnrNumber, setLocalPnrNumber] = useState();
  const [grievanceDescription, setGrievanceDescription] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      contactNo:mobileNumber,
      journeyDetails,
      pnrNo:pnrNumber,
      grievanceDescription,
      incidentDate
    };

    const formData2 = {
      grievanceDescription,
    };

    try {
      const response1 = await axios.post('api/v1/add-consumer', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      

      console.log('Form submitted successfully:', response.data);
      
      // If you want to send formData2 as well:
      const response3 = await axios.post('https://rail-flash-model.onrender.com/predict', formData2, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Grievance description submitted successfully:', response2.data);
      
    } catch (error) {
      console.error('Error submitting grievance description:', error);
      // Handle error (e.g., show an error message)
    }
    navigate("/landing")
  };

  return (
    <>
    <div className="flex w-full">
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <div className="w-[1400] flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Grievance Details</h2>
          <p className="text-sm text-gray-600">*Mandatory Fields</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <LabelInputContainer>
              <Label htmlFor="mobilenumber" className="text-sm font-medium text-gray-700">Mobile Number*</Label>
              <Input
                id="mobilenumber"
                placeholder="Enter mobile number"
                type="tel"
                className="w-full border-gray-300 focus:border-black focus:ring-black"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </LabelInputContainer>
            
          </div>

          <LabelInputContainer>
            <Label htmlFor="journeyDetails" className="text-sm font-medium text-gray-700">Journey Details*</Label>
            <Input
              id="journeyDetails"
              placeholder="Enter journey details"
              type="text"
              className="border-gray-300 focus:border-black focus:ring-black"
              value={journeyDetails}
              onChange={(e) => setJourneyDetails(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="pnrnumber" className="text-sm font-medium text-gray-700">PNR Number*</Label>
            <Input
              id="pnrnumber"
              placeholder="Enter PNR number"
              type="text"
              className="border-gray-300 focus:border-black focus:ring-black"
              value={pnrNumber}
              onChange={(e) => {
                setLocalPnrNumber(e.target.value);
                setPnrNumber(e.target.value)
              }}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type*</Label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            >
              <option value="">Select a type</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Catering">Catering</option>
              <option value="Damage and painting">Damage and painting</option>
              <option value="Divyangan Facilities">Divyangan Facilities</option>
              <option value="Staff Misbehaviour">Staff Misbehaviour</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="incidentDate" className="text-sm font-medium text-gray-700">Incident Date*</Label>
            <input
              type="date"
              id="incidentDate"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </LabelInputContainer>

          <FileUpload />

          <LabelInputContainer>
            <Label htmlFor="grievancedescription" className="text-sm font-medium text-gray-700">Grievance Description*</Label>
            <textarea
              id="grievancedescription"
              placeholder="Describe your grievance"
              className="w-full h-24 p-2 bg-white text-gray-700 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={grievanceDescription}
              onChange={(e) => setGrievanceDescription(e.target.value)}
            />
          </LabelInputContainer>
          
          <button
            className="w-full bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition-colors"
            type="submit" 
          >
            Submit Grievance
          </button>
          
        </form>
      </div>
    </div>
    
    </div>
    <div className="fflex-1 flex p-4"> {/* Added padding for spacing */}
    <TypebotComponent />
  </div>
    </>
    
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {children}
    </div>
  );
}

export default SignupFormDemo;

