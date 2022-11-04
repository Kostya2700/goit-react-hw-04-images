import React, { Component } from 'react';
class GalleryItem extends Component {
  render() {
    const { searchName } = this.props;
    return (
      searchName &&
      searchName.map(ren => {
        return (
          <li className="ImageGalleryItem" key={ren.id}>
            <img
              id={ren.id}
              onClick={this.props.onClick}
              className="ImageGalleryItem-image"
              src={ren.webformatURL}
              alt={ren.tags}
            />
          </li>
        );
      })
    );
  }
}
export { GalleryItem };
