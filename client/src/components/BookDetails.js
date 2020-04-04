import React from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';


function BookDetails(props) {

  if (!props.bookId || props.data.loading) return <div className="book-details">No book selected</div>;

  // console.log('book ->', props.data.book);

  let { book } = props.data;

  if (!book) return null;

  let { author } = book;

  return (
    <div className="book-details">
      <h1>{book.name}</h1>
      {author && (
        <>
          <h2>By {author.name} - Age: {author.age}</h2>
          <h3>Additional books by {author.name}</h3>
          <ul className="other-books">
            {author.books.map(a_Book => <li key={a_Book.id}>{a_Book.name} - {a_Book.genre}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};


export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
