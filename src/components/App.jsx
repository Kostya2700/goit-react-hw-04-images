import React, { Component } from 'react';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { GalleryList } from './ImageGallery/ImageGallery';
import { GalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    showModal: false,

    search: '',
  };
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
  async componentDidMount() {}
  handleSearchForm = search => {
    this.setState({ search });
  };
  render() {
    return (
      <div className="App">
        <ToastContainer autoclose={3000} />
        <Searchbar inputSearch={this.handleSearchForm} />
        <button type="button" onClick={this.toggleModal}>
          Open
        </button>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </Modal>
        )}
        <GalleryList searchName={this.state.search}>
          {
            <GalleryItem
              searchName={this.state.search}
              onClick={this.toggleModal}
            />
          }
        </GalleryList>
      </div>
    );
  }
}
