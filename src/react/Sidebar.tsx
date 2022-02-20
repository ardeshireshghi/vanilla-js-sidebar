import { useRef, useEffect } from 'react';

import SidebarComponent, { SidebarDirection } from '../sidebar';

interface SidebarProps {
  isShown: boolean;
  onHide(): void;
  onShow?(): void;
  panelStyles?: Record<string, any>;
  direction?: SidebarDirection;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isShown,
  onShow,
  onHide,
  children,
  direction,
  panelStyles = {}
}) => {
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<SidebarComponent>();

  useEffect(() => {
    if (sidebarContainerRef.current) {
      sidebarRef.current = new SidebarComponent({
        direction,
        onHide,
        onShow,
        panelStyles
      });
      sidebarRef.current.renderContent(sidebarContainerRef.current);
    }
  }, [sidebarContainerRef, onShow, onHide, direction, panelStyles]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (isShown) {
        sidebarRef.current.show();
      } else {
        sidebarRef.current.hide();
      }
    }
  }, [isShown, onHide, sidebarRef]);
  return <div ref={sidebarContainerRef}>{children}</div>;
};
