import React, { Dispatch, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import FormMultiSelect from "@/components/Form/FormMultiSelect/FormMultiSelect";
import FormSelect from "@/components/Form/FormSelect/FormSelect";
import FormTextArea from "@/components/Form/FormTextArea/FormTextArea";

import {
  ACTOR,
  EXTRA_COMMERCIAL,
  EXTRA_COMMERCIAL_W_EXP,
  WEB_PRESENTER,
} from "@/constants";

import { TalentExpFormAttrType } from "@/types/Form";

interface Props {
  allExpOptions: TalentExpFormAttrType;
  currentStep: number;
  loading: boolean;
  setCurrentStep: Dispatch<number>;
  formMethod: any;
}

const TalentExperienceForm: React.FC<Props> = ({
  allExpOptions,
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

  const accentsRules = { required: "Accents is required" } as any;
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
          name="accents"
          label="Accents"
          control={formMethod.control}
          values={allExpOptions.accentOptions}
          disabled={loading}
          rules={{}}
          error={errors.accents}
        />
        <FormMultiSelect
          name="languages"
          label="Languages"
          control={formMethod.control}
          values={allExpOptions.languageOptions}
          disabled={loading}
          rules={{}}
          error={errors.languages}
        />
        <FormMultiSelect
          name="licenses"
          label="Licenses"
          control={formMethod.control}
          values={allExpOptions.licenseOptions}
          disabled={loading}
          rules={{}}
          error={errors.licenses}
        />
        <FormMultiSelect
          name="unions"
          label="Unions"
          control={formMethod.control}
          values={allExpOptions.unionOptions}
          disabled={loading}
          rules={{}}
          error={errors.unions}
        />
      </div>
      <div className="w-full">
        <FormTextArea
          label="Experience"
          register={register("experience", {
            required: "Experience is required",
          })}
          error={errors.experience}
          disabled={loading}
          required
        />
        <FormTextArea
          label="Training"
          register={register("showreel")}
          error={errors.showreel}
          disabled={loading}
        />
        <FormTextArea
          label="Skills & Interests"
          register={register("skills_interests", {
            required: "Skill&Interests is required",
          })}
          error={errors.skills_interests}
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
