import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Blocks, RotatingLines } from "react-loader-spinner";

import FormInput from "@/components/Form/FormInput/FormInput";
import FormSearchAndMultiSelect from "@/components/Form/FormSearchAndMultiSelect/FormSearchAndMultiSelect";
import Layout from "@/components/Layout/Layout";
import Toast from "@/components/Toast/Toast";

import { TalentType } from "@/model/types";
import { mapTalentsToOptions } from "@/utils/talent";

import { SelectionValueType } from "@/types/Form";
import { InfoType } from "@/types/InfoType";
import Head from "next/head";

const RequestTalentPage = () => {
  const [info, setInfo] = useState<InfoType | null>(null);
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [talents, setTalents] = useState<null | TalentType[]>(null);
  const [talentsOptions, setTalentsOptions] = useState<
    null | SelectionValueType[]
  >(null);

  const {
    register,
    trigger,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      selected_talents: [],
      name: "",
      organisation: "",
      phone: "",
      email: "",
      job_description: "",
    },
  });

  const talentsRules = { required: "Talents is required" } as any;

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const formData = getValues();

    try {
      setLoading(true);
      const res = await axios.post("/api/email/talent/request/notify", {
        formData,
      });
      if (res.status !== 200) throw new Error("failed to send email");
      setSubmitted(true);
      setInfo({
        message: "Request successful!",
        type: "success",
      });
    } catch (e) {
      console.error(e);
      setInfo({
        message: "Request failed, please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTalents = async () => {
      const res = await axios.get("/api/talent");
      if (res.status !== 200) return;
      setTalents(res.data.talents);
      setTalentsOptions(mapTalentsToOptions(res.data.talents));
    };
    fetchTalents();
  }, []);

  useEffect(() => {
    if (!info) return;

    const infoTimeOut = setTimeout(() => {
      setInfo(null);
    }, 1500);

    return () => {
      clearTimeout(infoTimeOut);
    };
  }, [info]);

  return (
    <Layout>
      <Head>
        <title>Request Talent | Ripleys Management Australia</title>
        <meta
          name="description"
          content="Request actors, extras, and models for your project. Top talent agency with a diverse roster."
        />
      </Head>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <AnimatePresence>{info && <Toast info={info} />}</AnimatePresence>
          {talentsOptions ? (
            <>
              <h1 className="text-white text-3xl">Request Talent</h1>
              <div className="text-center mt-4 text-light-grey text-md leading-8">
                <p>
                  {submitted
                    ? "Thanks for submitting your request. We will be in touch soon."
                    : "Complete the form below to book specific Talent."}
                </p>
              </div>
              {!submitted && (
                <>
                  <div className="w-full lg:px-8">
                    <FormSearchAndMultiSelect
                      name="selected_talents"
                      control={control}
                      rules={talentsRules}
                      label="Select Talents"
                      disabled={loading}
                      values={talentsOptions}
                      error={errors.selected_talents}
                      required
                    />
                  </div>
                  <div className="mt-4 lg:mt-8 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:mt-4">
                      <FormInput
                        label="Name"
                        register={register("name", {
                          required: "Name is required",
                        })}
                        error={errors.name}
                        disabled={loading}
                        required
                      />
                      <FormInput
                        label="Email"
                        register={register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        })}
                        error={errors.email}
                        disabled={loading}
                        required
                      />
                      <FormInput
                        label="Phone"
                        register={register("phone", {
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Phone number must contain only digits",
                          },
                        })}
                        error={errors.phone}
                        disabled={loading}
                      />
                      <FormInput
                        label="Organisation"
                        register={register("organisation")}
                        error={errors.organisation}
                        disabled={loading}
                      />
                      <FormInput
                        label="Job Description"
                        register={register("job_description")}
                        error={errors.job_description}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </>
              )}

              {!submitted && (
                <div className="w-full mt-8">
                  <div className="flex gap-2 justify-end">
                    <button
                      className="btn"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
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
              )}
            </>
          ) : (
            <div className="w-full min-h-[64vh] flex items-center justify-center">
              <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RequestTalentPage;
