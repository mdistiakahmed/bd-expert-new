"use client";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Paper,
} from "@mui/material";
import ReturnAssessmentInfo from "./ReturnAssessmentInfo";
import DocumentsAttached from "./DocumentsAttached";
import PersonalInformation from "./PersonalInformation";

const IncomeTaxReturn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className=" p-20 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Income Tax Return Template</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <ReturnAssessmentInfo register={register} errors={errors} />
            <DocumentsAttached register={register} errors={errors} />
          </div>
          {/* Right Column */}
          <div>
            <PersonalInformation register={register} errors={errors} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeTaxReturn;
