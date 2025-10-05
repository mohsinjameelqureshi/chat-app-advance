import { ApiError } from "../utils/apiError.js";
import { resendClient, sender } from "../utils/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

const sendWelcomeEmail = async (email, name, clientUrl) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chatify!",
    html: createWelcomeEmailTemplate(name, clientUrl),
  });

  if (error) {
    console.error("Resend error:", error);
    throw new ApiError(500, error.message || "Failed to send welcome email");
  }
  console.log("Welcome Email send successfully");
};

export { sendWelcomeEmail };
