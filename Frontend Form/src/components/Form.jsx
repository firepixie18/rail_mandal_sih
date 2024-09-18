"use client";
import React,{useState,useRef,useEffect} from "react";
import { Label } from "./ui/Label.jsx";
import { Input } from "./ui/Input.jsx";
import { cn } from "../lib/utils.js";
import FileUpload from "./FileUpload.jsx";
import Datepicker from "./DatePicker.jsx";
// import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export function SignupFormDemo() {
    const [isTypeOpen, setIsTypeOpen] = useState(false);

  const toggleDropdown = () => setIsTypeOpen(!isTypeOpen);
  const [selectedType,setSelectedType]=useState("");
    const [mobileNum,setMobileNum]=useState(null);
    const [journeyDetails,setJourneyDetails]=useState(null);
    const [pnrNum,setPnrNum]=useState(null);
    const [incidentDate,setIncidentDate]=useState(null);
    const [grievanceDes,setGrievanceDes]=useState(null);
  const [isSubtypeOpen, setIsSubtypeOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsTypeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSubDropdown = () => setIsSubtypeOpen(!isSubtypeOpen);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    (<div className="flex flex-col md:flex-col w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <div>
          <p className=" text-left md:w-1/2 font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Grievance Details
          </p>
          <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300 text-right">
            *Mandatory Fields
          </p>
        </div>
        
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="mobilenumber">Mobile Number</Label>
            <Input id="mobilenumber" placeholder="" type="text" onChange={(e)=>setMobileNum(e.target.value)} />
            console.log(mobile Number entered)
          </LabelInputContainer>
          <LabelInputContainer>
            {/* <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" /> */}
            <button className="mt-auto ">Get OTP</button>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="journeyDetails">Journey Details</Label>
          <Input id="journeyDetails" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="pnrnumber">PNR Number</Label>
          <Input id="pnrnumber" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="type">Type</Label>
          
          <div className="relative inline-block" ref={dropdownRef}>
          <input type="text" disabled 
            value={selectedType?selectedType:"Select from the drop down menu"}
            className="w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600" />

      <button
        onClick={toggleDropdown}
        className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 mt-2"
      >
        Select
      </button>

      {isTypeOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedType("Cleanliness");setIsTypeOpen(false);}}>Cleanliness</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedType("Catering");setIsTypeOpen(false);}}>Catering</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedType("Damage");setIsTypeOpen(false);}}>Damage and painting</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedType("Divyangan");setIsTypeOpen(false);}}>Divyangan Facilities</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedType("Misbehaviour");setIsTypeOpen(false);}}>Staff Misbehaviour</a>
        </div>
      )}
    </div>
        </LabelInputContainer>

        

        <LabelInputContainer c>
            <Label htmlFor="datepick">Incident Date</Label>
            {/* <Input id="mobilenumber" placeholder="" type="text" /> */}
            <Datepicker />
            
          </LabelInputContainer>
        
            <FileUpload/>

            <LabelInputContainer>
            <Label htmlFor="grievancedescription">Grievance Description</Label>
            <textarea id="grievancedescription" placeholder="" type="text" className="h-24 pt-2 bg-white text-black border-black border-2 rounded-xl" />
          </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black mt-4 dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit">
          Submit &rarr;
          <BottomGradient />
        </button>

        {/* <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

        {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit">
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
    </div>)
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};
