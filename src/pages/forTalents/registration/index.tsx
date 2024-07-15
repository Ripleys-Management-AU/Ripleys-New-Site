import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TalentDetailsForm from "@/components/Form/TalentDetailsForm";
import TalentDocsForm from "@/components/Form/TalentDocsForm";
import TalentExperienceForm from "@/components/Form/TalentExperienceForm";
import TalentTraitsForm from "@/components/Form/TalentTraitsForm";
import Layout from "@/components/Layout/Layout";
import Toast from "@/components/Toast/Toast";

import { mapExpDataToOptions } from "@/utils/talent";

import { TalentExpFormAttrType } from "@/types/Form";
import { InfoType } from "@/types/InfoType";

const TalentRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoType | null>(null);
  const [allExpOptions, setAllExpOptions] =
    useState<TalentExpFormAttrType | null>(null);

  const detailsFormMethod = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      category: "",
      gender: "",
      pronoun: "",
      email: "",
      address1: "",
      address2: "",
      suburb: "",
      state: "",
      postcode: "",
      phone_home: "",
      phone_mobile: "",
      phone_work: "",
      occupation: "",
      registration: "",
      birth_date: "",
    },
  });
  const traitsFormMethod = useForm({
    defaultValues: {
      ethnicity_id: 0,
      eye_colour: "",
      hair_colour: "",
      height: "",
      waist: "",
      bust: "",
      hips: "",
      shoe: "",
      dress_size: "",
      chest: "",
      suit: "",
      suit_length: "",
      shirt: "",
      collar: "",
      inside_leg: 0,
      smoker: "",
      distinctive_marks: "",
    },
  });
  const experienceFormMethod = useForm({
    defaultValues: {
      experience: "",
      showreel: "",
      skills_interests: "",
      artist_type: "",
      languages: [],
      accents: [],
      licenses: [],
      unions: [],
    },
  });
  const docsFormMethod = useForm({
    defaultValues: {
      head_shot_image: "",
      head_shot_image_title: "",
      full_body_shot_image: "",
      full_body_shot_image_title: "",
      doc: "",
      doc_title: "",
    },
  });

  useEffect(() => {
    const fetchExpAttrValues = async () => {
      try {
        const res = await axios.get(`/api/talent?action=queryTalentFormExp`);
        const { accents, languages, licenses, unions } = res.data;
        const accentOptions = mapExpDataToOptions(accents);
        const languageOptions = mapExpDataToOptions(languages);
        const licenseOptions = mapExpDataToOptions(licenses);
        const unionOptions = mapExpDataToOptions(unions);
        setAllExpOptions({
          accentOptions,
          languageOptions,
          licenseOptions,
          unionOptions,
        });
      } catch (e) {
        console.error("error get experience attributes values");
      }
    };

    fetchExpAttrValues();
  }, []);

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
        <AnimatePresence>{info && <Toast info={info} />}</AnimatePresence>
        <div className="w-4/5">
          <h1 className="text-white text-3xl">
            Registration {currentStep < 5 ? "Form" : "Completed"}
          </h1>
          <div className="text-center mt-4 text-light-grey text-md leading-8">
            <p>
              {currentStep < 5
                ? `Please complete the form to register your interest with Ripleys
              Management Australia.`
                : `Thanks for registering with Ripleys. We will be in touch soon.`}
            </p>
          </div>

          {currentStep < 5 && (
            <div className="w-full mt-4 lg:mt-16 flex justify-center font-msb-bold">
              <ul className="steps steps-horizontal lg:w-2/3">
                <li
                  className={`step duration-200 ${currentStep >= 1 ? "step-info" : ""}`}
                >
                  Details
                </li>
                <li
                  className={`step duration-200 ${currentStep >= 2 ? "step-info" : ""}`}
                >
                  Traits
                </li>
                <li
                  className={`step duration-200 ${currentStep >= 3 ? "step-info" : ""}`}
                >
                  Experience
                </li>
                <li
                  className={`step duration-200 ${currentStep >= 4 ? "step-info" : ""}`}
                >
                  Docs
                </li>
              </ul>
            </div>
          )}

          <div className="w-full">
            {currentStep === 1 && (
              <TalentDetailsForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formMethod={detailsFormMethod}
                loading={loading}
              />
            )}
            {currentStep === 2 && (
              <TalentTraitsForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formMethod={traitsFormMethod}
                loading={loading}
              />
            )}
            {allExpOptions && currentStep === 3 && (
              <TalentExperienceForm
                currentStep={currentStep}
                loading={loading}
                setCurrentStep={setCurrentStep}
                formMethod={experienceFormMethod}
                allExpOptions={allExpOptions}
              />
            )}
            {currentStep === 4 && (
              <TalentDocsForm
                currentStep={currentStep}
                detailsFormMethod={detailsFormMethod}
                traitsFormMethod={traitsFormMethod}
                experienceFormMethod={experienceFormMethod}
                formMethod={docsFormMethod}
                setCurrentStep={setCurrentStep}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                info={info}
                setInfo={setInfo}
              />
            )}
            {/*{currentStep === 5 && <div></div>}*/}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TalentRegistrationPage;
