import React, { useState, useRef } from 'react';
import SideBar from './SideBar';
import BusinessIdentityForm from './../components/BusinessProfile'
import SetupFirstCompaign from '../components/SetupFirstCompaign';
const PlatformSetup = () => {
  const steps = [
    "Set Up Business Profile",
    "Sync Your Customer Data",
    "Set Up AI Agent Rules",
    "Set Up First Campaign",
  ];

  const [selectedStep, setSelectedStep] = useState(steps[0]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [autoOfferHelp, setAutoOfferHelp] = useState(false);
  const [autoOfferHelp1, setAutoOfferHelp1] = useState(false);

  const [isZapierConnected, setIsZapierConnected] = useState(false);

  const handleZapierClick = () => {
    setIsZapierConnected(!isZapierConnected);
  };

  
  const [isCsvUploaded, setIsCsvUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Triggers the file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / 1024).toFixed(2) + ' KB'); // Size in KB
      setIsCsvUploaded(true);
      // Further file processing (reading CSV, etc.) can be done here
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  const handleReupload = () => {
    setIsCsvUploaded(false);
    setUploadedFileName('');
    setUploadedFileSize('');
  };

  const handleRemove = () => {
    setIsCsvUploaded(false);
    setUploadedFileName('');
    setUploadedFileSize('');
  };

 

  const handleNext1 = () => {
    // Your next-step logic here
    console.log("Next clicked");
  };

  const handleNext = () => {
    if (!completedSteps.includes(selectedStep)) {
      setCompletedSteps([...completedSteps, selectedStep]);
    }
    const currentIndex = steps.indexOf(selectedStep);
    if (currentIndex < steps.length - 1) {
      setSelectedStep(steps[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">


      <div className="flex flex-1">
      
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex gap-8 max-w-7xl mx-auto">
            <div className="w-72 bg-white p-6 rounded-xl border">
              <h3 className="text-base font-semibold text-blue-600 mb-2">Get Started with ReferralHub</h3>
              <p className="text-sm text-gray-500 mb-4">
                To get started with better referrals & rewards, complete your account setup in a few easy steps.
              </p>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setSelectedStep(step)}
                  >
                    <div
                      className={`w-5 h-5 mt-1 flex-shrink-0 rounded-full border text-white flex items-center justify-center text-xs font-bold ${
                        completedSteps.includes(step)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400 text-gray-400"
                      }`}
                    >
                      {completedSteps.includes(step) ? "✓" : ""}
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          selectedStep === step ? "text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        {step}
                      </p>
                      <p className="text-xs text-gray-400">
                        {completedSteps.includes(step) ? "Completed" : "Not Started"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 bg-white p-8 rounded-xl border">
    
            {selectedStep === "Sync Your Customer Data" && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Import Customer Data: Sync with Zapier or Upload CSV
          </h2>

          {/* Zapier Connected */}
          {isZapierConnected ? (
            <>
              <p className="text-green-600 text-sm mb-2">
                Zapier Integration Connected Successfully!
              </p>
              <button
                onClick={handleZapierClick}
                className="border border-blue-500 text-blue-600 font-medium px-4 py-2 rounded-md mb-4"
              >
                Disconnect with Zapier
              </button>
            </>
          ) : (
            <button
              onClick={handleZapierClick}
              className="border border-blue-500 text-blue-600 font-medium px-4 py-2 rounded-md mb-4"
            >
              Connect with Zapier
            </button>
          )}

          <div className="my-4 text-sm text-gray-500 text-center">or</div>

          {/* CSV Upload Section */}
          {isCsvUploaded ? (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-4 text-center">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                📄
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">{uploadedFileName}</p>
                <p className="text-xs text-gray-400">{uploadedFileSize}</p>
              </div>
            </div>
            <div className="text-sm text-blue-600 cursor-pointer" onClick={handleReupload}>
              Re-upload
            </div>
            <div className="text-red-500 cursor-pointer text-xl" onClick={handleRemove}>
              ×
            </div>
          </div>
          <div className="text-green-600 text-sm mt-2">
            CSV File Uploaded Successfully!
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl text-blue-400">☁️</div>
            <p className="text-gray-600 text-sm">Drag and drop files here</p>
            <p className="text-sm text-gray-400">or</p>
            <button
              className="text-blue-600 underline text-sm"
              onClick={handleUploadClick}
            >
              Click to Upload CSV File
            </button>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}


          <button
            className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md w-full"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}


              {selectedStep === "Set Up Business Profile" && (
                <BusinessIdentityForm handleNext={handleNext} />
              )}

            {selectedStep === "Set Up AI Agent Rules" && (
            <div>
                <h2 className="text-lg font-semibold text-center mb-6">
                Set Up AI Agent Rules
                </h2>

                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Tone of Communication
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Select</option>
                    <option>Friendly</option>
                    <option>Professional</option>
                    <option>Casual</option>
                </select>
                </div>

                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Response Style</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Select</option>
                    <option>Concise</option>
                    <option>Detailed</option>
                    <option>Conversational</option>
                </select>
                </div>

                <div className="mb-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium">Auto-offer help</p>
                    <p className="text-xs text-gray-500">
                        AI pops up suggestions automatically when user lands on a page.
                    </p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={autoOfferHelp}
                            onChange={() => setAutoOfferHelp(!autoOfferHelp)}
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-all duration-300"></div>
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                    </label>

                </div>

                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium">User-initiated only</p>
                    <p className="text-xs text-gray-500">
                        AI only responds when clicked or messaged.
                    </p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={autoOfferHelp1}
                            onChange={() => setAutoOfferHelp1(!autoOfferHelp1)}
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-all duration-300"></div>
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                    </label>
                </div>
                </div>
                <div className="col-span-2 flex justify-center mt-6">
                <button
                    className="w-60 text-center py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md"
                    onClick={handleNext}
                >
                    Next
                </button>
                </div>
            </div>
            )}


              {selectedStep === "Set Up First Campaign" && (
                
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-8">
                  <SetupFirstCompaign/>
                  {/* Campaign Header */}
                 
                </div>
              )}


            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlatformSetup;

