import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';
const GalleryList = ({ searchName, onClick, children }) => {
  return (
    <ul className="ImageGallery">
      {children}
      {<GalleryItem searchName={searchName} onClick={onClick} />}
    </ul>
  );
};
export { GalleryList };
GalleryList.propTypes = {
  searchName: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
