import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { GalleryList } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { apiSearch } from './Fetch-api/fetch-api';
import { Loader } from './Loader/Loader';
import { useEffect } from 'react';

export function App() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [arSearch, setArSearch] = useState([]);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [alt, setAlt] = useState(null);
  const [lengthArr, setLengthArr] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(null);

  const onClickImage = (largeImg, alt) => {
    toggleModal();
    setCurrentSrc(largeImg);
    setAlt(alt);
  };
  const incrementPage = () => {
    setPage(prev => prev + 1);
  };
  const toggleModal = e => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (!search) {
      return;
    }
    const asyncAp = async () => {
      try {
        setVisible(true);

        const response = await apiSearch(search, page);
        if (response.length === 0) {
          toast.info('Images not found');
          return;
        }
        return (
          setArSearch([...arSearch, ...response]), setLengthArr(response.length)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setVisible(false);
      }
    };
    asyncAp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleSearchForm = search => {
    setSearch(search);
    setPage(1);
    setArSearch([]);
  };

  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Searchbar inputSearch={handleSearchForm} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          imgSrc={currentSrc}
          alt={alt}
          showModal={showModal}
        />
      )}
      <GalleryList searchName={arSearch} onClick={onClickImage}></GalleryList>
      {visible && <Loader bool={visible} />}
      {arSearch.length > 0 && lengthArr >= 12 && !visible && (
        <button className="Button" type="button" onClick={incrementPage}>
          Load more
        </button>
      )}
    </div>
  );
}
// }
