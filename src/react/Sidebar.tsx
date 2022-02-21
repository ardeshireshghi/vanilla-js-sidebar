import { useRef, useEffect } from 'react';

import SidebarComponent, { SidebarDirection } from '../sidebar';

interface SidebarProps {
  isShown: boolean;
  onHide(): void;
  onShow?(): void;
  panelStyles?: Record<string, any>;
  direction?: SidebarDirection;
  overlayBackgroundColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isShown,
  onShow,
  onHide,
  children,
  direction,
  overlayBackgroundColor,
  panelStyles = {}
}) => {
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<SidebarComponent>();

  useEffect(() => {
    if (
      sidebarContainerRef.current &&
      !(sidebarRef.current instanceof SidebarComponent)
    ) {
      sidebarRef.current = new SidebarComponent({
        direction,
        onHide,
        onShow,
        overlayBackgroundColor,
        panelStyles
      });
      sidebarRef.current.renderContent(sidebarContainerRef.current);
    }
  }, [
    sidebarContainerRef,
    onShow,
    onHide,
    direction,
    overlayBackgroundColor,
    panelStyles
  ]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (isShown) {
        sidebarRef.current.show();
      } else {
        sidebarRef.current.hide();
      }
    }
  }, [isShown, sidebarRef]);
  return <div ref={sidebarContainerRef}>{children}</div>;
};
