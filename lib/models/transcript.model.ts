import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Transcript =
  mongoose.models.Transcript || mongoose.model("Transcript", transcriptSchema);

export default Transcript;
