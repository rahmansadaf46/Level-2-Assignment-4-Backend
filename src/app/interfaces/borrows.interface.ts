import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
export interface BorrowStaticMethods extends Model<IBorrow> {
  checkBookAvailability(
    bookId: string,
    quantity: number
  ): {
    success: boolean;
    message: string;
    statusCode: number;
  };
}
