import React, { useState, useEffect } from "react";
import Card from './Card';

import Button from './Button';
import Search from './Search';


const CardList = ({ data }) => {
  const limit = 10; 
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data); 
  const [products, setProducts] = useState(data.slice(0, limit));
  // Filter products by tags
  const filterTags = (searchTerm) => {
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.title.toLowerCase().includes(searchTerm))
    );
    setFilteredData(filtered);
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  
  // Unified pagination handler
  const handlePagination = (step) => {
    const newOffset = offset + step;
    setOffset(newOffset);
    setProducts(filteredData.slice(newOffset, newOffset + limit));
  };

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-limit)}
          disabled={offset === 0} 
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(limit)}
          disabled={offset + limit >= filteredData.length} 
        />
      </div>
    </div>
  );
};

export default CardList;
