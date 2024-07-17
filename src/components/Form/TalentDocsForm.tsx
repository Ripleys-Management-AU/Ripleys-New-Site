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

      const headShotImageFile = docsFormData.head_shot_image[0];
      const fullBodyShotImageFile = docsFormData.full_body_shot_image[0];
      const docFile = docsFormData.doc[0];

      const formData = new FormData();
      formData.set("file", headShotImageFile);
      const resHeadImg = await axios.post("/api/talent/uploads/s3", formData);
      const headShotImageFileName = resHeadImg.data.fileName;

      let fullBodyShotImageFileName = null;
      if (fullBodyShotImageFile && fullBodyShotImageFile !== "") {
        formData.set("file", fullBodyShotImageFile);
        const resFullBodyImage = await axios.post(
          "/api/talent/uploads/s3",
          formData,
        );
        fullBodyShotImageFileName = resFullBodyImage.data.fileName;
      }

      let docFileName = null;
      if (docFile && docFile !== "") {
        formData.set("file", docFile);
        const resDoc = await axios.post("/api/talent/uploads/s3", formData);
        docFileName = resDoc.data.fileName;
      }

      if (!headShotImageFileName)
        throw new Error("failed to upload file to s3");

      if (
        fullBodyShotImageFile &&
        fullBodyShotImageFile !== "" &&
        !fullBodyShotImageFileName
      )
        throw new Error("failed to upload full body shot to s3");

      if (docFile && docFile !== "" && !docFileName)
        throw new Error("failed to upload resume to s3");

      const talentsDetailsData = detailsFormMethod.getValues();
      const talentTraitsData = traitsFormMethod.getValues();
      const talentExpData = experienceFormMethod.getValues();
      const talentDocsData = getValues();

      const talentFullData = {
        ...talentsDetailsData,
        ...talentTraitsData,
        ...talentExpData,
        ...talentDocsData,
        headShotImageFileName,
        ...(fullBodyShotImageFileName && { fullBodyShotImageFileName }),
        ...(docFileName && { docFileName }),
      };

      const {
        head_shot_image,
        full_body_shot_image,
        doc,
        ...talentFinalData
      }: TalentFormAllDataType = talentFullData;

      const res = await axios.post("/api/talent/registration", {
        talent: {
          ...talentFullData,
          headShotImageFileName,
          ...(fullBodyShotImageFileName && { fullBodyShotImageFileName }),
          ...(docFileName && { docFileName }),
        },
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

      setInfo({
        message: "Thanks for registering! We will be in tough very soon!",
        type: "success",
      });
      setCurrentStep(5);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nonUrlPattern = /^(?!.*(http:\/\/|https:\/\/|www\.))[^\s]+$/;

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

  return (
    <div className="mt-4 lg:mt-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
        <FormFileInput
          label="Head Shot"
          register={register("head_shot_image", {
            required: "Image is required",
          })}
          accept="image/png, image/jpeg, image/jpg"
          error={errors.head_shot_image}
          disabled={loading}
          required
        />
        <FormInput
          label="Head Shot File Name"
          register={register("head_shot_image_title", {
            pattern: {
              value: nonUrlPattern,
              message: "Links are not allowed",
            },
          })}
          error={errors.head_shot_image_title}
          disabled={loading}
        />
        <FormFileInput
          label="Full Body Shot"
          register={register("full_body_shot_image")}
          accept="image/png, image/jpeg"
          error={errors.full_body_shot_image}
          disabled={loading}
        />
        <FormInput
          label="Full Body Shot File Name"
          register={register("full_body_shot_image_title", {
            pattern: {
              value: nonUrlPattern,
              message: "Links are not allowed",
            },
          })}
          error={errors.full_body_shot_image_title}
          disabled={loading}
        />
        <FormFileInput
          label="Resume"
          register={register("doc")}
          accept=".pdf, .doc, .docx"
          error={errors.doc}
          disabled={loading}
        />
        <FormInput
          label="Resume File Name"
          register={register("doc_title", {
            pattern: {
              value: nonUrlPattern,
              message: "Links are not allowed",
            },
          })}
          error={errors.doc_title}
          disabled={loading}
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
