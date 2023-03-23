/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const Book = require("../models");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      try {
        const books = await Book.find();
        const modifiedBooks = books.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        }));
        return res.status(200).send(modifiedBooks);
      } catch (error) {
        return res.send(error.message);
      }
    })

    .post(async function (req, res) {
      const title = req.body.title;
      if (!title) return res.send("missing required field title");

      try {
        const book = new Book({ title });
        const data = await book.save();
        return res.status(200).send({ _id: data._id, title: data.title });
      } catch (error) {
        return res.send(error.message);
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany();
        return res.status(200).send("complete delete successful");
      } catch (error) {
        return res.send(error.message);
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      const bookid = req.params.id;

      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send("no book exists");
        }

        const result = {
          _id: book._id,
          title: book.title,
          comments: book.comments,
        };
        return res.status(200).send(result);
      } catch (error) {
        return res.status(500).send("no book exists");
      }
    })

    .post(async function (req, res) {
      const bookid = req.params.id;
      const comment = req.body.comment;
      if (!comment) {
        return res.send("missing required field comment");
      }
      // if (!bookid) {
      //   return res.status(400).send("missing required field id");
      // }

      try {
        const updatedBook = await Book.findByIdAndUpdate(
          bookid,
          {
            $push: { comments: comment },
          },
          { new: true }
        );
        if (!updatedBook) return res.send("no book exists");
        return res.status(200).send(updatedBook);
      } catch (error) {
        return res.status(404).send("no book exists");
      }
    })

    .delete(async function (req, res) {
      const bookid = req.params.id;
      try {
        const book = await Book.findByIdAndDelete(bookid);
        if (!book) return res.send("no book exists");

        return res.send("delete successful");
      } catch (error) {
        return res.status(404).send("no book exists");
      }

      // [Error: no book exists]
      // [Error: missing required field comment]
      // [Error: expected 'delete successful' to equal 'no book exists']
      // [Error: expected { status: 'unavailable' } to be an array]
    });
};
