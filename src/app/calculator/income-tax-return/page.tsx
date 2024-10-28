"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaBars } from "react-icons/fa";
import ReturnAssessmentInfo from "./ReturnAssessmentInfo";
import DocumentsAttached from "./DocumentsAttached";
import PersonalInformation from "./PersonalInformation";
import IncomeFromFinancialInvestment from "./IncomeFromFinancialInvestment";
import IncomeFromSalary from "./IncomeFromSalary";

const IncomeTaxReturn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data: any) => console.log(data);

  const [activeTab, setActiveTab] = useState("Personal");
  const [showTabs, setShowTabs] = useState(false); // Control mobile menu visibility

  const isSectionValid = {
    Personal: Object.keys(errors).length === 0 || !errors.personalInfo,
    ReturnAssessment:
      Object.keys(errors).length === 0 || !errors.returnAssessmentInfo,
    Documents: Object.keys(errors).length === 0 || !errors.documentsAttached,
  };

  return (
    <div className="md:flex">
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setShowTabs(!showTabs)}
          className="text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Right Side Sticky Tabs (Hidden by default on mobile, toggled by Hamburger) */}
      <div
        className={`md:sticky md:top-0 md:h-full md:w-96 md:p-4 bg-gray-100 ${
          showTabs ? "block" : "hidden md:block"
        }`}
      >
        <div
          className={`flex items-center p-2 cursor-pointer ${
            activeTab === "Personal" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("Personal")}
        >
          <span className="mr-2">Personal Info</span>
          {isSectionValid.Personal ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>

        <div
          className={`flex items-center p-2 cursor-pointer ${
            activeTab === "ReturnAssessment"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
          onClick={() => setActiveTab("ReturnAssessment")}
        >
          <span className="mr-2">Return Assessment</span>
          {isSectionValid.ReturnAssessment ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>

        <div
          className={`flex items-center p-2 cursor-pointer ${
            activeTab === "Documents" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("Documents")}
        >
          <span className="mr-2">Documents Attached</span>
          {isSectionValid.Documents ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>

        <div
          className={`flex items-center p-2 cursor-pointer ${
            activeTab === "IncomeFromFinancialInvestment"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
          onClick={() => setActiveTab("IncomeFromFinancialInvestment")}
        >
          <span className="mr-2">Income From Financial Investment</span>
          {isSectionValid.Documents ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>

        <div
          className={`flex items-center p-2 cursor-pointer ${
            activeTab === "IncomeFromSalary"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
          onClick={() => setActiveTab("IncomeFromSalary")}
        >
          <span className="mr-2">Income From Salary</span>
          {isSectionValid.Documents ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>

        {/* Submit Button (Positioned below the tabs) */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 md:p-10 flex-1 bg-gray-50">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Income Tax Return Template
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === "Personal" && (
            <PersonalInformation register={register} errors={errors} />
          )}
          {activeTab === "ReturnAssessment" && (
            <ReturnAssessmentInfo register={register} errors={errors} />
          )}
          {activeTab === "Documents" && (
            <DocumentsAttached register={register} errors={errors} />
          )}
          {activeTab === "IncomeFromFinancialInvestment" && (
            <IncomeFromFinancialInvestment
              register={register}
              errors={errors}
            />
          )}

          {activeTab === "IncomeFromSalary" && (
            <IncomeFromSalary register={register} errors={errors} />
          )}
        </form>
      </div>
    </div>
  );
};

export default IncomeTaxReturn;
