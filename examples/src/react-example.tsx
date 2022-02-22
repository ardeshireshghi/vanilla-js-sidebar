import { useState, useCallback } from 'react';

import { Sidebar as ReactSidebar } from '../../src/react/Sidebar';

import Sidebar from '../../src/sidebar';

export default function ReactSidebarContainer() {
  const [sidebarShown, setSidebarShown] = useState<boolean>(false);
  const sidebarStyles = {
    padding: '2rem',
    maxHeight: '50vh',
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
        direction={Sidebar.direction.BOTTOM}
        panelStyles={sidebarStyles}
        onHide={onHide}
        isShown={sidebarShown}
      >
        <div className="sidebar-content">
          <h1>Hello! I am a sidebar</h1>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 7</li>
            <li>Item 8</li>
            <li>Item 9</li>
            <li>Item 10</li>
            <li>Item 11</li>
            <li>Item 12</li>
            <li>Item 13</li>
            <li>Item 14</li>
            <li>Item 15</li>
            <li>Item 16</li>
            <li>Item 17</li>
            <li>Item 18</li>
            <li>Item 19</li>
          </ul>
        </div>
      </ReactSidebar>
      <button onClick={handleBtnClick}>Show React sidebar</button>
    </div>
  );
}
