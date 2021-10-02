import React from 'react'

const Filters = ({ handleFilterChange, handleSortBy, sortBy, searchTerm }) => {
  return (
    <>
      <div className="filters d-flex justify-content-around" style={{ marginBottom: '40px' }}>
        <input onChange={ handleFilterChange } name="searchTerm" value={ searchTerm } placeholder=' search matches'/>
        <select onChange={handleSortBy} name="sortBy" value={sortBy}>
          <option value="title">Title</option>
          <option value="views">Views</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </>
  )
}

export default Filters