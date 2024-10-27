"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={`/`} className="text-2xl font-bold">
          RatGeber.
        </Link>
        <nav className="flex space-x-4">
          <Link href="/personal-tax">
            <p className="hover:underline">Personal Tax Calculator</p>
          </Link>
          <Link href="/tds-vds">
            <p className="hover:underline">TDS and VDS Calculator</p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

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
                src="/payment.svg"
                alt="payment"
                height={300}
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
          </form>

          {/* Results Section */}
          <div className="mt-6 lg:mt-[20%] lg:ml-10 lg:w-1/3 lg:border-l lg:border-gray-300 lg:pl-6">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-gray-800 font-semibold text-lg mb-4">
                Calculation Results
              </h2>
              <table className="w-full text-left">
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
                    <td className="py-2 text-gray-700">{calculatedTax} BDT</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 font-semibold text-gray-700">
                      VDS Amount:
                    </td>
                    <td className="py-2 text-gray-700">{calculatedVDS} BDT</td>
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
    </>
  );
};

export default CalculatorPage;
