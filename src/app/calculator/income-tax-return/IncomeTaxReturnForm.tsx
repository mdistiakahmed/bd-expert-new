import React from "react";
import PersonalInformation from "./PersonalInformation";
import ReturnAssessmentInfo from "./ReturnAssessmentInfo";
import DocumentsAttached from "./DocumentsAttached";
import IncomeFromFinancialInvestment from "./IncomeFromFinancialInvestment";

const IncomeTaxReturnForm = ({ register, errors }: any) => {
  return (
    <div className="p-4 bg-gray-50 shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Income Tax Return Form
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Personal Information */}
        <div className="col-span-1">
          <PersonalInformation register={register} errors={errors} />
        </div>

        {/* Right Column - Other Sections */}
        <div className="col-span-1 space-y-6">
          <ReturnAssessmentInfo register={register} errors={errors} />
          <DocumentsAttached register={register} errors={errors} />
          <IncomeFromFinancialInvestment register={register} errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxReturnForm;
