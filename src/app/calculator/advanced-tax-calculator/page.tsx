"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

// Constant map for Service Code, Tax Rate, and VDS Rate
const SERVICE_CODE_MAP: any = {
  custom: { taxRate: "", vdsRate: "" },
  service1: { taxRate: 5, vdsRate: 2.4 },
  service2: { taxRate: 10, vdsRate: 5 },
  service3: { taxRate: 15, vdsRate: 7.5 },
  // Add more service codes as needed
};

const CalculatorTestPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [calculatedTax, setCalculatedTax] = useState("0.00");
  const [calculatedVDS, setCalculatedVDS] = useState("0.00");
  const [netPayment, setNetPayment] = useState("0.00");
  const [grossValue, setGrossValue] = useState("0.00");
  const [baseValue, setBaseValue] = useState("0.00");

  const [selectedOption, setSelectedOption] = useState("onlyGrossValue");

  // Result
  const [amount, setAmount] = useState<any>("0.00");
  const [baseValueForTDS, setBaseValueForTDS] = useState<any>("0.00");
  const [tdsAmount, setTdsAmount] = useState<any>("0.00");
  const [vdsAmount, setVdsAmount] = useState<any>("0.00");
  const [resultGrossValue, setResultGrossValue] = useState<any>("0.00");
  const [resultNetPayment, setResultNetPayment] = useState<any>("0.00");

  const calculateBaseValueForTDS = (
    inclusiveTax: any,
    inclusiveVAT: any,
    amount: any,
    tdsRate: any,
    vdsRate: any
  ) => {
    tdsRate /= 100;
    vdsRate /= 100;

    if (inclusiveTax === "true" && inclusiveVAT === "true") {
      return (amount / (1 + vdsRate)).toFixed(2);
    } else if (inclusiveTax === "true" && inclusiveVAT === "false") {
      return amount;
    } else if (inclusiveTax === "false" && inclusiveVAT === "false") {
      return (amount / (1 - tdsRate)).toFixed(2);
    } else if (inclusiveTax === "false" && inclusiveVAT === "true") {
      console.log("i am here....");
      return (amount / ((1 + vdsRate) * (1 - tdsRate))).toFixed(2);
    }
    return "0.00";
  };

  const calculateAmount = (data: any) => {
    let calculatedAmount = "0.00";
    if (selectedOption === "onlyGrossValue") {
      calculatedAmount = data.grossAmount || "0.00";
    } else if (selectedOption === "onlyCommission") {
      calculatedAmount = data.commissionAmount || "0.00";
    }
    setAmount(calculatedAmount);
    return calculatedAmount;
  };

  const onSubmit = (data: any) => {
    const inclusiveTax = data.inclusiveOfTax;
    const inclusiveVAT = data.inclusiveOfVAT;
    const tdsRate = parseFloat(data.taxRate);
    const vdsRate = parseFloat(data.vdsRate);

    const calculatedAmount = calculateAmount(data);
    const baseValue = calculateBaseValueForTDS(
      inclusiveTax,
      inclusiveVAT,
      calculatedAmount,
      tdsRate,
      vdsRate
    );

    const xtdsAmount = (baseValue * (tdsRate / 100)).toFixed(2);
    const xvdsAmount = (baseValue * (vdsRate / 100)).toFixed(2);

    console.log("base" + baseValue);
    console.log("vds" + xtdsAmount);
    const xResultGrossValue = (
      parseFloat(baseValue) + parseFloat(xvdsAmount)
    ).toFixed(2);
    const xResultNetPayment = (
      ((xResultGrossValue as any) -
        (xtdsAmount as any) -
        (xvdsAmount as any)) as any
    ).toFixed(2);

    setBaseValueForTDS(baseValue);
    setTdsAmount(xtdsAmount);
    setVdsAmount(xvdsAmount);
    setResultGrossValue(xResultGrossValue);
    setResultNetPayment(xResultNetPayment);
  };

  // Handle Service Code selection
  const handleServiceCodeChange = (event: any) => {
    const selectedService = event.target.value;
    const { taxRate, vdsRate } = SERVICE_CODE_MAP[selectedService] || {};

    if (selectedService === "custom") {
      // Clear taxRate and vdsRate if custom is selected
      setValue("taxRate", "");
      setValue("vdsRate", "");
    } else {
      // Autofill taxRate and vdsRate
      setValue("taxRate", taxRate);
      setValue("vdsRate", vdsRate);
    }
  };

  return (
    <>
      <div className="mt-2 p-6 bg-gray-100 shadow-lg rounded-lg mx-2 lg:mx-10">
        <h2 className="text-xl text-white bg-red-600 text-center h-10">
          Under Development
        </h2>
        <h1 className="text-2xl text-center font-semibold">
          TDS VDS Calculator
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-between">
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

            {/* Service Code Dropdown */}
            <div>
              <label className="block text-gray-700">Service Code</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                {...register("serviceCode")}
                onChange={handleServiceCodeChange}
              >
                <option value="custom">Custom</option>
                {Object.keys(SERVICE_CODE_MAP)
                  .filter((key) => key !== "custom")
                  .map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Radio Buttons for Selection */}
              <div>
                <label className="block text-gray-700">Select Option</label>
                <div className="flex flex-col lg:flex-row lg:gap-5">
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
                    <p>Both Gross Value and Commission</p>
                  </label>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-around whitespace-nowrap">
                {/* Inclusive of Tax Dropdown */}
                <div className="flex items-center justify-center gap-5">
                  <label className="block text-gray-700">
                    Inclusive of Tax
                  </label>
                  <select
                    className={`w-full p-2 border border-gray-300 rounded`}
                    {...register("inclusiveOfTax")}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
                  <option value="2">2%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
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
              {selectedOption !== "bothGrossValueAndCommission" && (
                <p>Amount (BDT): {amount}</p>
              )}
              <p>Base Value for TDS (BDT): {baseValueForTDS}</p>
              {selectedOption !== "bothGrossValueAndCommission" && (
                <p>Base Value for VDS (BDT): {baseValueForTDS}</p>
              )}
              <p>TDS Amount (BDT): {tdsAmount}</p>
              <p>VDS Amount (BDT): {vdsAmount}</p>
              <p>Gross Value (BDT): {resultGrossValue}</p>
              <p>Net Payment (BDT): {resultNetPayment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorTestPage;
