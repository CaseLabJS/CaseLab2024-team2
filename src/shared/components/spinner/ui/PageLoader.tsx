import type React from 'react';

import { ThreeCircles } from 'react-loader-spinner';

const FullPageLoader: React.FC = () => {
  return (
    <div style={styles.loaderContainer}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#0056b3"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: isAppLoaded ? 1 : 0,
    transition: 'opacity 1s ease-out',
    zIndex: 9999,
  },
};

export default FullPageLoader;
