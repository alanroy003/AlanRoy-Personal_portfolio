import Profile from "../models/Profile.js";

/* Helper: get or create profile */
const getOrCreateProfile = async () => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }
  return profile;
};

/* ================= RESUME ================= */

// GET resume
export const getResume = async (req, res) => {
  try {
    const profile = await getOrCreateProfile();
    res.json({ resumeUrl: profile.resumeUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / PUT resume
export const updateResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;
    const profile = await getOrCreateProfile();

    profile.resumeUrl = resumeUrl || "";
    await profile.save();

    res.json({ resumeUrl: profile.resumeUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE resume
export const deleteResume = async (req, res) => {
  try {
    const profile = await getOrCreateProfile();
    profile.resumeUrl = "";
    await profile.save();

    res.json({ message: "Resume removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= SOCIALS ================= */

// GET individual social
export const getSocial = async (req, res) => {
  try {
    const { platform } = req.params;
    const profile = await getOrCreateProfile();

    if (!(platform in profile.socials)) {
      return res.status(404).json({ error: "Social platform not supported" });
    }

    res.json({ [platform]: profile.socials[platform] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / PUT individual social
export const updateSocial = async (req, res) => {
  try {
    const { platform } = req.params;
    const { url } = req.body;
    const profile = await getOrCreateProfile();

    if (!(platform in profile.socials)) {
      return res.status(404).json({ error: "Social platform not supported" });
    }

    profile.socials[platform] = url || "";
    await profile.save();

    res.json({ [platform]: profile.socials[platform] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE individual social
export const deleteSocial = async (req, res) => {
  try {
    const { platform } = req.params;
    const profile = await getOrCreateProfile();

    if (!(platform in profile.socials)) {
      return res.status(404).json({ error: "Social platform not supported" });
    }

    profile.socials[platform] = "";
    await profile.save();

    res.json({ message: `${platform} removed` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
