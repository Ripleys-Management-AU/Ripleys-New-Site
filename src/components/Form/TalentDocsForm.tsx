import React, { Dispatch } from "react";
import FormFileInput from "@/components/Form/FormFileInput/FormFileInput";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import FormInput from "@/components/Form/FormInput/FormInput";
import axios from "axios";

interface Props {
  currentStep: number;
  loading: boolean;
  setCurrentStep: Dispatch<number>;
  formMethod: any;
  detailsFormMethod: any;
  traitsFormMethod: any;
  experienceFormMethod: any;
}

const TalentDocsForm: React.FC<Props> = ({
  currentStep,
  loading,
  setCurrentStep,
  detailsFormMethod,
  traitsFormMethod,
  experienceFormMethod,
  formMethod,
}) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = formMethod;

  const handlePrev = () => {
    setCurrentStep(3);
  };

  const handleSubmit = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    const docsFormData = getValues();

    try {
      const imageFile = docsFormData.image[0];
      console.log(imageFile);

      const docFile = docsFormData.doc[0];
      console.log(docFile);

      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await axios.post(
        "/api/talent/uploads?action=uploadTalentDoc",
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        },
      );

      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-4 lg:mt-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
        <FormFileInput
          label="Image"
          register={register("image", {
            required: "Image is required",
          })}
          accept="image/png, image/jpeg"
          error={errors.image}
          disabled={loading}
          required
        />
        <FormInput
          label="Image Title"
          register={register("image_title", {
            required: "Image Title is required",
          })}
          error={errors.image_title}
          disabled={loading}
          required
        />
        <FormFileInput
          label="Document"
          register={register("doc", {
            required: "Document is required",
          })}
          accept=".pdf, .doc, .docx"
          error={errors.doc}
          disabled={loading}
          required
        />
        <FormInput
          label="Document Title"
          register={register("doc_title", {
            required: "Document Title is required",
          })}
          error={errors.doc_title}
          disabled={loading}
          required
        />
      </div>
      <div className="w-full mt-8">
        <div className="flex gap-2 justify-end">
          <button className="btn" onClick={handlePrev} disabled={loading}>
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button className="btn" onClick={handleSubmit} disabled={loading}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDocsForm;
