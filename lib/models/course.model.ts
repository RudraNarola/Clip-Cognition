import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      enrolledAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
