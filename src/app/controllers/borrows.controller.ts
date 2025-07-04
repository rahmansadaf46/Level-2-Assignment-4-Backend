import { Request, Response, Router } from "express";
import { Borrow } from "../models/borrows.model";

export const borrowsRoutes = Router();

borrowsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const checkAvailability = await Borrow.checkBookAvailability(
      body.book,
      body.quantity
    );
    let borrow = null;
    if (checkAvailability.success) {
      borrow = await Borrow.create(body);
    }
    res.status(checkAvailability.statusCode).json({
      success: checkAvailability.success,
      message: checkAvailability.message,
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

borrowsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      { $group: { _id: "$book", count: { $sum: "$quantity" } } },
      {
        $project: {
          _id: 0,
          book: {
            title: "$_id.title",
            isbn: "$_id.isbn",
          },
          totalQuantity: "$count",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
});
