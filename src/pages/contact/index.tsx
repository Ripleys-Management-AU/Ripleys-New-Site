import { useForm } from "react-hook-form";

import Layout from "@/components/Layout/Layout";

const ContactPage = () => {
  const formContext = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center">
        <div className="w-4/5">
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

          <div className="mt-4">
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
