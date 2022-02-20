import Sidebar from '../../src/sidebar';

const sidebarContent = `<div class="sidebar-content">
    <h1>Hello! I am a sidebar</h1>
    <p>The content of the sidebar goes here. You can also set the direction to show from TOP, BOTTOM, LEFT, or RIGHT.</p>
</div>`;

const sidebarLeft = new Sidebar({
  direction: Sidebar.direction.LEFT,
  panelStyles: {
    maxWidth: 'min(90%, 400px)'
  }
});

const sidebarRight = new Sidebar({
  direction: Sidebar.direction.RIGHT,
  panelStyles: {
    maxWidth: 'min(90%, 400px)'
  }
});

const sidebarTop = new Sidebar({
  direction: Sidebar.direction.TOP
});

const sidebarBottom = new Sidebar({
  direction: Sidebar.direction.BOTTOM
});

const sidebarOverlay = new Sidebar({
  overlayBackgroundColor: 'rgba(255, 255, 255, 0.8)',
  panelStyles: {
    background: '#333',
    color: 'white'
  },
  direction: Sidebar.direction.RIGHT
});

[sidebarRight, sidebarLeft, sidebarTop, sidebarBottom].forEach((sidebar) => {
  sidebar.renderContent(sidebarContent);
  document.querySelector(`.js-sidebar-${sidebar.direction}`).onclick = () =>
    sidebar.show();
});

sidebarOverlay.renderContent(sidebarContent);
document.querySelector('.js-sidebar-overlay').onclick = () =>
  sidebarOverlay.show();
