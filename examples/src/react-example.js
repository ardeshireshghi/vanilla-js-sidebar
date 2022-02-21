var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react/jsx-runtime", "react", "../../src/react/Sidebar", "../../src/sidebar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const jsx_runtime_1 = require("react/jsx-runtime");
    const react_1 = require("react");
    const Sidebar_1 = require("../../src/react/Sidebar");
    const sidebar_1 = __importDefault(require("../../src/sidebar"));
    function ReactSidebarContainer() {
        const [sidebarShown, setSidebarShown] = (0, react_1.useState)(false);
        const sidebarStyles = {
            padding: '2rem',
            '@media screen and (max-width: 400px)': {
                padding: '1rem'
            }
        };
        const onHide = (0, react_1.useCallback)(() => setSidebarShown(false), [setSidebarShown]);
        const handleBtnClick = (0, react_1.useCallback)(() => setSidebarShown(true), [setSidebarShown]);
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsx)(Sidebar_1.Sidebar, Object.assign({ direction: sidebar_1.default.direction.RIGHT, panelStyles: sidebarStyles, onHide: onHide, isShown: sidebarShown }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sidebar-content" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Hello! I am a sidebar" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: "The content of the sidebar goes here. You can also set the direction to show from TOP, BOTTOM, LEFT, or RIGHT." }, void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleBtnClick }, { children: "Show React sidebar" }), void 0)] }), void 0));
    }
    exports.default = ReactSidebarContainer;
});
