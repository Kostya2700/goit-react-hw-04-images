import React, { Component } from 'react';
import PropTypes from 'prop-types';
class GalleryItem extends Component {
  render() {
    const { searchName } = this.props;
    return (
      searchName &&
      searchName.map(pic => {
        return (
          <li className="ImageGalleryItem" key={pic.id}>
            <img
              id={pic.id}
              onClick={this.props.onClick}
              className="ImageGalleryItem-image"
              src={pic.webformatURL}
              alt={pic.tags}
            />
          </li>
        );
      })
    );
  }
}
export { GalleryItem };
GalleryItem.propTypes = {
  searchName: PropTypes.array.isRequired,
};
