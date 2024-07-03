import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TalentDetailsForm from "@/components/Form/TalentDetailsForm";
import TalentTraitsForm from "@/components/Form/TalentTraitsForm";
import Layout from "@/components/Layout/Layout";
import TalentExperienceForm from "@/components/Form/TalentExperienceForm";
import axios from "axios";
import config from "@/config/config";

const TalentRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [loading, setLoading] = useState(false);

  const detailsFormMethod = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      gender: "",
      email: "",
      phone: "",
      enquiry: "",
      address1: "",
      address2: "",
      suburb: "",
      state: "",
      postcode: "",
      phoneHome: "",
      phoneMobile: "",
      phoneWork: "",
      occupation: "",
      registration: "",
      birth_date: "",
    },
  });
  const traitsFormMethod = useForm({
    defaultValues: {
      ethnicity_id: "",
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
      inside_leg: "",
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
      accent_id: "",
      license_id: "",
      union_id: "",
    },
  });

  useEffect(() => {
    const fetchExpAttrValues = async () => {
      try {
        const res = await axios.get(
          `${config.baseUrl}/api/talent?action=queryTalentFormExp`,
        );
        const { accents, languages, licenses, unions } = res.data;
      } catch (e) {
        console.error("error get experience attributes values");
      }
    };

    fetchExpAttrValues();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <h1 className="text-white text-3xl">Registration Form</h1>
          <div className="text-center mt-4 text-light-grey text-md leading-8">
            <p>
              Please complete the form to register your interest with Ripleys
              Management Australia.
            </p>
          </div>

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
            {currentStep === 3 && (
              <TalentExperienceForm
                currentStep={currentStep}
                loading={loading}
                setCurrentStep={setCurrentStep}
                formMethod={experienceFormMethod}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TalentRegistrationPage;
