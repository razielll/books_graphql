import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails';

import { getBooksQuery } from '../queries/queries';


const displayBooks = (props, handleSelectBook) => {
  let data = props.data;
  if (data.loading) {
    return <div>Loading books</div>
  } else {
    return data.books.map(book => <li onClick={() => handleSelectBook(book.id)} key={book.id}>{book.name}</li>)
  }
};


function BookList(props) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  return (
    <div>
      <ul className="book-list">
        {displayBooks(props, setSelectedBookId)}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
};


export default graphql(getBooksQuery)(BookList);
