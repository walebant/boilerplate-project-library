/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const Book = require('../models');

module.exports = function (app) {
  app
    .route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const books = await Book.find();
        return res.status(200).send(books);
      } catch (error) {
        return res.send(error.message);
      }
    })

    .post(async function (req, res) {
      //response will contain new book object including atleast _id and title
      const title = req.body.title;

      if (!title) return res.status(400).send('missing required field title');

      try {
        const book = new Book({ title });
        const data = await book.save();
        return res.status(200).send({ _id: data._id, title: data.title });
      } catch (error) {
        return res.send(error.message);
      }
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      try {
        await Book.deleteMany();
        return res.status(200).send('complete delete successful');
      } catch (error) {
        return res.send(error.message);
      }
    });

  app
    .route('/api/books/:id')
    .get(async function (req, res) {
      const bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        return res.status(200).send(book);
      } catch (error) {
        return res.status(404).send('no book exists');
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async function (req, res) {
      const bookid = req.params.id;
      const comment = req.body.comment;
      //json res format same as .get
      if (!comment)
        return res.status(400).send('missing required field comment');

      try {
        const book = await Book.findById(bookid);
        const updatedBook = await Book.findByIdAndUpdate(
          bookid,
          {
            comments: [...book.comments, comment],
            $inc: { commentcount: 1 },
          },
          { new: true }
        );
        return res.status(200).send(updatedBook);
      } catch (error) {
        return res.status(404).send('no book exists');
      }
    })

    .delete(async function (req, res) {
      const bookid = req.params.id;
      //if successful response will be 'delete successful'
      if (!bookid) return res.status(400).send('please input book id');

      try {
        await Book.findByIdAndDelete(bookid);
        return res.status(200).send('delete successful');
      } catch (error) {
        return res.status(404).send('no book exists');
      }
    });
};
