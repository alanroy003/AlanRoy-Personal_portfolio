import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    resumeUrl: {
      type: String,
      default: "",
    },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      gmail: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
