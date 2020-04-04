import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright'

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


const displayAuthors = (props) => {
  let data = props.getAuthorsQuery;
  if (data.loading) {
    return null;
  } else {
    return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
  }
};


function AddBook(props) {
  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [authorId, setBookAuthorId] = useState('');


  const handleSubmit = (e) => {

    e.preventDefault();

    props.addBookMutation({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });

    resetForm();
  };


  const resetForm = () => {
    setBookName('');
    setBookGenre('');
    setBookAuthorId('');
  };


  return (
    <form onSubmit={handleSubmit} className="add-book">

      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setBookName(e.target.value)} value={bookName} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setBookGenre(e.target.value)} value={bookGenre} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={e => setBookAuthorId(e.target.value)}>
          <option disabled value={''}>Select author</option>
          {displayAuthors(props)}
        </select>
      </div>

      <button>+</button>

    </form>
  );
};


// export default graphql(getAuthorsQuery)(AddBook);
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
