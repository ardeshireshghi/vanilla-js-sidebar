var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react/jsx-runtime", "react", "../sidebar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sidebar = void 0;
    const jsx_runtime_1 = require("react/jsx-runtime");
    const react_1 = require("react");
    const sidebar_1 = __importDefault(require("../sidebar"));
    const Sidebar = ({ isShown, onShow, onHide, children, direction, overlayBackgroundColor, panelStyles = {} }) => {
        const sidebarContainerRef = (0, react_1.useRef)(null);
        const sidebarRef = (0, react_1.useRef)();
        (0, react_1.useEffect)(() => {
            if (sidebarContainerRef.current &&
                !(sidebarRef.current instanceof sidebar_1.default)) {
                sidebarRef.current = new sidebar_1.default({
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
        (0, react_1.useEffect)(() => {
            if (sidebarRef.current) {
                if (isShown) {
                    sidebarRef.current.show();
                }
                else {
                    sidebarRef.current.hide();
                }
            }
        }, [isShown, sidebarRef]);
        return (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: sidebarContainerRef }, { children: children }), void 0);
    };
    exports.Sidebar = Sidebar;
});
