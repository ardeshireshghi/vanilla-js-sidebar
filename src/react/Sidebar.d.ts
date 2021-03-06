/// <reference types="react" />
import { SidebarDirection } from '../sidebar';
interface SidebarProps {
    isShown: boolean;
    onHide(): void;
    onShow?(): void;
    panelStyles?: Record<string, any>;
    direction?: SidebarDirection;
    overlayBackgroundColor?: string;
}
export declare const Sidebar: React.FC<SidebarProps>;
export {};
