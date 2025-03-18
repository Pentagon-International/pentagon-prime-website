import axios from "axios";

export const sendEnquiryEmail = async (formData) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_LAMBDA_MAIL_URL;
    const API_KEY = process.env.NEXT_PUBLIC_LAMBDA_MAIL_API_KEY;

    const response = await axios.post(
      API_URL,
      {
        name: formData.name,
        contact_number: formData.contact_number,
        origin: formData.origin,
        destination: formData.destination,
        category: formData.typeOfBooking, 
        mail: formData.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    throw error;
  }
};
