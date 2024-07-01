import prisma from "@/model/client";
import { EnquiryFormData } from "@/model/types";

export const addEnquiry = async (data: EnquiryFormData) => {
  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    return { enquiry, success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
