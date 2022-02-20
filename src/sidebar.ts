/**
 * Sidebar UI component
 */

enum SidebarDirection {
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  TOP = 'top'
}
type SidebarPanelStyles =
  | CSSStyleDeclaration
  | Record<string, CSSStyleDeclaration>;

type SidebarInitParam = {
  direction: SidebarDirection;
  customClassName: string;
  panelStyles: SidebarPanelStyles;
  overlayBackgroundColor: string;
  onShow?(): void;
  onHide?(): void;
};

type Position = {
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

type SidebarId = string;

const ClassNames = {
  SIDEBAR: 'js-sidebar',
  SIDEBAR_PANEL_JS: 'js-sidebar__panel',
  SIDEBAR_PANEL: 'sidebar__panel',
  SIDEBAR_SHOWN: 'sidebar--shown',
  SIDEBAR_HIDDEN: 'sidebar--hidden',
  SIDEBAR_HIDING: 'sidebar--hiding',
  SIDEBAR_PANEL_BASE_ANIMATION_OUT: 'sidebar__panel--out-animation',
  SIDEBAR_PANEL_BASE_ANIMATION_IN: 'sidebar__panel--in-animation'
};

const sidebarDefaultInitialParam = Object.freeze({
  direction: SidebarDirection.RIGHT,
  customClassName: '',
  panelStyles: {},
  overlayBackgroundColor: 'rgba(65, 68, 92, 0.51)'
});

const SIDEBAR_TOUCH_HIDE_THRESHOLD = 25;

class Sidebar {
  public direction: SidebarDirection;
  protected customClassName: string;
  protected panelStyles: SidebarPanelStyles;
  protected overlayBackgroundColor: string;
  protected state: SidebarState;
  protected id: SidebarId;
  protected touchMoveDebounceTimeout: NodeJS.Timeout | undefined;
  protected onShow: () => void | undefined;
  protected onHide: () => void | undefined;

  constructor(initialParam?: SidebarInitParam) {
    const { direction, customClassName, panelStyles, overlayBackgroundColor } =
      {
        ...sidebarDefaultInitialParam,
        ...initialParam
      };
    this.direction = direction;
    this.customClassName = customClassName;
    this.panelStyles = panelStyles;
    this.overlayBackgroundColor = overlayBackgroundColor;

    this.onShow = initialParam?.onShow ? initialParam?.onShow : () => {};
    this.onHide = initialParam?.onHide ? initialParam?.onHide : () => {};

    this.state = {
      templateRendered: false,
      isShown: false
    };
    this.id = `sidebar-${Math.round(Math.random() * 10000000)}`;
    this._insertStyles();
    this._renderTemplate();
  }

  static get direction() {
    return SidebarDirection;
  }

  renderContent(elOrHTMLOrCollection: HTMLElement | HTMLCollection | string) {
    // Don't need to render when the same element reference or value is passed
    if (
      elOrHTMLOrCollection === this.state.contentEl ||
      !this.state.sidebarPanelEl
    ) {
      return;
    }
    this.state.sidebarPanelEl.innerHTML = '';
    if (elOrHTMLOrCollection instanceof HTMLElement) {
      this.state.sidebarPanelEl.appendChild(elOrHTMLOrCollection);
    } else if (elOrHTMLOrCollection instanceof HTMLCollection) {
      this.state.sidebarPanelEl.append(...Array.from(elOrHTMLOrCollection));
    } else if (typeof elOrHTMLOrCollection === 'string') {
      this.state.sidebarPanelEl.innerHTML = elOrHTMLOrCollection;
    }

    this._updateState({
      contentEl: elOrHTMLOrCollection
    });
  }

  show() {
    if (this.state.isShown) {
      return;
    }

    const { sidebarEl, sidebarPanelEl } = this.state;

    sidebarEl?.classList.remove(ClassNames.SIDEBAR_HIDDEN);
    sidebarPanelEl?.classList.remove(
      `${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_OUT}--${this.direction}`
    );
    sidebarPanelEl?.classList.add(
      `${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_IN}--${this.direction}`
    );

    this._updateState({
      isShown: true
    });

    this.onShow();
  }

  hide() {
    if (!this.state.isShown) {
      return;
    }

    const { sidebarEl, sidebarPanelEl } = this.state;

    sidebarPanelEl?.classList.add(
      `${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_OUT}--${this.direction}`
    );
    sidebarPanelEl?.classList.remove(
      `${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_IN}--${this.direction}`
    );

    sidebarEl?.classList.add(ClassNames.SIDEBAR_HIDING);
    sidebarEl?.addEventListener(
      'animationend',
      () => {
        sidebarEl?.classList.add(ClassNames.SIDEBAR_HIDDEN);
        sidebarEl?.classList.remove(ClassNames.SIDEBAR_HIDING);
      },
      {
        once: true
      }
    );

    this._updateState({
      isShown: false
    });

    this.onHide();
  }
  _handleTouchStart(e: TouchEvent) {
    this._updateState({
      touchStartPosition: {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    });
  }

  _handleTouchMove(e: TouchEvent) {
    if (this.touchMoveDebounceTimeout) {
      clearTimeout(this.touchMoveDebounceTimeout);
    }

    this.touchMoveDebounceTimeout = setTimeout(() => {
      const diff = {
        x: e.touches[0].clientX - (this.state.touchStartPosition?.x || 0),
        y: e.touches[0].clientY - (this.state.touchStartPosition?.y || 0)
      };

      switch (this.direction) {
        case SidebarDirection.BOTTOM:
          if (diff.y >= SIDEBAR_TOUCH_HIDE_THRESHOLD) {
            this.hide();
          }
          break;
        case SidebarDirection.TOP:
          if (diff.y <= -SIDEBAR_TOUCH_HIDE_THRESHOLD) {
            this.hide();
          }
          break;
        case SidebarDirection.LEFT:
          if (diff.x <= -SIDEBAR_TOUCH_HIDE_THRESHOLD) {
            this.hide();
          }
          break;
        case SidebarDirection.RIGHT:
          if (diff.x >= SIDEBAR_TOUCH_HIDE_THRESHOLD) {
            this.hide();
          }
          break;
      }
    }, 50);
  }

  _renderTemplate() {
    if (document.readyState === 'loading' || !document.body) {
      throw new Error('Document not ready, cannot access DOM');
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;

    const sidebarEl = wrapper.querySelector(
      `.${ClassNames.SIDEBAR}`
    ) as HTMLDivElement;
    const sidebarPanelEl = wrapper.querySelector(
      `.${ClassNames.SIDEBAR_PANEL_JS}`
    ) as HTMLDivElement;

    sidebarPanelEl.id = this.id + '-panel';
    sidebarEl.id = this.id;
    sidebarPanelEl.classList.add(
      `${ClassNames.SIDEBAR_PANEL}--${this.direction}`
    );

    // Adds custom class name to the panel
    if (this.customClassName !== '') {
      sidebarPanelEl.classList.add(this.customClassName);
    }

    document.body.prepend(sidebarEl as HTMLElement);

    this._updateState({
      templateRendered: true,
      sidebarEl,
      sidebarPanelEl
    });

    this._bindEvents();
  }

  _insertStyles() {
    document.head.append(this._createSidebarStyles());

    // Add custom styles if they are defined
    if (Object.keys(this.panelStyles).length > 0) {
      this._insertPanelCustomStyles();
      return;
    }
  }

  _insertPanelCustomStyles() {
    insertCustomStyles(
      `#${this.id}.${ClassNames.SIDEBAR_PANEL}`,
      this.panelStyles
    );
  }

  _bindEvents() {
    const { sidebarEl, sidebarPanelEl } = this.state;

    // Close sidebar event
    sidebarEl?.addEventListener('click', (event) => {
      const target: HTMLElement = event.target as HTMLElement;

      if (
        target !== sidebarPanelEl &&
        target.contains(sidebarPanelEl as Node)
      ) {
        this.hide();
      }
    });

    sidebarPanelEl?.addEventListener(
      'touchstart',
      this._handleTouchStart.bind(this),
      { passive: false }
    );
    sidebarPanelEl?.addEventListener(
      'touchmove',
      this._handleTouchMove.bind(this),
      { passive: false }
    );
  }

  _createSidebarStyles() {
    const style = document.createElement('style');
    style.innerHTML = this.styles;
    return style;
  }

  _updateState(newPartialState: Partial<SidebarState>) {
    this.state = { ...this.state, ...newPartialState };
  }

  get styles() {
    return createStyles(this.id, this.overlayBackgroundColor);
  }

  get template() {
    return `<div class="js-sidebar sidebar sidebar--hidden">
      <div class="sidebar__panel js-sidebar__panel">
        <!-- sidebar content goes here-->
      </div>
    </div>`;
  }
}

/*
    * Styles are objects of key values and they can have media
    * queries as the keys
    * 
    * Example:
    * 
      {
        backgroundColor: '#fefeff',
        padding: '2rem',
        '@media screen and (max-width: 400px)': {
          padding: '1rem'
        }
      }
    */

function insertCustomStyles(
  selector: string,
  styles: CSSStyleDeclaration | Record<string, CSSStyleDeclaration>
) {
  const customStyles = document.createElement('style');
  document.head.appendChild(customStyles);
  document.head.style;
  const styleSheet = customStyles.sheet as CSSStyleSheet;

  Object.entries(styles).forEach(
    ([ruleName, valueOrStyles]: [
      string,
      string | Record<string, CSSStyleDeclaration>
    ]) => {
      const ruleKababCase = ruleName.replace(/([A-Z])/g, (match) =>
        `-${match}`.toLowerCase()
      );

      if (
        ruleKababCase.startsWith('@media') &&
        typeof valueOrStyles === 'object'
      ) {
        let rule = `
              ${ruleKababCase} {
                ${selector} {`;

        rule = Object.keys(valueOrStyles).reduce((result, mediaRuleName) => {
          const mediaRuleValue = valueOrStyles[mediaRuleName];
          const mediaRuleNameKababCase = mediaRuleName.replace(
            /([A-Z])/g,
            (match) => `-${match}`.toLowerCase()
          );

          result += `${mediaRuleNameKababCase}: ${mediaRuleValue};\n`;
          return result;
        }, rule);

        rule += `}
            }`;

        styleSheet.insertRule(rule, styleSheet.cssRules.length);
      } else {
        styleSheet.insertRule(
          `${selector} { ${ruleKababCase}: ${valueOrStyles}}`,
          styleSheet.cssRules.length
        );
      }
    }
  );
}

function createStyles(id: string, sidebarOverlayBackgroundColor: string) {
  return `

.sidebar {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.25s;
  animation: fadeIn 0.25s;
  animation-fill-mode: forwards;
}

#${id}.sidebar {
  background-color: ${sidebarOverlayBackgroundColor};
}

.sidebar--hidden {
  display: none;
}

.sidebar--hiding {
  animation: fadeOut 0.25s;
}

#${id}-panel.sidebar__panel {
  background-color: white;
  position: absolute;
  box-shadow: rgb(67 90 111 / 30%) 0px 0px 1px,
    rgb(67 90 111 / 47%) 0px 16px 24px -8px;

  transition: transform 0.25s ease;
  will-change: transform;
}

.sidebar__panel--right {
  transform: translateX(100%);
  right: 0;
  max-width: 90%;
  height: 100%;
  overflow: auto;
}

.sidebar__panel--bottom {
  transform: translateY(100%);
  bottom: 0;
  max-height: 90%;
  width: 100%;
}

.sidebar__panel--top {
  transform: translateY(-100%);
  top: 0;
  max-height: 90%;
  width: 100%;
}

.sidebar__panel--left {
  transform: translateX(-100%);
  left: 0;
  max-width: 90%;
  height: 100%;
  overflow: auto;
}

.sidebar__panel--in-animation--right {
  animation-duration: 0.35s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideInFromRight;
}

.sidebar__panel--out-animation--right {
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideOutFromRight;
}

.sidebar__panel--in-animation--left {
  animation-duration: 0.35s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideInFromLeft;
}

.sidebar__panel--out-animation--left {
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideOutFromLeft;
}

.sidebar__panel--in-animation--bottom {
  animation-duration: 0.35s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideInFromBottom;
}

.sidebar__panel--out-animation--bottom {
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideOutFromBottom;
}

.sidebar__panel--in-animation--top {
  animation-duration: 0.35s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideInFromTop;
}

.sidebar__panel--out-animation--top {
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-name: slideOutFromTop;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slideOutFromRight {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slideOutFromLeft {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes slideOutFromBottom {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
}

@keyframes slideInFromTop {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes slideOutFromTop {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
  0% {
      opacity: 1;
  }

  100% {
      opacity: 0;
  }
}
`;
}

export default Sidebar;
