import axios from "axios";
import React, { Dispatch, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";

import FormFileInput from "@/components/Form/FormFileInput/FormFileInput";
import FormInput from "@/components/Form/FormInput/FormInput";

import { TalentFormAllDataType } from "@/types/Form";
import { InfoType } from "@/types/InfoType";

interface Props {
  currentStep: number;
  error: string | null;
  setError: Dispatch<string | null>;
  loading: boolean;
  setLoading: Dispatch<boolean>;
  info: InfoType | null;
  setInfo: Dispatch<InfoType | null>;
  setCurrentStep: Dispatch<number>;
  formMethod: any;
  detailsFormMethod: any;
  traitsFormMethod: any;
  experienceFormMethod: any;
}

const TalentDocsForm: React.FC<Props> = ({
  currentStep,
  error,
  setError,
  loading,
  setLoading,
  info,
  setInfo,
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
      setLoading(true);

      const imageFile = docsFormData.image[0];
      const docFile = docsFormData.doc[0];

      const formData = new FormData();
      formData.set("file", imageFile);
      const resImg = await axios.post("/api/talent/uploads/s3", formData);
      const imageFileName = resImg.data.fileName;

      formData.set("file", docFile);
      const resDoc = await axios.post("/api/talent/uploads/s3", formData);
      const docFileName = resDoc.data.fileName;

      if (!imageFileName || !docFileName)
        throw new Error("failed to upload file to s3");

      const talentsDetailsData = detailsFormMethod.getValues();
      const talentTraitsData = traitsFormMethod.getValues();
      const talentExpData = experienceFormMethod.getValues();
      const talentDocsData = getValues();

      const talentFullData = {
        ...talentsDetailsData,
        ...talentTraitsData,
        ...talentExpData,
        ...talentDocsData,
        imageFileName,
        docFileName,
      };

      const { image, doc, ...talentFinalData }: TalentFormAllDataType =
        talentFullData;

      const res = await axios.post("/api/talent/registration", {
        talent: { ...talentFullData, imageFile, docFileName },
      });

      if (res.status !== 201) {
        setError(error);
        return;
      }

      await axios.post("/api/email/talent/registration/admin/notify", {
        talent: talentFinalData,
      });

      await axios.post("/api/email/talent/registration/talent/notify", {
        talent: talentFinalData,
      });

      setInfo({ message: "Thanks for registration!", type: "success" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // const localUpload = async () => {
  //   const docsFormData = getValues();
  //   const imageFile = docsFormData.image[0];
  //   console.log(imageFile);
  //   const docFile = docsFormData.doc[0];
  //   console.log(docFile);
  //   const formData = new FormData();
  //   formData.append("file", imageFile);
  //   const res = await axios.post(
  //     "/api/talent/uploads?action=uploadTalentDoc",
  //     formData,
  //   );
  // };

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  useEffect(() => {
    if (!info) return;
    const infoTimeout = setTimeout(() => {
      setInfo(null);
    }, 1500);

    return () => {
      clearTimeout(infoTimeout);
    };
  }, [info]);

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
            {loading ? (
              <RotatingLines
                visible={true}
                //eslint-disable-next-line
                // @ts-ignore
                height="24"
                //eslint-disable-next-line
                // @ts-ignore
                width="24"
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDocsForm;
