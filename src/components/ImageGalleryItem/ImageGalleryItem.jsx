import React from 'react';
import PropTypes from 'prop-types';
function GalleryItem({ searchName, onClick }) {
  return (
    searchName &&
    searchName.map(({ id, largeImageURL, tags, webformatURL }) => {
      return (
        <li className="ImageGalleryItem" key={id}>
          <img
            onClick={() => {
              onClick(largeImageURL, tags);
            }}
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt={tags}
          />
        </li>
      );
    })
  );
}

export { GalleryItem };
GalleryItem.propTypes = {
  searchName: PropTypes.array.isRequired,
};
