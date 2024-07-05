"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useForm } from "react-hook-form";

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ExperienceUpdateDialog = ({
  open,
  setOpen,
  profileData,
  handleUpdate,
}: any) => {
  const [experienceDetails, setExperienceDetails] = useState<string[]>([]);
  const [educationDetails, setEducationDetails] = useState<string[]>([]);
  const [skillsDetails, setSkillsDetails] = useState<string[]>([]);

  let indexArray: any = [];
  let educationIndexArray: any = [];
  let skillsIndexArray: any = [];
  let obj: any = {};
  useEffect(() => {
    console.log("profileData on modal", profileData?.experienceList);
    obj = {};
    indexArray = [];
    educationIndexArray = [];
    skillsIndexArray = [];
    profileData?.experienceList?.map((e: any) => {
      const index = Math.random().toString(36).substring(2, 7);
      indexArray.push(index);
      obj[`company_name_${index}`] = e.companyName;
      obj[`position_${index}`] = e.position;
      obj[`start_date_${index}`] = e.startDate;
      obj[`end_date_${index}`] = e.endDate;
    });

    profileData?.educatoinList?.map((e: any) => {
      const index = Math.random().toString(36).substring(2, 7);
      educationIndexArray.push(index);
      obj[`degree_${index}`] = e.degree;
      obj[`institution_${index}`] = e.institution;
      obj[`start_date_${index}`] = e.startDate;
      obj[`end_date_${index}`] = e.endDate;
    });

    profileData?.skillList?.map((e: any) => {
      const index = Math.random().toString(36).substring(2, 7);
      skillsIndexArray.push(index);
      obj[`skill_${index}`] = e;
    });

    setExperienceDetails(indexArray);
    setEducationDetails(educationIndexArray);
    setSkillsDetails(skillsIndexArray);

    reset({
      phone: profileData?.aboutMe?.phone,
      email: profileData?.aboutMe?.email,
      nationality: profileData?.aboutMe?.nationality,
      languages: profileData?.aboutMe?.languages,
      ...obj,
    });
  }, [profileData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: profileData?.aboutMe?.phone,
      email: profileData?.aboutMe?.email,
      nationality: profileData?.aboutMe?.nationality,
      languages: profileData?.aboutMe?.languages,
      ...obj,
    },
  });

  console.log("profile data: about me: ", profileData?.aboutMe);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    const experienceList: any = [];
    const educatoinList: any = [];
    const skillList: any = [];

    experienceDetails.forEach((e) => {
      const experienceData: any = {};
      experienceData.companyName = data[`company_name_${e}`];
      experienceData.position = data[`position_${e}`];
      experienceData.startDate = data[`start_date_${e}`];
      experienceData.endDate = data[`end_date_${e}`];
      experienceData.currentCompany = data[`current_company_${e}`];

      experienceList.push(experienceData);
    });

    educationDetails.forEach((e) => {
      const educationData: any = {};
      educationData.degree = data[`degree_${e}`];
      educationData.institution = data[`institution_${e}`];
      educationData.startDate = data[`start_date_${e}`];
      educationData.endDate = data[`end_date_${e}`];
      educationData.currentInstitution = data[`current_institution_${e}`];

      educatoinList.push(educationData);
    });

    skillsDetails.forEach((e) => {
      const skill = data[`skill_${e}`];
      skillList.push(skill);
    });

    const aboutMe: any = {};
    aboutMe.phone = data.phone;
    aboutMe.email = data.email;
    aboutMe.languages = data.languages;
    aboutMe.nationality = data.nationality;

    const toUpdateData = {
      experienceList,
      educatoinList,
      skillList,
      aboutMe,
    };

    handleUpdate(toUpdateData);
    setOpen(false);
    reset();
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const addExperienceField = () => {
    setExperienceDetails((prevFields) => [
      ...prevFields,
      Math.random().toString(36).substring(2, 7),
    ]);
  };

  const removeExperienceField = (index: string) => {
    setExperienceDetails((prevFields) =>
      prevFields.filter((item) => item !== index)
    );
  };

  const addEducationField = () => {
    setEducationDetails((prevFields) => [
      ...prevFields,
      Math.random().toString(36).substring(2, 7),
    ]);
  };

  const removeEducationField = (index: string) => {
    setEducationDetails((prevFields) =>
      prevFields.filter((item) => item !== index)
    );
  };

  const addNewSkill = () => {
    setSkillsDetails((prevFields) => [
      ...prevFields,
      Math.random().toString(36).substring(2, 7),
    ]);
  };

  const removeSkill = (index: string) => {
    setSkillsDetails((prevFields) =>
      prevFields.filter((item) => item !== index)
    );
  };

  const createExperienceFormControl = (index: string) => (
    <FormControl
      fullWidth
      margin="normal"
      key={index}
      className="flex flex-col"
    >
      <div className="flex w-full">
        <TextField
          id={`position_${index}`}
          label="Position"
          variant="outlined"
          fullWidth
          margin="normal"
          className="w-full"
          {...register(`position_${index}`, {
            required: "Position is required",
          })}
          error={!!errors[`position_${index}`]}
        />
        <IconButton
          onClick={() => removeExperienceField(index)}
          aria-label="delete"
          className="ml-2 mt-2"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <TextField
        id={`company_name_${index}`}
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register(`company_name_${index}`, {
          required: "Company Name is required",
        })}
        error={!!errors[`company_name_${index}`]}
      />
      <div className="flex space-x-4">
        <TextField
          id={`start_date_${index}`}
          label="Start Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
          fullWidth
          {...register(`start_date_${index}`, {
            required: "Start Date is required",
          })}
          error={!!errors[`start_date_${index}`]}
        />
        <TextField
          id={`end_date_${index}`}
          label="End Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
          fullWidth
          {...register(`end_date_${index}`, {})}
        />
      </div>
    </FormControl>
  );

  const createEducationFormControl = (index: string) => (
    <FormControl
      fullWidth
      margin="normal"
      key={index}
      className="flex flex-col"
    >
      <div className="flex w-full">
        <TextField
          id={`degree_${index}`}
          label="Degree"
          variant="outlined"
          fullWidth
          margin="normal"
          className="w-full"
          {...register(`degree_${index}`, {
            required: "Degree is required",
          })}
          error={!!errors[`degree_${index}`]}
        />
        <IconButton
          onClick={() => removeEducationField(index)}
          aria-label="delete"
          className="ml-2 mt-2"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <TextField
        id={`institution_${index}`}
        label="Institution"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register(`institution_${index}`, {
          required: "Institution is required",
        })}
        error={!!errors[`institution_${index}`]}
      />
      <div className="flex space-x-4">
        <TextField
          id={`start_date_${index}`}
          label="Start Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
          fullWidth
          {...register(`start_date_${index}`, {
            required: "Start Date is required",
          })}
          error={!!errors[`start_date_${index}`]}
        />
        <TextField
          id={`end_date_${index}`}
          label="End Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
          fullWidth
          {...register(`end_date_${index}`, {})}
        />
      </div>
    </FormControl>
  );

  const createSkillFormControl = (index: string) => (
    <FormControl
      fullWidth
      margin="normal"
      key={index}
      className="flex flex-col"
    >
      <div className="flex w-full">
        <TextField
          id={`skill_${index}`}
          label="Skill"
          variant="outlined"
          fullWidth
          margin="normal"
          className="w-full"
          {...register(`skill_${index}`, {
            required: "Skill is required",
          })}
          error={!!errors[`skill_${index}`]}
        />
        <IconButton
          onClick={() => removeSkill(index)}
          aria-label="delete"
          className="ml-2 mt-2"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </FormControl>
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Experience" {...a11yProps(0)} />
                <Tab label="Education" {...a11yProps(1)} />
                <Tab label="Skills" {...a11yProps(2)} />
                <Tab label="About me" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              {experienceDetails.map((item, index) =>
                createExperienceFormControl(item)
              )}
              <Button onClick={addExperienceField}>
                Add experience
                <AddIcon />
              </Button>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {educationDetails.map((item, index) =>
                createEducationFormControl(item)
              )}
              <Button onClick={addEducationField}>
                Add education
                <AddIcon />
              </Button>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {skillsDetails.map((item, index) => createSkillFormControl(item))}
              <Button onClick={addNewSkill}>
                Add New Skill
                <AddIcon />
              </Button>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <FormControl fullWidth margin="normal" className="flex flex-col">
                <div className="flex w-full">
                  <TextField
                    id={`phone`}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="w-full"
                    {...register(`phone`, {})}
                    error={!!errors[`phone`]}
                  />
                </div>
                <div className="flex w-full">
                  <TextField
                    id={`email`}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="w-full"
                    {...register(`email`, {})}
                    error={!!errors[`email`]}
                  />
                </div>
                <div className="flex w-full">
                  <TextField
                    id={`nationality`}
                    label="Nationality"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="w-full"
                    {...register(`nationality`, {})}
                    error={!!errors[`nationality`]}
                  />
                </div>

                <div className="flex w-full">
                  <TextField
                    id={`languages`}
                    label="Languages"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="w-full"
                    {...register(`languages`, {})}
                    error={!!errors[`languages`]}
                  />
                </div>
              </FormControl>
            </CustomTabPanel>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            form="educationForm"
            variant="outlined"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExperienceUpdateDialog;
