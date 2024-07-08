import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";

import FormInput from "@/components/Form/FormInput/FormInput";
import Toast from "@/components/Toast/Toast";

import { TalentContext } from "@/context/talent/TalentProvider";

import { InfoType } from "@/types/InfoType";

const TalentConfirmationForm = () => {
  const { setCurrentTalent } = useContext(TalentContext);
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<InfoType | null>(null);

  const handleSubmit = async () => {
    const data = getValues();

    const isValid = await trigger();
    if (!isValid) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `/api/talent/confirm?first_name=${data.first_name}&&last_name=${data.last_name}`,
      );

      if (res.status !== 200) {
        setError({ type: "error", message: "Talent not found" });
        return;
      }

      const { talent } = res.data;
      setCurrentTalent(talent);
    } catch (e) {
      console.error(e);
      setError({ type: "error", message: "Talent not found" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    const errorTimeout = setTimeout(() => {
      setError(null);
    }, 1500);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  return (
    <div>
      <div className="mt-4 lg:mt-8 lg:px-8">
        <AnimatePresence>{error && <Toast info={error} />}</AnimatePresence>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
          <FormInput
            label="FirstName"
            register={register("first_name", {
              required: "First name is required",
            })}
            error={errors.first_name}
            disabled={loading}
            required
          />
          <FormInput
            label="LastName"
            register={register("last_name", {
              required: "Last name is required",
            })}
            error={errors.last_name}
            disabled={loading}
            required
          />
        </div>
        <div className="w-full mt-8">
          <div className="flex justify-end">
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
    </div>
  );
};

export default TalentConfirmationForm;
