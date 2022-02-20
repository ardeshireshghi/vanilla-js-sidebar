/**
 * Sidebar UI component
 */
/// <reference types="node" />
declare global {
    interface Window {
        Sidebar: typeof Sidebar;
    }
}
declare enum SidebarDirection {
    LEFT = "left",
    RIGHT = "right",
    BOTTOM = "bottom",
    TOP = "top"
}
declare type SidebarPanelStyles = CSSStyleDeclaration | Record<string, CSSStyleDeclaration>;
declare type SidebarInitParam = {
    direction: SidebarDirection;
    customClassName: string;
    panelStyles: SidebarPanelStyles;
    overlayBackgroundColor: string;
};
declare type Position = {
    x: number;
    y: number;
};
interface SidebarState {
    templateRendered: boolean;
    sidebarEl?: HTMLDivElement;
    sidebarPanelEl?: HTMLDivElement;
    contentEl?: HTMLElement | HTMLCollection | string;
    touchStartPosition?: Position;
    isShown: boolean;
}
declare type SidebarId = string;
declare class Sidebar {
    direction: SidebarDirection;
    protected customClassName: string;
    protected panelStyles: SidebarPanelStyles;
    protected overlayBackgroundColor: string;
    protected state: SidebarState;
    protected id: SidebarId;
    protected touchMoveDebounceTimeout: NodeJS.Timeout | undefined;
    constructor(initialParam?: SidebarInitParam);
    static get direction(): typeof SidebarDirection;
    renderContent(elOrHTMLOrCollection: HTMLElement | HTMLCollection | string): void;
    show(): void;
    hide(): void;
    _handleTouchStart(e: TouchEvent): void;
    _handleTouchMove(e: TouchEvent): void;
    _renderTemplate(): void;
    _insertStyles(): void;
    _insertPanelCustomStyles(): void;
    _bindEvents(): void;
    _createSidebarStyles(): HTMLStyleElement;
    _updateState(newPartialState: Partial<SidebarState>): void;
    get styles(): string;
    get template(): string;
}
export default Sidebar;
