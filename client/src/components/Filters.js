import React from 'react'

const Filters = ({ handleFilterChange, searchTerm }) => {
  return (
    <>
      <div className="filters d-flex justify-content-around" style={{ marginBottom: '40px' }}>
        <input onChange={ handleFilterChange } name="searchTerm" value={ searchTerm } placeholder=' search matches'/>
      </div>
    </>
  )
}

export default Filters