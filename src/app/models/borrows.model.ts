import { model, Schema } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "../interfaces/borrows.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v: Date) {
          return v > new Date();
        },
        message: "Due date must be in the future",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.statics.checkBookAvailability = async function (
  bookId: string,
  quantity: number
) {
  const existingBook = await Book.findById(bookId);
  if (!existingBook) {
    const errorMessage = `Book not found`;
    return {
      success: false,
      message: errorMessage,
      statusCode: 404,
    };
  } else if (existingBook.copies < quantity || !existingBook.available) {
    const errorMessage = "Not enough copies available for this book";
    return {
      success: false,
      message: errorMessage,
      statusCode: 400,
    };
  } else {
    return {
      success: true,
      message: "Book borrowed successfully",
      statusCode: 201,
    };
  }
};

borrowSchema.post("save", async function (doc, next) {
  const body = doc;
  await Book.decrementCopiesAndSetAvailability(
    String(body.book),
    body.quantity
  );
  next();
});

export const Borrow = model<IBorrow, BorrowStaticMethods>(
  "Borrow",
  borrowSchema
);
