import exp from "constants";
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctOption: {
        type: Number,
        required: true,
      },
      explanation: {
        type: String,
      },
      points: {
        type: Number,
        required: true,
      },
    },
  ],
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      attemptedAt: {
        type: Date,
        default: Date.now,
      },
      score: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
