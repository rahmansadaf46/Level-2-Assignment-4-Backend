import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook, BookStaticMethods>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      uppercase: true,
      required: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Genre must be one of the predefined values",
      },
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return (v.length === 10 || v.length === 13) && /^\d+$/.test(v);
        },
        message:
          "ISBN must be exactly 10 or 13 digits and contain only numbers",
      },
    },
    description: { type: String, default: "", trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.statics.decrementCopiesAndSetAvailability = async function (
  bookId: string,
  quantity: number
) {
  const updatedBook = await this.findByIdAndUpdate(
    bookId,
    { $inc: { copies: -quantity } },
    { new: true }
  );
  if (updatedBook && updatedBook.copies === 0) {
    await this.findByIdAndUpdate(bookId, { available: false });
  }
};

export const Book = model<IBook, BookStaticMethods>("Book", bookSchema);
