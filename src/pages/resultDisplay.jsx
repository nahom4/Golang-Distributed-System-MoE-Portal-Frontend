import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useLazyGetResultQuery } from "../redux rtk/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components/Header";

export default function ResultDisplay() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [getResult, { data, error, isSuccess }] = useLazyGetResultQuery();

  const handleSubmit = () => {
    if (!registrationNumber.trim()) {
      toast.warn("Please enter your registration number", {
        position: "top-center",
      });
      return;
    }
    getResult(registrationNumber);
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed to get result", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ToastContainer />

      {isSuccess ? (
        <div className="flex justify-center px-4 py-24">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-100">
            {/* Profile Section */}
            <div className="flex items-center gap-6 mb-8">
              <img
                src="man.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{data.Data.Name}</h2>
                <p className="text-gray-600">
                  <span className="font-medium">Sex:</span> {data.Data.Sex}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Age:</span> {data.Data.Age}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Stream:</span> {data.Data.Stream}
                </p>
              </div>
            </div>

            {/* Subject Scores */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Subject Scores
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(data.Data)
                  .filter(
                    ([key]) =>
                      !["Name", "Sex", "Age", "Stream"].includes(key)
                  )
                  .map(([subject, score]) => (
                    <div
                      key={subject}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between"
                    >
                      <span className="text-gray-700 font-medium">{subject}</span>
                      <span className="text-green-700 font-bold">{score}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center px-4 py-24">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-100">
            <label
              htmlFor="registrationNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              placeholder="Enter your registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none mb-4"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
