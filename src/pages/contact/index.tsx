import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";

import FormInput from "@/components/Form/FormInput/FormInput";
import FormTextArea from "@/components/Form/FormTextArea/FormTextArea";
import Layout from "@/components/Layout/Layout";
import Toast from "@/components/Toast/Toast";

import config from "@/config/config";

import { InfoType } from "@/types/InfoType";

const ContactPage = () => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email_address: "",
      phone: "",
      enquiry: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<InfoType | null>(null);

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const data = getValues();
    try {
      setLoading(true);
      await axios.post(`${config.baseUrl}/api/enquiry?action=submitForm`, {
        data,
      });

      setInfo({
        message: "Your enquiry has been submitted successfully",
        type: "success",
      });
    } catch (e) {
      console.error(e);
      setInfo({
        message: "An error happened,please try again later",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <AnimatePresence>{info && <Toast info={info} />}</AnimatePresence>
          <h1 className="text-white text-3xl">Contact Us</h1>
          <div className="text-center mt-4 text-light-grey text-md leading-8">
            <p>
              Please use this form if you would like to contact Ripleys. We will
              get back to you shortly.
            </p>
            <p>
              If you need to speak with me urgently please call the agency on:
              0425 763 377.
            </p>
            <p>Alternatively, please email: rm@ripleysmanagement.com.au</p>
          </div>

          <div className="mt-4 lg:mt-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
              <FormInput
                label="Name"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
                disabled={loading}
                required
              />
              <FormInput
                label="Email Address"
                register={register("email_address", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email_address}
                disabled={loading}
                required
              />
              <FormInput
                label="Phone"
                register={register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only digits",
                  },
                })}
                error={errors.phone}
                disabled={loading}
                required
              />
            </div>
            <div className="w-full mt-8">
              <FormTextArea
                label="Enquiry/Comment"
                register={register("enquiry", {
                  required: "Comment is required",
                })}
                error={errors.enquiry}
                disabled={loading}
                required
              />
            </div>
            <button
              className="btn w-full mt-8 duration-200 bg-button-grey hover:bg-button-grey-light text-white"
              disabled={loading}
              onClick={() => {
                handleSubmit();
              }}
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
      </div>
    </Layout>
  );
};

export default ContactPage;
