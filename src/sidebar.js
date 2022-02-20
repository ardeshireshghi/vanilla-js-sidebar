/**
 * Sidebar UI component
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./styles"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const styles_1 = __importDefault(require("./styles"));
    var SidebarDirection;
    (function (SidebarDirection) {
        SidebarDirection["LEFT"] = "left";
        SidebarDirection["RIGHT"] = "right";
        SidebarDirection["BOTTOM"] = "bottom";
        SidebarDirection["TOP"] = "top";
    })(SidebarDirection || (SidebarDirection = {}));
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
        constructor(initialParam) {
            const { direction, customClassName, panelStyles, overlayBackgroundColor } = Object.assign(Object.assign({}, sidebarDefaultInitialParam), initialParam);
            this.direction = direction;
            this.customClassName = customClassName;
            this.panelStyles = panelStyles;
            this.overlayBackgroundColor = overlayBackgroundColor;
            this.state = {
                templateRendered: false,
                isShown: false
            };
            this.id = `sidebar-panel-${Math.round(Math.random() * 10000000)}`;
            this._insertStyles();
            this._renderTemplate();
        }
        static get direction() {
            return SidebarDirection;
        }
        renderContent(elOrHTMLOrCollection) {
            // Don't need to render when the same element reference or value is passed
            if (elOrHTMLOrCollection === this.state.contentEl ||
                !this.state.sidebarPanelEl) {
                return;
            }
            this.state.sidebarPanelEl.innerHTML = '';
            if (elOrHTMLOrCollection instanceof HTMLElement) {
                this.state.sidebarPanelEl.appendChild(elOrHTMLOrCollection);
            }
            else if (elOrHTMLOrCollection instanceof HTMLCollection) {
                this.state.sidebarPanelEl.append(...Array.from(elOrHTMLOrCollection));
            }
            else if (typeof elOrHTMLOrCollection === 'string') {
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
            sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.classList.remove(ClassNames.SIDEBAR_HIDDEN);
            sidebarPanelEl === null || sidebarPanelEl === void 0 ? void 0 : sidebarPanelEl.classList.remove(`${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_OUT}--${this.direction}`);
            sidebarPanelEl === null || sidebarPanelEl === void 0 ? void 0 : sidebarPanelEl.classList.add(`${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_IN}--${this.direction}`);
            this._updateState({
                isShown: true
            });
        }
        hide() {
            if (!this.state.isShown) {
                return;
            }
            const { sidebarEl, sidebarPanelEl } = this.state;
            sidebarPanelEl === null || sidebarPanelEl === void 0 ? void 0 : sidebarPanelEl.classList.add(`${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_OUT}--${this.direction}`);
            sidebarPanelEl === null || sidebarPanelEl === void 0 ? void 0 : sidebarPanelEl.classList.remove(`${ClassNames.SIDEBAR_PANEL_BASE_ANIMATION_IN}--${this.direction}`);
            sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.classList.add(ClassNames.SIDEBAR_HIDING);
            sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.addEventListener('animationend', () => {
                sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.classList.add(ClassNames.SIDEBAR_HIDDEN);
                sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.classList.remove(ClassNames.SIDEBAR_HIDING);
            }, {
                once: true
            });
            this._updateState({
                isShown: false
            });
        }
        _handleTouchStart(e) {
            this._updateState({
                touchStartPosition: {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                }
            });
        }
        _handleTouchMove(e) {
            if (this.touchMoveDebounceTimeout) {
                clearTimeout(this.touchMoveDebounceTimeout);
            }
            this.touchMoveDebounceTimeout = setTimeout(() => {
                var _a, _b;
                const diff = {
                    x: e.touches[0].clientX - (((_a = this.state.touchStartPosition) === null || _a === void 0 ? void 0 : _a.x) || 0),
                    y: e.touches[0].clientY - (((_b = this.state.touchStartPosition) === null || _b === void 0 ? void 0 : _b.y) || 0)
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
            const sidebarEl = wrapper.querySelector(`.${ClassNames.SIDEBAR}`);
            const sidebarPanelEl = wrapper.querySelector(`.${ClassNames.SIDEBAR_PANEL_JS}`);
            sidebarPanelEl.id = this.id;
            sidebarEl.id = this.id;
            sidebarPanelEl.classList.add(`${ClassNames.SIDEBAR_PANEL}--${this.direction}`);
            // Adds custom class name to the panel
            if (this.customClassName !== '') {
                sidebarPanelEl.classList.add(this.customClassName);
            }
            document.body.prepend(sidebarEl);
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
            insertCustomStyles(`#${this.id}.${ClassNames.SIDEBAR_PANEL}`, this.panelStyles);
        }
        _bindEvents() {
            const { sidebarEl, sidebarPanelEl } = this.state;
            // Close sidebar event
            sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.addEventListener('click', (event) => {
                const target = event.target;
                if (target !== sidebarPanelEl &&
                    target.contains(sidebarPanelEl)) {
                    this.hide();
                }
            });
            sidebarPanelEl === null || sidebarPanelEl === void 0 ? void 0 : sidebarPanelEl.addEventListener('touchstart', this._handleTouchStart.bind(this), { passive: false });
            sidebarPanelEl === null || sidebarPanelEl === void 0 ? void 0 : sidebarPanelEl.addEventListener('touchmove', this._handleTouchMove.bind(this), { passive: false });
        }
        _createSidebarStyles() {
            const style = document.createElement('style');
            style.innerHTML = this.styles;
            return style;
        }
        _updateState(newPartialState) {
            this.state = Object.assign(Object.assign({}, this.state), newPartialState);
        }
        get styles() {
            return (0, styles_1.default)(this.id, this.overlayBackgroundColor);
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
    function insertCustomStyles(selector, styles) {
        const customStyles = document.createElement('style');
        document.head.appendChild(customStyles);
        document.head.style;
        const styleSheet = customStyles.sheet;
        Object.entries(styles).forEach(([ruleName, valueOrStyles]) => {
            const ruleKababCase = ruleName.replace(/([A-Z])/g, (match) => `-${match}`.toLowerCase());
            if (ruleKababCase.startsWith('@media') &&
                typeof valueOrStyles === 'object') {
                let rule = `
              ${ruleKababCase} {
                ${selector} {`;
                rule = Object.keys(valueOrStyles).reduce((result, mediaRuleName) => {
                    const mediaRuleValue = valueOrStyles[mediaRuleName];
                    const mediaRuleNameKababCase = mediaRuleName.replace(/([A-Z])/g, (match) => `-${match}`.toLowerCase());
                    result += `${mediaRuleNameKababCase}: ${mediaRuleValue};\n`;
                    return result;
                }, rule);
                rule += `}
            }`;
                styleSheet.insertRule(rule, styleSheet.cssRules.length);
            }
            else {
                styleSheet.insertRule(`${selector} { ${ruleKababCase}: ${valueOrStyles}}`, styleSheet.cssRules.length);
            }
        });
    }
    if (window) {
        window.Sidebar = Sidebar;
    }
    exports.default = Sidebar;
});
