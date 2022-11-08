import { useState } from 'react';
import { toast } from 'react-toastify';

function Searchbar({ inputSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    setSearch(e.currentTarget.value.toLowerCase());
    // this.setState({ search: e.currentTarget.value.toLowerCase() });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      toast.error('Please write search');
      return;
    }
    inputSearch(search);
    setSearch('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={handleSearch}
          value={search}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export { Searchbar };
