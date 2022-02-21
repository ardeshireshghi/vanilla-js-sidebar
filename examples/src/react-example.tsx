import { useState, useCallback } from 'react';

import { Sidebar as ReactSidebar } from '../../src/react/Sidebar';

import Sidebar from '../../src/sidebar';

export default function ReactSidebarContainer() {
  const [sidebarShown, setSidebarShown] = useState<boolean>(false);
  const sidebarStyles = {
    padding: '2rem',
    '@media screen and (max-width: 400px)': {
      padding: '1rem'
    }
  };

  const onHide = useCallback(() => setSidebarShown(false), [setSidebarShown]);
  const handleBtnClick = useCallback(
    () => setSidebarShown(true),
    [setSidebarShown]
  );

  return (
    <div className="App">
      <ReactSidebar
        direction={Sidebar.direction.RIGHT}
        panelStyles={sidebarStyles}
        onHide={onHide}
        isShown={sidebarShown}
      >
        <div className="sidebar-content">
          <h1>Hello! I am a sidebar</h1>
          <p>
            The content of the sidebar goes here. You can also set the direction
            to show from TOP, BOTTOM, LEFT, or RIGHT.
          </p>
        </div>
      </ReactSidebar>
      <button onClick={handleBtnClick}>Show React sidebar</button>
    </div>
  );
}
