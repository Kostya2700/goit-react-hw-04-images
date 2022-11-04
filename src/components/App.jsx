import React, { Component } from 'react';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { GalleryList } from './ImageGallery/ImageGallery';
import { GalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { apiSearch } from './Fetch-api/fetch-api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    showModal: false,
    search: '',
    arSearch: [],
    visible: false,
    page: 1,
    currentSrc: null,
    error: null,
  };
  onClickImage = e => {
    const currentModalId = Number(e.currentTarget.id);

    // this.setState({ currentSrc: e.target.src });
    this.toggleModal();
    this.state.arSearch.map(obj => {
      if (obj.id === currentModalId) {
        return this.setState({ currentSrc: obj });
      } else {
        return null;
      }
    });
  };
  incrementPage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };
  toggleModal = e => {
    // console.log(e.target.src);
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
  async componentDidUpdate(pP, pS) {
    const { search, page } = this.state;
    // console.log(pS);
    if (pS.search !== search || pS.page !== page) {
      // console.log('Wait');
      try {
        this.setState({ visible: true, arSearch: null });
        const response = await apiSearch(search, page);
        // console.log(response);
        if (response.length === 0) {
          toast.info('Images not found');
          return;
        }
        this.setState({ page: 1 });
        return this.setState(pS => {
          // console.log(pS);
          return { arSearch: [...response] };
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ visible: false });
      }
    }
  }

  handleSearchForm = search => {
    this.setState({ search });
  };
  render() {
    return (
      <div className="App">
        <ToastContainer autoClose={3000} />
        <Searchbar inputSearch={this.handleSearchForm} />
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            imgSrc={this.state.currentSrc.largeImageURL}
          />
        )}
        <GalleryList>
          {this.state.visible && <Loader bool={this.state.visible} />}
          {
            <GalleryItem
              searchName={this.state.arSearch}
              onClick={this.onClickImage}
            />
          }
        </GalleryList>
        {this.state.arSearch && (
          <button className="Button" type="button" onClick={this.incrementPage}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
