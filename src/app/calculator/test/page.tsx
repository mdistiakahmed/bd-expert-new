"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const CalculatorTestPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [calculatedTax, setCalculatedTax] = useState("0.00");
  const [calculatedVDS, setCalculatedVDS] = useState("0.00");
  const [netPayment, setNetPayment] = useState("0.00");
  const [grossValue, setGrossValue] = useState("0.00");
  const [baseValue, setBaseValue] = useState("0.00");

  const [selectedOption, setSelectedOption] = useState("onlyGrossValue");

  const onSubmit = (data: any) => {
    const amount = parseFloat(data.grossAmount || 0);
    const commission = parseFloat(data.commissionAmount || 0);
    const taxRate = parseFloat(data.taxRate) / 100;
    const vdsRate = parseFloat(data.vdsRate) / 100;

    let tdsAmount = 0;
    let vdsAmount = 0;
    let netPayment = 0;
    let grossValue = 0;
    let baseValue = 0;

    // Logic for calculations based on selected options
    if (data.onlyGrossValue) {
      grossValue = amount;
      baseValue = amount; // Assuming base value is equal to gross value when only gross value is considered
      tdsAmount = amount * taxRate;
      vdsAmount = amount * vdsRate;
      netPayment = grossValue - tdsAmount - vdsAmount;
    } else if (data.onlyCommission) {
      // Logic for only commission
      grossValue = commission; // Adjust as needed
      baseValue = commission; // Adjust as needed
      tdsAmount = commission * taxRate; // Adjust as needed
      vdsAmount = commission * vdsRate; // Adjust as needed
      netPayment = grossValue - tdsAmount - vdsAmount; // Adjust as needed
    } else if (data.bothGrossValueAndCommission) {
      grossValue = amount + commission;
      baseValue = amount + commission; // Adjust as needed
      tdsAmount = (amount + commission) * taxRate; // Adjust as needed
      vdsAmount = (amount + commission) * vdsRate; // Adjust as needed
      netPayment = grossValue - tdsAmount - vdsAmount; // Adjust as needed
    }

    setCalculatedTax(tdsAmount.toFixed(2));
    setCalculatedVDS(vdsAmount.toFixed(2));
    setNetPayment(netPayment.toFixed(2));
    setBaseValue(baseValue.toFixed(2));
    setGrossValue(grossValue.toFixed(2));
  };

  return (
    <>
      <div className="mt-2 p-6 bg-gray-100 shadow-lg rounded-lg mx-10">
        <h1 className="text-2xl text-center font-semibold">
          TDS VDS Calculator
        </h1>
        <div className="lg:flex lg:justify-between ">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-1/2 space-y-4"
          >
            <div className="text-center mb-6 flex flex-col items-center justify-center">
              <Image
                src="/payment.JPG"
                alt="payment"
                height={200}
                width={400}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Radio Buttons for Selection */}
              {/* Radio Buttons for Selection */}
              <div>
                <label className="block text-gray-700">Select Option</label>
                <div className="flex gap-5 justify-between">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      value="onlyGrossValue"
                      {...register("selection", { required: true })}
                      onChange={() => setSelectedOption("onlyGrossValue")}
                      checked={selectedOption === "onlyGrossValue"}
                    />
                    <p>Only Gross Value</p>
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      value="onlyCommission"
                      {...register("selection", { required: true })}
                      onChange={() => setSelectedOption("onlyCommission")}
                      checked={selectedOption === "onlyCommission"}
                    />
                    <p>Only Commission</p>
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      value="bothGrossValueAndCommission"
                      {...register("selection", { required: true })}
                      onChange={() =>
                        setSelectedOption("bothGrossValueAndCommission")
                      }
                      checked={selectedOption === "bothGrossValueAndCommission"}
                    />
                    <p> Both Gross Value and Commission</p>
                  </label>
                </div>
              </div>

              <div className="flex justify-around whitespace-nowrap">
                {/* Inclusive of Tax Dropdown */}
                <div className="flex items-center justify-center gap-5">
                  <label className="block text-gray-700">
                    Inclusive of Tax
                  </label>
                  <select
                    className={`w-full p-2 border border-gray-300 rounded`}
                    {...register("inclusiveOfTax")}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>

                {/* Inclusive of VAT Dropdown */}
                <div className="flex items-center justify-center gap-5">
                  <label className="block text-gray-700">
                    Inclusive of VAT
                  </label>
                  <select
                    className={`w-full p-2 border border-gray-300 rounded`}
                    {...register("inclusiveOfVAT")}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
              </div>

              {/* Gross Amount Input */}
              {(selectedOption === "onlyGrossValue" ||
                selectedOption === "bothGrossValueAndCommission") && (
                <div>
                  <label className="block text-gray-700">
                    Gross Amount (BDT)
                  </label>
                  <input
                    type="number"
                    className={`w-full p-2 border border-gray-300 rounded ${
                      errors.grossAmount ? "border-red-500" : ""
                    }`}
                    {...register("grossAmount", { required: true })}
                  />
                  {errors.grossAmount && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </div>
              )}

              {/* Commission Amount Input */}
              {(selectedOption === "onlyCommission" ||
                selectedOption === "bothGrossValueAndCommission") && (
                <div>
                  <label className="block text-gray-700">
                    Commission Amount (BDT)
                  </label>
                  <input
                    type="number"
                    className={`w-full p-2 border border-gray-300 rounded ${
                      errors.commissionAmount ? "border-red-500" : ""
                    }`}
                    {...register("commissionAmount")}
                  />
                </div>
              )}

              {/* Tax Rate Dropdown */}
              <div>
                <label className="block text-gray-700">Tax Rate (%)</label>
                <select
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.taxRate ? "border-red-500" : ""
                  }`}
                  {...register("taxRate", { required: true })}
                >
                  <option value="">Select Tax Rate</option>
                  {/* Add options here */}
                  <option value="0">0%</option>
                  <option value="0.25">0.25%</option>
                  <option value="0.65">0.65%</option>
                  <option value="1">1%</option>
                  <option value="1.5">1.5%</option>
                  <option value="2">2%</option>
                  <option value="3">3%</option>
                  <option value="4">4%</option>
                  <option value="5">5%</option>
                  <option value="7">7%</option>
                  <option value="8">8%</option>
                  <option value="10">10%</option>
                  <option value="12">12%</option>
                  <option value="15">15%</option>
                </select>
                {errors.taxRate && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>

              {/* VDS Rate Dropdown */}
              <div>
                <label className="block text-gray-700">VDS Rate (%)</label>
                <select
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.vdsRate ? "border-red-500" : ""
                  }`}
                  {...register("vdsRate", { required: true })}
                >
                  <option value="">Select VDS Rate</option>
                  <option value="0">0%</option>
                  <option value="2.4">2.4%</option>
                  <option value="5">5%</option>
                  <option value="7.5">7.5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                </select>
                {errors.vdsRate && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Calculate
              </button>
            </div>
          </form>

          {/* Results Section */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 space-y-4">
            <h2 className="text-xl font-semibold">Results</h2>
            <div className="border border-gray-300 p-4 rounded">
              <p>Calculated Tax (BDT): {calculatedTax}</p>
              <p>Calculated VDS (BDT): {calculatedVDS}</p>
              <p>Net Payment (BDT): {netPayment}</p>
              <p>Gross Value (BDT): {grossValue}</p>
              <p>Base Value (BDT): {baseValue}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorTestPage;
