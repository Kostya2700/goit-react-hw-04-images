import { Oval } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = ({ bool }) => {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{
        position: 'fixed',
        // top: '50%',
        bottom: '-40px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // z-index:'10',
      }}
      wrapperClass="wrappep-oval"
      visible={bool}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
export { Loader };
Loader.propTypes = {
  bool: PropTypes.bool.isRequired,
};
