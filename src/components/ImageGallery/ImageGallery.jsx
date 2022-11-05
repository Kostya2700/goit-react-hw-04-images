import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
const GalleryList = ({ searchName, onClick, children }) => {
  return (
    <ul className="ImageGallery">
      {children}
      {<GalleryItem searchName={searchName} onClick={onClick} />}
    </ul>
  );
};
export { GalleryList };
