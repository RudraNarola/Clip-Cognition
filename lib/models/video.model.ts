import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  transcriptId: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  tags: [{ type: String }],
  //   owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  viewers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      viewedAt: { type: Date, default: Date.now },
      progress: { type: Number, default: 0 },
    },
  ],
});

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;
