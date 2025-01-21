import mongoose, { Schema } from "mongoose";

const booksSchema = new Schema(
  {
    bookName: {
      type: String,
      require: true,
      trim: true,
    },
    authorName: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
      // enum:
    },
    pageNumber: {
      type: Number,
      require: [true, "Page number required"],
    },
  },
  { timestamps: true }
);

export const Books = mongoose.model("Books", booksSchema);
