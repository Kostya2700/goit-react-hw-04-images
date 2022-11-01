import React from 'react';
const GalleryList = ({ children }) => {
  return (
    <ul className="ImageGallery">
      {children}
      {/* <button type="button">Load more</button> */}
    </ul>
  );
};
export { GalleryList };
