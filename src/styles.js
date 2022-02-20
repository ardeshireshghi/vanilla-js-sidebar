(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (id, sidebarOverlayBackgroundColor) => `
#${id}.sidebar {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${sidebarOverlayBackgroundColor};
  transition: opacity 0.25s;
  animation: fadeIn 0.25s;
  animation-fill-mode: forwards;
}

.sidebar--hidden {
  display: none;
}

.sidebar--hiding {
  animation: fadeOut 0.25s;
}

#${id}.sidebar__panel {
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
});
