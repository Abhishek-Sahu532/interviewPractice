import mongoose from "mongoose";
import { Books } from "../models/books.models.js";


export const addBooks = async (req, res) => {
  try {
    const { bookName, authorName, category, pageNumber } = req.body;

    if ([bookName, authorName, category].some((field) => field == "")) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required details",
      });
    }

    if (!pageNumber || pageNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Page number must be greater than the zero",
      });
    }

    const existingBooks = await Books.find({ bookName: bookName });

    console.log(existingBooks);
    if (existingBooks.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please choose another name",
      });
    }

    let newBook = await Books.create({
      bookName,
      authorName,
      category,
      pageNumber,
    });

    return res.status(200).json({
      success: true,
      newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const updateBookField = async (req, res) => {
  try {
    const { bookName, authorName, category, pageNumber } = req.body;
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is missing",
      });
    }

    const existingBooks = await Books.findById(id);

    if (!existingBooks) {
      return res.status(404).json({
        success: false,
        message: `Book not found with the given id ${id}`,
      });
    }

    console.log("existingBooks", existingBooks);

    await Books.findByIdAndUpdate(id, {
      bookName: bookName || existingBooks?.bookName,
      authorName: authorName || existingBooks?.authorName,
      category: category || existingBooks?.category,
      pageNumber: pageNumber || existingBooks?.pageNumber,
    });

    let book = await Books.findById(id);
    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const deleteBookEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is missing",
      });
    }
    await Books.findByIdAndDelete(id);
    return res.status(200).json({
      success: false,
      message: `The book with the ID - ${id} is deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    // console.log(books);
    if (books?.length == 0) {
      return res.status(200).json({
        success: true,
        message: "No books found in the database. Please create one",
      });
    }

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const getDetailsByObjectId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "The ID is missing in the params",
      });
    }
    const book = await Books.findById(id);
    // console.log("book", book);
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "The book is not found with the given ID",
      });
    }
    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
