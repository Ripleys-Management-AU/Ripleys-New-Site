import React, { Dispatch } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import FormInput from "@/components/Form/FormInput/FormInput";
import FormSelect from "@/components/Form/FormSelect/FormSelect";

import { generateSelectionValues } from "@/utils/talent";

import { SelectionValueType } from "@/types/Form";

interface Props {
  currentStep: number;
  loading: boolean;
  setCurrentStep: Dispatch<number>;
  formMethod: any;
}

const TalentTraitsForm: React.FC<Props> = ({
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

  const ethnicityValues: SelectionValueType[] = [
    { value: 1, label: "Aboriginal/Torres Strait" },
    { value: 2, label: "African" },
    { value: 3, label: "African American" },
    { value: 4, label: "Cambodian" },
    { value: 5, label: "Caucasian" },
    { value: 6, label: "Chinese" },
    { value: 7, label: "East Indian" },
    { value: 8, label: "Eurasian" },
    { value: 9, label: "European" },
    { value: 10, label: "Filipino" },
    { value: 11, label: "Hispanic" },
    { value: 12, label: "Indian" },
    { value: 13, label: "Indo/American" },
    { value: 14, label: "Indonesian" },
    { value: 15, label: "Inuit/Native" },
    { value: 16, label: "Italian" },
    { value: 17, label: "Japanese" },
    { value: 18, label: "Korean" },
    { value: 19, label: "Malaysian" },
    { value: 20, label: "Maori" },
    { value: 21, label: "Middle Eastern" },
    { value: 22, label: "Mulatto" },
    { value: 23, label: "Pacific Islander" },
    { value: 24, label: "Polynesian" },
    { value: 25, label: "Russian" },
    { value: 26, label: "Scandinavian" },
    { value: 27, label: "Semitic" },
    { value: 28, label: "Singaporian" },
    { value: 29, label: "Slavic" },
    { value: 30, label: "South American" },
    { value: 31, label: "Thai" },
    { value: 32, label: "Vietnamese" },
    { value: 34, label: "Sri Lankan" },
  ];

  const eyeColorValues: SelectionValueType[] = [
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
    { value: "Blue/green", label: "Blue/green" },
    { value: "Blue/grey", label: "Blue/grey" },
    { value: "Brown", label: "Brown" },
    { value: "Brown/hazel", label: "Brown/hazel" },
    { value: "Dark brown", label: "Dark brown" },
    { value: "Green", label: "Green" },
    { value: "Green/brown", label: "Green/brown" },
    { value: "Green/hazel", label: "Green/hazel" },
    { value: "Grey", label: "Grey" },
    { value: "Hazel", label: "Hazel" },
  ];

  const hairColorValues: SelectionValueType[] = [
    { value: "Auburn", label: "Auburn" },
    { value: "Bald", label: "Bald" },
    { value: "Black", label: "Black" },
    { value: "Blonde", label: "Blonde" },
    { value: "Brown", label: "Brown" },
    { value: "Brown/red", label: "Brown/red" },
    { value: "Brunette", label: "Brunette" },
    { value: "Chestnut", label: "Chestnut" },
    { value: "Dark blonde", label: "Dark blonde" },
    { value: "Dark brown", label: "Dark brown" },
    { value: "Fair", label: "Fair" },
    { value: "Grey", label: "Grey" },
    { value: "Light brown", label: "Light brown" },
    { value: "Other", label: "Other" },
    { value: "Peroxide", label: "Peroxide" },
    { value: "Red", label: "Red" },
    { value: "Salt/pepper", label: "Salt/pepper" },
    { value: "Strawberry blonde", label: "Strawberry blonde" },
  ];

  const shirtValues: SelectionValueType[] = [
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const suitLengthValues: SelectionValueType[] = [
    { value: "L", label: "L" },
    { value: "R", label: "R" },
    { value: "S", label: "S" },
    { value: "XL", label: "XL" },
  ];

  const dressSizeValues: SelectionValueType[] = [
    { value: "6", label: "6" },
    { value: "6-8", label: "6-8" },
    { value: "8", label: "8" },
    { value: "8-10", label: "8-10" },
    { value: "10", label: "10" },
    { value: "10-12", label: "10-12" },
    { value: "12", label: "12" },
    { value: "12-14", label: "12-14" },
    { value: "14", label: "14" },
    { value: "14-16", label: "14-16" },
    { value: "16", label: "16" },
    { value: "16-18", label: "16-18" },
    { value: "18", label: "18" },
    { value: "18-20", label: "18-20" },
    { value: "20", label: "20" },
    { value: "20-22", label: "20-22" },
    { value: "22", label: "22" },
    { value: "22-24", label: "22-24" },
    { value: "24", label: "24" },
  ];

  const heightValues = generateSelectionValues(110, 215);
  const waistValues = generateSelectionValues(20, 150);
  const bustValues = generateSelectionValues(45, 150);
  const hipsValues = generateSelectionValues(45, 150);
  const chestValues = generateSelectionValues(45, 150);
  const suitValues = generateSelectionValues(30, 150);
  const collarValues = generateSelectionValues(15, 60);
  const insideLegValues = generateSelectionValues(45, 150);

  const shoeValues = generateSelectionValues(0, 45, 0.5);

  const handlePrev = () => {
    setCurrentStep(1);
  };

  const handleNext = async () => {
    console.log(getValues());

    const isValid = await trigger();
    if (!isValid) return;
    setCurrentStep(3);
  };

  return (
    <div className="mt-4 lg:mt-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
        <FormSelect
          label="Ethnic Appearance"
          register={register("ethnicity_id", {
            required: "Ethnicity is required",
          })}
          error={errors.ethnicity_id}
          disabled={loading}
          values={ethnicityValues} // 需要定义 ethnicityValues
          required
        />
        <FormSelect
          label="Eye Colour"
          register={register("eye_colour", {
            required: "Eye Colour is required",
          })}
          error={errors.eye_colour}
          disabled={loading}
          values={eyeColorValues}
          required
        />
        <FormSelect
          label="Hair Colour"
          register={register("hair_colour", {
            required: "Hair Colour is required",
          })}
          error={errors.hair_colour}
          disabled={loading}
          values={hairColorValues}
          required
        />
        <FormSelect
          label="Height"
          register={register("height", {
            required: "Height is required",
          })}
          error={errors.height}
          disabled={loading}
          required
          values={heightValues}
        />
        <FormSelect
          label="Waist"
          register={register("waist")}
          error={errors.waist}
          disabled={loading}
          values={waistValues}
        />
        <FormSelect
          label="Bust"
          register={register("bust")}
          error={errors.bust}
          disabled={loading}
          values={bustValues}
        />
        <FormSelect
          label="Hips"
          register={register("hips")}
          error={errors.hips}
          disabled={loading}
          values={hipsValues}
        />
        <FormSelect
          label="Shoe"
          register={register("shoe")}
          error={errors.shoe}
          disabled={loading}
          values={shoeValues}
        />
        <FormSelect
          label="Dress Size"
          register={register("dress_size")}
          error={errors.dress_size}
          disabled={loading}
          values={dressSizeValues}
        />
        <FormSelect
          label="Chest"
          register={register("chest")}
          error={errors.chest}
          disabled={loading}
          values={chestValues}
        />
        <FormSelect
          label="Suit"
          register={register("suit")}
          error={errors.suit}
          disabled={loading}
          values={suitValues}
        />
        <FormSelect
          label="Suit Length"
          register={register("suit_length")}
          error={errors.suit_length}
          disabled={loading}
          values={suitLengthValues}
        />
        <FormSelect
          label="Shirt"
          register={register("shirt")}
          error={errors.shirt}
          disabled={loading}
          values={shirtValues}
        />
        <FormSelect
          label="Collar"
          register={register("collar")}
          error={errors.collar}
          disabled={loading}
          values={collarValues}
        />
        <FormSelect
          label="Inside Leg"
          register={register("inside_leg", {
            required: "Inside Leg is required",
          })}
          error={errors.inside_leg}
          disabled={loading}
          required
          values={insideLegValues}
        />
        <FormSelect
          label="Smoker"
          register={register("smoker", {
            required: "Smoker is required",
          })}
          error={errors.smoker}
          disabled={loading}
          values={[
            { value: 0, label: "No" },
            { value: 1, label: "Yes" },
          ]}
          required
        />
        <FormInput
          label="Distinctive Marks"
          register={register("distinctive_marks")}
          error={errors.distinctive_marks}
          disabled={loading}
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

export default TalentTraitsForm;
