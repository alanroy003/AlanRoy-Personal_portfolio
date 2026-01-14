import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tech: { type: [String], default: [] },
    github_link: { type: String, default: "" },
    Live: { type: Boolean, default: false },
    livedemo_link: { type: String, default: "" },
    highlighted: { type: Boolean, default: false },
    img: { type: Boolean, default: false },
    img_url: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
