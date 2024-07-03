import React, { Dispatch, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import FormSelect from "@/components/Form/FormSelect/FormSelect";
import FormTextArea from "@/components/Form/FormTextArea/FormTextArea";

import {
  ACTOR,
  EXTRA_COMMERCIAL,
  EXTRA_COMMERCIAL_W_EXP,
  WEB_PRESENTER,
} from "@/constants";
import Select from "react-select";
import { Controller } from "react-hook-form";
import FormMultiSelect from "@/components/Form/FormMultiSelect/FormMultiSelect";

interface Props {
  currentStep: number;
  loading: boolean;
  setCurrentStep: Dispatch<number>;
  formMethod: any;
}

const TalentExperienceForm: React.FC<Props> = ({
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

  const handlePrev = () => {
    setCurrentStep(2);
  };

  const [selected, setSelected] = useState([]);

  const handleNext = async () => {
    console.log(getValues());

    const isValid = await trigger();
    if (!isValid) return;
    setCurrentStep(4);
  };

  const artistTypeValues = [
    { value: EXTRA_COMMERCIAL, label: "Extra/Commercial" },
    { value: EXTRA_COMMERCIAL_W_EXP, label: "Extra/Commercial (w/exp)" },
    { value: ACTOR, label: "Actor" },
    { value: WEB_PRESENTER, label: "Web Presenter" },
  ];

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];

  const languageRules = { required: "Language is required" } as any;

  return (
    <div className="mt-4 lg:mt-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
        <FormSelect
          label="Artist Type"
          register={register("artist_type", {
            required: "Artist type is required",
          })}
          disabled={loading}
          values={artistTypeValues}
          error={errors.artist_type}
          required
        />
        <FormMultiSelect
          name="languages"
          label="Languages"
          control={formMethod.control}
          values={options}
          disabled={loading}
          rules={languageRules}
          error={errors.languages}
          required
        />
      </div>
      <div className="w-full">
        <FormTextArea
          label="Experience"
          register={register("eye_colour", {
            required: "Experience is required",
          })}
          error={errors.eye_colour}
          disabled={loading}
          required
        />
      </div>
      <div className="w-full mt-8">
        <div className="flex gap-2 justify-end">
          <button className="btn" onClick={handlePrev} disabled={loading}>
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button className="btn" onClick={handleNext} disabled={loading}>
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentExperienceForm;
