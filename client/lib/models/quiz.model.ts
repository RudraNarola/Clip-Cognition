import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      answer: {
        type: String,
        required: true,
      },
      explanation: {
        type: String,
      },
      segment: {
        type: Number,
      },
      difficulty: {
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
