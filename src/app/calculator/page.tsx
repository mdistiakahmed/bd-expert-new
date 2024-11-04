"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as XLSX from "xlsx";
import { FaFileAlt, FaDownload, FaTrashAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const CalculatorPage = () => {
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
  const [storedResults, setStoredResults] = useState<any>([]);
  const [isExportButtonEnabled, setIsExportButtonEnabled] = useState(false);

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("taxResults") || "[]");
    setStoredResults(savedResults);
  }, []);

  const onSubmit = (data: any) => {
    const amount = parseFloat(data.amount);
    const taxRate = parseFloat(data.taxRate) / 100;
    const vdsRate = parseFloat(data.vdsRate) / 100;

    let tdsAmount = 0;
    let vdsAmount = 0;
    let netPayment = 0;
    let grossValue = 0;
    let baseValue = 0;

    switch (data.particulars) {
      case "including_tax_vat":
        grossValue = amount;
        baseValue = amount / (1 + vdsRate);
        tdsAmount = (amount / (1 + vdsRate)) * taxRate;
        vdsAmount = (amount / (1 + vdsRate)) * vdsRate;
        netPayment = amount - tdsAmount - vdsAmount;
        break;
      case "including_tax_excluding_vat":
        grossValue = amount * (1 + vdsRate);
        baseValue = amount;
        tdsAmount = amount * taxRate;
        vdsAmount = amount * vdsRate;
        netPayment = grossValue - tdsAmount - vdsAmount;
        break;
      case "excluding_tax_excluding_vat":
        grossValue = (amount / (1 - taxRate)) * (1 + vdsRate);
        baseValue = amount / (1 - taxRate);

        tdsAmount = (amount / (1 - taxRate)) * taxRate;
        vdsAmount = (amount / (1 - taxRate)) * vdsRate;
        netPayment = grossValue - tdsAmount - vdsAmount;
        break;
      case "excluding_tax_including_vat":
        grossValue = (amount / (1 + vdsRate) / (1 - taxRate)) * (1 + vdsRate);

        baseValue = amount / (1 + vdsRate) / (1 - taxRate);

        tdsAmount = (amount / (1 + vdsRate) / (1 - taxRate)) * taxRate;
        vdsAmount = (amount / (1 + vdsRate) / (1 - taxRate)) * vdsRate;
        netPayment = grossValue - tdsAmount - vdsAmount;
        break;
      default:
        break;
    }

    setCalculatedTax(tdsAmount.toFixed(2));
    setCalculatedVDS(vdsAmount.toFixed(2));
    setNetPayment(netPayment.toFixed(2));
    setBaseValue(baseValue.toFixed(2));
    setGrossValue(grossValue.toFixed(2));

    setIsExportButtonEnabled(true);
  };

  const addResultForExport = () => {
    const result = {
      amount: watch("amount"),
      particulars: watch("particulars"),
      taxRate: watch("taxRate"),
      vdsRate: watch("vdsRate"),
      grossValue,
      baseValue,
      calculatedTax,
      calculatedVDS,
      netPayment,
    };
    const updatedResults = [...storedResults, result];
    localStorage.setItem("taxResults", JSON.stringify(updatedResults));
    setStoredResults(updatedResults);
    setIsExportButtonEnabled(false);
  };

  const exportToExcel = (item: any) => {
    const transformedData = {
      Amount: item.amount,
      Particulars: item.particulars,
      "Tax Rate": item.taxRate,
      "VDS Rate": item.vdsRate,
      "Gross Value": item.grossValue,
      "Base Value for TDS and VDS ": item.baseValue,
      "TDS Amount": item.calculatedTax,
      "VDS Amount": item.calculatedVDS,
      "Net Payment": item.netPayment,
    };
    const worksheet = XLSX.utils.json_to_sheet([transformedData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tax Calculation");
    XLSX.writeFile(workbook, "tax_calculation.xlsx");
  };

  const exportAllToExcel = () => {
    const transformedData = storedResults.map((item: any) => ({
      Amount: item.amount,
      Particulars: item.particulars,
      "Tax Rate": item.taxRate,
      "VDS Rate": item.vdsRate,
      "Gross Value": item.grossValue,
      "Base Value for TDS and VDS ": item.baseValue,
      "TDS Amount": item.calculatedTax,
      "VDS Amount": item.calculatedVDS,
      "Net Payment": item.netPayment,
    }));
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Tax Calculations");
    XLSX.writeFile(workbook, "all_tax_calculations.xlsx");
  };

  const removeResult = (index: any) => {
    const updatedResults = storedResults.filter(
      (_: any, i: any) => i !== index
    );
    localStorage.setItem("taxResults", JSON.stringify(updatedResults));
    setStoredResults(updatedResults);
  };

  return (
    <>
      <div className="mt-2 p-6 bg-gray-100 shadow-lg rounded-lg md:mx-10">
        <h1 className="text-2xl text-center font-semibold">
          TDS VDS Calculator
        </h1>
        <div className="lg:flex lg:gap-10 ">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-1/2 space-y-4"
          >
            <div className="text-center mb-6 flex flex-col items-center justify-center">
              <Image
                src="/payment.JPG"
                alt="payment"
                height={100}
                width={200}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Amount Input */}
              <div>
                <label className="block text-gray-700">Amount (BDT)</label>
                <input
                  type="number"
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                  {...register("amount", { required: true })}
                />
                {errors.amount && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>

              {/* Particulars Input */}
              <div>
                <label className="block text-gray-700">Particulars</label>
                <select
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.particulars ? "border-red-500" : ""
                  }`}
                  {...register("particulars", { required: true })}
                >
                  <option value="">Select Particulars</option>
                  <option value="including_tax_vat">
                    Including Tax and VAT
                  </option>
                  <option value="including_tax_excluding_vat">
                    Including Tax and excluding VAT
                  </option>
                  <option value="excluding_tax_excluding_vat">
                    Excluding Tax and excluding VAT
                  </option>
                  <option value="excluding_tax_including_vat">
                    Excluding Tax and including VAT
                  </option>
                </select>
                {errors.particulars && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>

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

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
            >
              Calculate
            </button>
            <button
              onClick={addResultForExport}
              disabled={!isExportButtonEnabled}
              className={`w-full bg-green-500 text-white py-2 rounded mt-4 ${!isExportButtonEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Add Result For Export
            </button>
          </form>

          <div className="flex flex-col">
            {/* Display stored results */}
            <div className="mt-5 mb-6  md:ml-10 md:border-l md:border-gray-300 md:px-6 order-2 md:order-1 md:max-h-36 overflow-y-auto">
              <div className="flex items-center justify-between p-2 border-b">
                <h2 className="text-sm font-semibold ">Stored Results</h2>
                <button
                  onClick={exportAllToExcel}
                  className={`bg-blue-500 text-white px-2 py-1 rounded  text-sm  ${storedResults.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={storedResults.length === 0}
                >
                  Export All as Excel
                </button>
              </div>
              {storedResults.length > 0 && (
                <div className="mt-2">
                  {storedResults.map((result: any, index: any) => (
                    <div
                      key={index}
                      className="relative flex items-center space-x-2 mb-4 text-xs"
                    >
                      <FaFileAlt className="text-2xl text-gray-400" />{" "}
                      <div className="absolute top-1 right-0">
                        <Tooltip title="Download" placement="top">
                          <button
                            onClick={() => exportToExcel(result)}
                            className="text-green-500"
                          >
                            <FaDownload />
                          </button>
                        </Tooltip>
                      </div>
                      <div className="relative">
                        <p>
                          Result {index + 1} - Amount: {result.grossValue} BDT
                        </p>
                        <div className="absolute top-0 right-[-20px]">
                          <Tooltip title="Remove" placement="top">
                            <button
                              onClick={() => removeResult(index)}
                              className="text-red-500"
                            >
                              <FaTrashAlt />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="mt-6 md:mt-[20%] md:ml-10  md:border-l md:border-gray-300 md:pl-6 order-1 md:order-2 ">
              <div className="bg-gray-100 pt-4 md:p-4 rounded">
                <h2 className="text-gray-800 font-semibold text-lg mb-4">
                  Calculation Results
                </h2>
                <table className="w-full text-left text-sm md:text-base">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold text-gray-700">
                        Gross Value:
                      </td>
                      <td className="py-2 text-gray-700">{grossValue} BDT</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold text-gray-700">
                        Base Value for TDS and VDS:
                      </td>
                      <td className="py-2 text-gray-700">{baseValue} BDT</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold text-gray-700">
                        TDS Amount:
                      </td>
                      <td className="py-2 text-gray-700">
                        {calculatedTax} BDT
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold text-gray-700">
                        VDS Amount:
                      </td>
                      <td className="py-2 text-gray-700">
                        {calculatedVDS} BDT
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-gray-700">
                        Net Payment:
                      </td>
                      <td className="py-2 text-gray-700">{netPayment} BDT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
