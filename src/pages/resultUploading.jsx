import React from "react";
import Navbar from "../components/navbar";
import { useForm, useFieldArray } from "react-hook-form";
import { useUploadResultMutation } from "../redux rtk/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components/Header";

export default function ResultUploading() {
  const [uploadResult] = useUploadResultMutation();
  const { register, control, handleSubmit } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "uploadedResult",
  });

  const onSubmit = async (data) => {
    const payload = {
      Latitude: 12.5,
      Longitude: 10.4,
      Data: data.uploadedResult.map((result) => ({
        ...result,
        Maths: parseFloat(result.Maths),
        English: parseFloat(result.English),
        Physics: parseFloat(result.Physics),
        Chemistry: parseFloat(result.Chemistry),
        Biology: parseFloat(result.Biology),
        Aptitude: parseFloat(result.Aptitude),
        Age: parseFloat(result.Age),
      })),
    };

    await uploadResult(payload)
      .unwrap()
      .then(() => {
        toast.success("Successfully uploaded!!!", { position: "top-center" });
        setTimeout(() => {
          window.location.href = "/result";
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to upload", { position: "top-center" });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
        >
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Upload Results
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-600 text-white text-sm">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Sex</th>
                  <th className="p-2">Admission No.</th>
                  <th className="p-2">Stream</th>
                  <th className="p-2">Maths</th>
                  <th className="p-2">English</th>
                  <th className="p-2">Physics</th>
                  <th className="p-2">Chemistry</th>
                  <th className="p-2">Biology</th>
                  <th className="p-2">Aptitude</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((row, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 hover:bg-green-50 transition"
                  >
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Name`)}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Age`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Sex`)}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.AdmissionNumber`)}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        {...register(`uploadedResult.${index}.Stream`)}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      >
                        <option value="Natural">Natural</option>
                        <option value="Social">Social</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Maths`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.English`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Physics`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Chemistry`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Biology`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        {...register(`uploadedResult.${index}.Aptitude`)}
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() =>
                append({
                  Name: "",
                  Age: 0,
                  Sex: "",
                  AdmissionNumber: "",
                  Stream: "Natural",
                  Maths: 0,
                  English: 0,
                  Physics: 0,
                  Chemistry: 0,
                  Biology: 0,
                  Aptitude: 0,
                })
              }
              className="bg-green-100 hover:bg-green-200 text-green-700 font-medium px-4 py-2 rounded-lg transition"
            >
              + Add Row
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
