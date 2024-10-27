"use client";
import { useState } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";

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
          {/* Add more links as needed */}
        </nav>
      </div>
    </header>
  );
};

const page = () => {
  const [amount, setAmount] = useState<any>("");
  const [taxSection, setTaxSection] = useState("");
  const [calculatedTax, setCalculatedTax] = useState<any>(null);

  const handleCalculate = () => {
    const taxRate = taxSection === "section1" ? 0.1 : 0.15;
    setCalculatedTax(amount * taxRate);
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="text-center mb-6 flex flex-col items-center justify-center">
          {/* SVG image */}
          <Image src={"/payment.svg"} alt="payment" height={300} width={200} />
          <h1 className="text-3xl font-bold mb-4">Tax Calculator</h1>
          <p className="text-lg font-semibold text-blue-600">
            End Bill Details
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tax Section</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={taxSection}
            onChange={(e) => setTaxSection(e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="section1">Section 1 - 10%</option>
            <option value="section2">Section 2 - 15%</option>
          </select>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleCalculate}
        >
          Calculate Tax
        </button>
        {calculatedTax !== null && (
          <div className="mt-4 text-gray-800 font-semibold">
            Calculated Tax: {calculatedTax.toFixed(2)}
          </div>
        )}
      </div>
    </>
  );
};

export default page;
