/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const Book = require('../models');
const errors = { BAD_REQUEST: 400, NOT_FOUND: 404, INTERNAL_SERVER: 500 };

module.exports = function (app) {
  app
    .route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const books = await Book.find().select('-comments');
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
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
