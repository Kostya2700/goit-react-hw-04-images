import React, { Component } from 'react';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { GalleryList } from './ImageGallery/ImageGallery';
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
    const currentImg = Number(e.currentTarget.id);
    // console.log(e.target.src);
    // this.setState({ currentSrc: e.target.src });
    this.toggleModal();
    this.state.arSearch.map(img => {
      if (img.id === currentImg) {
        // console.log(img);
        return this.setState({ currentSrc: img });
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
        this.setState({ visible: true });
        const response = await apiSearch(search, page);
        // console.log(response);
        if (response.length === 0) {
          toast.info('Images not found');
          return;
        }

        return this.setState(pS => {
          return { arSearch: [...this.state.arSearch, ...response] };
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ visible: false });
      }
    }
  }

  handleSearchForm = search => {
    this.setState({ search, page: 1, arSearch: [] });
  };
  render() {
    const { arSearch, visible, showModal, currentSrc } = this.state;
    return (
      <div className="App">
        <ToastContainer autoClose={3000} />
        <Searchbar inputSearch={this.handleSearchForm} />
        {showModal && <Modal onClose={this.toggleModal} imgSrc={currentSrc} />}
        <GalleryList searchName={arSearch} onClick={this.onClickImage}>
          {visible && <Loader bool={visible} />}
        </GalleryList>
        {arSearch.length > 0 && arSearch.length >= 12 && !visible && (
          <button className="Button" type="button" onClick={this.incrementPage}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
