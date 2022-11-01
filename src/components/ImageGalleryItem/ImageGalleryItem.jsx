import React, { Component } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

class GalleryItem extends Component {
  state = {
    search: '',
    arSearch: null,
    visible: false,
    page: 1,
  };
  async componentDidUpdate(pP, pS) {
    // console.log(pP.searchName);
    if (pP.searchName !== this.props.searchName) {
      // console.log('Wait');
      try {
        this.setState({ visible: true, arSearch: null });
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=29991996-b215bbe81df8b02481f14f1cd&image_type=photo&orientation=horizontal&per_page=12`
        );
        // console.log(response.data.hits);
        return this.setState({ arSearch: [...response.data.hits] });
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ visible: false });
      }
    }
  }

  render() {
    const { visible, arSearch } = this.state;
    return (
      <>
        {visible && (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%' }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {arSearch &&
          arSearch.map(ren => {
            return (
              <li className="ImageGalleryItem" key={ren.id}>
                <img
                  onClick={this.props.onClick}
                  className="ImageGalleryItem-image"
                  src={ren.webformatURL}
                  alt={ren.tags}
                />
              </li>
            );
          })}
      </>
    );
  }
}
export { GalleryItem };
