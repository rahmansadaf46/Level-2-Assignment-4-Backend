import { Router, Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const bookBody = req.body;
    bookBody.available = bookBody.copies > 0;
    const book = await Book.create(bookBody);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error:
        error.code === 11000 && error.keyPattern.isbn
          ? "ISBN already exists. Please use a unique ISBN."
          : error.message,
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string | undefined;
    const filterQuery = filter ? { genre: filter } : {};

    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "asc" ? 1 : -1;
    const sortQuery: [string, 1 | -1][] = [[sortBy, sortOrder]];

    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const total = await Book.countDocuments(filterQuery);
    const books = await Book.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
});

booksRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    const statusCode = book ? 200 : 404;
    res.status(statusCode).json({
      success: book ? true : false,
      message: book ? "Book retrieved successfully" : "Book not found",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error,
    });
  }
});

booksRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updateData = { ...req.body, available: req.body.copies > 0 };
    if (
      Object.prototype.hasOwnProperty.call(updateData, "copies") &&
      updateData.copies > 0
    ) {
      updateData.available = true;
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });
    const statusCode = updatedBook ? 200 : 404;
    res.status(statusCode).json({
      success: updatedBook ? true : false,
      message: updatedBook ? "Book updated successfully" : "Book not found",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error:
        error.code === 11000 && error.keyPattern.isbn
          ? "ISBN already exists. Please use a unique ISBN."
          : error.message,
    });
  }
});

booksRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);
    const statusCode = book ? 200 : 404;
    res.status(statusCode).json({
      success: book ? true : false,
      message: book ? "Book deleted successfully" : "Book not found",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
});
