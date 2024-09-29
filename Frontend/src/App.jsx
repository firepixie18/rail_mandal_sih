// import './App.css'
// import { SignupFormDemo } from './components/Form'
// function App() {
  
//   return (
//     <>
//       <SignupFormDemo/>
//     </>
//   )
// }

// export default App

import React, { useEffect } from 'react';
import './App.css';
import { SignupFormDemo } from './components/Form';
import ComplaintStatusPage from '../src/components/Landing.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { PnrProvider } from './contexts/PnrContext.jsx';

function App() {
  
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js';
    
    script.onload = () => {
      // Initialize Typebot after the script loads
      window.Typebot.initStandard({ typebot: "my-typebot-uz3f6m9" });
    };

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
    <BrowserRouter>
    <PnrProvider>
     <Routes>
      
      <Route path="/" element={<SignupFormDemo/>}/>
      <Route path="/landing" element={<ComplaintStatusPage/>}/>
      
     </Routes>
     </PnrProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

