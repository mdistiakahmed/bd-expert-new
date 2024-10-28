"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaBars } from "react-icons/fa";
import ReturnAssessmentInfo from "./ReturnAssessmentInfo";
import DocumentsAttached from "./DocumentsAttached";
import PersonalInformation from "./PersonalInformation";
import IncomeFromFinancialInvestment from "./IncomeFromFinancialInvestment";
import IncomeFromSalary from "./IncomeFromSalary";
import IncomeFromRent from "./IncomeFromRent";
import IncomeFromBusinessAndExemptedIncome from "./IncomeFromBusinessAndExemptedIncome";
import OtherInformationAndTDS from "./OtherInformationAndTDS";
import LifeStyleExpense from "./LifeStyleExpense";
import IncomeTaxReturnForm from "./IncomeTaxReturnForm";

const IncomeTaxReturn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data: any) => console.log(data);

  const [activeTab, setActiveTab] = useState("IncomeTaxReturnForm");
  const [showTabs, setShowTabs] = useState(false); // Control mobile menu visibility

  const isSectionValid = {
    Personal: Object.keys(errors).length === 0 || !errors.personalInfo,
    ReturnAssessment:
      Object.keys(errors).length === 0 || !errors.returnAssessmentInfo,
    Documents: Object.keys(errors).length === 0 || !errors.documentsAttached,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              activeTab === "IncomeTaxReturnForm"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("IncomeTaxReturnForm")}
          >
            <span className="mr-2">Personal Info</span>
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

          <div
            className={`flex items-center p-2 cursor-pointer ${
              activeTab === "IncomeFromRent"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("IncomeFromRent")}
          >
            <span className="mr-2">Income From Rent</span>
            {isSectionValid.Documents ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
          </div>

          <div
            className={`flex items-center p-2 cursor-pointer ${
              activeTab === "IncomeFromBusinessAndExemptedIncome"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("IncomeFromBusinessAndExemptedIncome")}
          >
            <span className="mr-2">Income From Business/Exempted Income</span>
            {isSectionValid.Documents ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
          </div>

          <div
            className={`flex items-center p-2 cursor-pointer ${
              activeTab === "OtherInformationAndTDS"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("OtherInformationAndTDS")}
          >
            <span className="mr-2">Other Information And TDS</span>
            {isSectionValid.Documents ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
          </div>

          <div
            className={`flex items-center p-2 cursor-pointer ${
              activeTab === "LifeStyleExpense"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("LifeStyleExpense")}
          >
            <span className="mr-2">Life Style Expense</span>
            {isSectionValid.Documents ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
          </div>

          {/* Submit Button (Positioned below the tabs) */}
          <div className="mt-24">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-red-600 text-white font-semibold rounded"
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

          {activeTab === "IncomeTaxReturnForm" && (
            <IncomeTaxReturnForm register={register} errors={errors} />
          )}

          {activeTab === "IncomeFromSalary" && (
            <IncomeFromSalary register={register} errors={errors} />
          )}

          {activeTab === "IncomeFromRent" && (
            <IncomeFromRent register={register} errors={errors} />
          )}

          {activeTab === "IncomeFromBusinessAndExemptedIncome" && (
            <IncomeFromBusinessAndExemptedIncome
              register={register}
              errors={errors}
            />
          )}

          {activeTab === "OtherInformationAndTDS" && (
            <OtherInformationAndTDS register={register} errors={errors} />
          )}

          {activeTab === "LifeStyleExpense" && (
            <LifeStyleExpense register={register} errors={errors} />
          )}
        </div>
      </div>
    </form>
  );
};

export default IncomeTaxReturn;
