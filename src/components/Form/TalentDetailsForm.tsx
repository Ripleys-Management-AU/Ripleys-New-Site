import React, { Dispatch, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import FormDatepicker from "@/components/Form/FormDatepicker/FormDatepicker";
import FormInput from "@/components/Form/FormInput/FormInput";
import FormSelect from "@/components/Form/FormSelect/FormSelect";

import { ADULT, CHILD, FEMALE, MALE } from "@/constants";

interface Props {
  currentStep: number;
  loading: boolean;
  setCurrentStep: Dispatch<number>;
  formMethod: any;
}

const TalentDetailsForm: React.FC<Props> = ({
  currentStep,
  loading,
  setCurrentStep,
  formMethod,
}) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = formMethod;

  const categoryValues = [
    { value: ADULT, label: "Adult" },
    { value: CHILD, label: "Child" },
  ];

  const genderValues = [
    { value: MALE, label: "Male" },
    { value: FEMALE, label: "Female" },
  ];

  const stateValues = [
    { value: 0, label: "VIC" },
    { value: 1, label: "NSW" },
    { value: 2, label: "TAS" },
    { value: 3, label: "ACT" },
    { value: 4, label: "NT" },
    { value: 5, label: "QLD" },
    { value: 6, label: "WA" },
    { value: 7, label: "SA" },
  ];

  const registrationValues = [
    { value: 0, label: "12 months registration with headshots - $320" },
    {
      value: 1,
      label: "12 months registration with headshots and showreel - $600",
    },
  ];

  const handleNext = async () => {
    console.log(getValues());

    const isValid = await trigger();
    if (!isValid) return;
    setCurrentStep(2);
  };

  return (
    <div className="mt-4 lg:mt-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
        <FormInput
          label="FirstName"
          register={register("firstName", {
            required: "First name is required",
          })}
          error={errors.firstName}
          disabled={loading}
          required
        />
        <FormInput
          label="LastName"
          register={register("lastName", {
            required: "Last name is required",
          })}
          error={errors.lastName}
          disabled={loading}
          required
        />
        <FormDatepicker
          label="Birth date"
          name="birth_date"
          error={errors.birth_date}
          disabled={loading}
          required
          control={formMethod.control}
        />
        <FormSelect
          label="Category"
          register={register("category", {
            required: "Category is required",
          })}
          error={errors.category}
          disabled={loading}
          values={categoryValues}
          required
        />
        <FormSelect
          label="Gender*"
          register={register("gender", {
            required: "Gender is required",
          })}
          error={errors.gender}
          disabled={loading}
          values={genderValues}
        />
        <FormInput
          label="Address1"
          register={register("address1", {
            required: "Address1 is required",
          })}
          error={errors.address1}
          disabled={loading}
          required
        />
        <FormInput
          label="Address2"
          register={register("address2")}
          error={errors.address2}
          disabled={loading}
        />
        <FormInput
          label="Suburb"
          register={register("suburb", { required: "Suburb is required" })}
          error={errors.suburb}
          disabled={loading}
          required
        />
        <FormSelect
          label="State*"
          register={register("state", { required: "State is required" })}
          error={errors.state}
          disabled={loading}
          values={stateValues}
        />
        <FormInput
          label="Postcode"
          register={register("postcode", { required: "Postcode is required" })}
          error={errors.postcode}
          disabled={loading}
          required
        />
        <FormInput
          label="Phone Home"
          register={register("phoneHome", {
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone number must contain only digits",
            },
          })}
          error={errors.phoneHome}
          disabled={loading}
        />
        <FormInput
          label="Phone Mobile*"
          register={register("phoneMobile", {
            required: "Phone mobile is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone number must contain only digits",
            },
          })}
          error={errors.phoneMobile}
          disabled={loading}
        />
        <FormInput
          label="Phone Work"
          register={register("phoneWork", {
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone number must contain only digits",
            },
          })}
          error={errors.phoneWork}
          disabled={loading}
        />
        <FormInput
          label="Email*"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
          disabled={loading}
        />
        <FormInput
          label="Occupation*"
          register={register("occupation", {
            required: "Occupation is required",
          })}
          error={errors.occupation}
          disabled={loading}
        />
        <FormSelect
          label="Registration*"
          register={register("registration", {
            required: "Registration is required",
          })}
          error={errors.registration}
          disabled={loading}
          values={registrationValues}
        />
      </div>
      <div className="w-full mt-8">
        <div className="flex justify-end">
          <button className="btn" onClick={handleNext} disabled={loading}>
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailsForm;
