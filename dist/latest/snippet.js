const CSS = `:root {
  --ui-brand: oklch(54.6% .245 262.9);
  --ui-fg: var(--color-black);
  --ui-muted-fg: var(--color-neutral-500);
  --ui-accent: var(--color-neutral-100);
  --ui-border: var(--color-neutral-200);
  --ui-input: var(--color-neutral-200);
  --ui-input-bg: var(--color-white);
  --ui-input-hover: var(--color-neutral-100);
  --ui-primary: var(--color-black);
  --ui-primary-fg: var(--color-neutral-50);
  --ui-sidebar: var(--color-neutral-50);
  --ui-sidebar-hover: color-mix(in oklab, var(--color-neutral-100), var(--color-neutral-200));
  --ui-sidebar-active: var(--color-neutral-200);

  --color-brand: var(--ui-brand);
  --color-brand-hover: oklch(from var(--ui-brand) calc(l + .05) c h);
  --color-brand-press: oklch(from var(--ui-brand) calc(l - .05) c h);
  --color-brand-depth: oklch(from var(--ui-brand) calc(l - .12) c h);
  --color-brand-light: oklch(from var(--ui-brand) calc(l + .2) calc(c * .6) h);
  --color-accent: var(--ui-brand);
  --color-coollabs: var(--ui-brand);
  --color-coollabs-50: oklch(from var(--ui-brand) .97 .02 h);
  --color-coollabs-100: var(--color-brand-hover);
  --color-coollabs-200: var(--color-brand-press);
  --color-coollabs-300: var(--color-brand-depth);
  --livewire-progress-bar-color: var(--ui-brand);

  --color-nav-text: var(--ui-fg);
  --color-nav-active: var(--ui-fg);
  --color-nav-muted: color-mix(in oklab, var(--ui-fg) 70%, transparent);
  --coollabs-line: var(--ui-input);
  --coollabs-hairline: var(--ui-border);
}

.dark {
  --ui-fg: var(--color-neutral-50);
  --ui-muted-fg: var(--color-neutral-400);
  --ui-accent: var(--color-neutral-800);
  --ui-border: oklch(100% 0 0 / .1);
  --ui-input: oklch(100% 0 0 / .15);
  --ui-input-bg: oklch(100% 0 0 / .045);
  --ui-input-hover: oklch(100% 0 0 / .075);
  --ui-primary: var(--color-neutral-200);
  --ui-primary-fg: var(--color-neutral-900);
  --ui-sidebar: var(--color-neutral-900);
  --ui-sidebar-hover: var(--color-neutral-800);
  --ui-sidebar-active: var(--color-neutral-800);

  --color-app: var(--color-neutral-950);
  --color-card: var(--color-neutral-900);
  --color-sidebar: var(--ui-sidebar);
  --color-fg: var(--ui-fg);
  --color-fg-dim: var(--ui-muted-fg);
  --color-hairline: var(--ui-border);
  --coollabs-elevated: var(--color-neutral-900);
}

html:not(.dark) .app-main {
  background-color: var(--color-white);
}

.app-topbar > div:not(.app-topbar-brand) {
  border-bottom-color: var(--ui-border);
}

html.dark.is-scrolled:not([data-nav-style="floating"]) .app-topbar > div:not(.app-topbar-brand) {
  border-bottom-color: var(--ui-border);
  box-shadow: 0 10px 30px -14px oklch(0% 0 0 / .95);
}

.app-shell:not(:has(.sidebar-collapsed)) {
  --sidebar-w: 16rem !important;
}

@media (width >= 1024px) {
  .app-sidebar,
  .app-topbar-brand {
    width: var(--sidebar-w);
  }

  .app-shell .app-main {
    margin-left: var(--sidebar-w);
  }
}

:is(.app-sidebar, .mobile-sidebar-sheet) .menu-item-label {
  font-size: 14px;
}

.app-sidebar nav.sidebar-nav,
.app-topbar-brand {
  border-color: var(--ui-border);
}

html.dark .app-sidebar nav.sidebar-nav,
html.dark .mobile-sidebar-sheet [role="dialog"],
html.dark .app-topbar-brand {
  --color-nav-text: inherit;
  --color-nav-muted: inherit;
  background-image: none;
  border-right-color: var(--ui-border);
}

:is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item, .menu-subitem):hover {
  background-color: var(--ui-sidebar-hover);
}

:is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item-active, .menu-subitem-active),
:is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item-active, .menu-subitem-active):hover {
  background-color: var(--ui-sidebar-active);
}

html.dark :is(.app-sidebar, .mobile-sidebar-sheet) .menu-search,
:is(.app-sidebar, .mobile-sidebar-sheet) .menu-search {
  background-color: var(--ui-input-bg) !important;
  box-shadow: inset 0 0 0 1px var(--ui-input) !important;
}

html.dark :is(.app-sidebar, .mobile-sidebar-sheet) .menu-search kbd,
html.dark :is(.app-sidebar, .mobile-sidebar-sheet) .sidebar-nav [class*="dark:border-white/"] {
  border-color: var(--ui-border) !important;
}

html.dark :is(.app-sidebar, .mobile-sidebar-sheet) nav:not(.sidebar-collapsed) .nav-section {
  font-family: inherit;
  font-size: 12px;
  letter-spacing: normal;
  text-transform: none;
  color: var(--color-nav-muted);
}

:is(.app-sidebar, .mobile-sidebar-sheet) .nav-chevron {
  color: var(--color-nav-muted);
  opacity: 1 !important;
}

.nav-accordion {
  display: grid;
  grid-template-rows: 0fr;
  padding-block: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    grid-template-rows 200ms var(--ease-out),
    padding-block 200ms var(--ease-out),
    opacity 200ms var(--ease-out),
    visibility 200ms;
}

[aria-expanded="true"] + .nav-accordion {
  grid-template-rows: 1fr;
  padding-block: 4px;
  opacity: 1;
  visibility: visible;
}

.nav-accordion,
#main-nav-active-children {
  border-left-color: var(--ui-border);
}

.nav-accordion > ul {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 0;
  overflow: hidden;
}

@media (width >= 1024px) {
  .sidebar-collapsed .nav-accordion {
    display: none;
  }
}

:is(.app-sidebar, .mobile-sidebar-sheet) .sidebar-nav .menu-item > .nav-chevron {
  transition: rotate 200ms var(--ease-out);
}

:is(.app-sidebar, .mobile-sidebar-sheet) .menu-item[aria-expanded="true"] > .nav-chevron {
  rotate: 0deg;
}

@media (prefers-reduced-motion: reduce) {
  .nav-accordion {
    transition: opacity 200ms var(--ease-out), visibility 200ms;
  }

  :is(.app-sidebar, .mobile-sidebar-sheet) .sidebar-nav .menu-item > .nav-chevron {
    transition: none;
  }
}

html.dark .listbox-panel.top-user-menu-panel-sidebar {
  background: var(--coollabs-elevated);
  border-color: var(--ui-border);
}

html.dark .top-user-menu-panel-sidebar .listbox-option:hover {
  background-color: var(--ui-accent);
}

/* Coolify's purple here is !important in @layer utilities, only an earlier layer beats it */
@layer theme {
  .dark .button:not(.button-highlighted):not(.button-error):not([ishighlighted]):not(:disabled) {
    color: var(--color-fg) !important;
    background-color: var(--ui-input-bg) !important;
    border-color: var(--ui-input) !important;
  }

  .dark .button:not(.button-highlighted):not(.button-error):not([ishighlighted]):not(:disabled):hover {
    background-color: var(--ui-input-hover) !important;
  }
}

.dark .button:not(.button-highlighted):not(.button-error):not([ishighlighted]):not(:disabled) svg {
  color: inherit;
}

.button:not(.button-highlighted):not(.button-error):not([ishighlighted]):not(:disabled):hover {
  background-color: var(--ui-input-hover);
}

.button,
.split-action-main,
.split-action-caret {
  --button-depth-color: transparent !important;
  transition-duration: 150ms;
}

.button:not(:disabled):is(:hover, :active),
.split-action-main:not(:disabled):is(:hover, :active),
.split-action-caret:not(:disabled):is(:hover, :active) {
  transform: none;
}

:is(.button, .split-action-main, .split-action-caret):not(:disabled, [aria-haspopup], :is(.app-sidebar, .mobile-sidebar-sheet) *):active {
  transform: scale(.98);
}

@media (prefers-reduced-motion: reduce) {
  :is(.button, .split-action-main, .split-action-caret):not(:disabled, [aria-haspopup], :is(.app-sidebar, .mobile-sidebar-sheet) *):active {
    transform: none;
  }
}

:is(.button-highlighted, [ishighlighted], .split-action-main, .split-action-caret):not(:disabled) {
  --color-accent-foreground: var(--ui-primary-fg);
  background: var(--ui-primary) !important;
  color: var(--ui-primary-fg) !important;
  border-color: var(--ui-primary) !important;
}

:is(.button-highlighted, [ishighlighted], .split-action-main, .split-action-caret):not(:disabled):hover {
  background: color-mix(in oklab, var(--ui-primary) 90%, transparent) !important;
}

.split-action-caret:not(:disabled) {
  border-left-color: color-mix(in oklab, var(--ui-primary-fg) 20%, transparent) !important;
}

html.dark .card-icon-button {
  color: var(--color-fg-dim);
}

html.dark .card-icon-button:hover {
  color: var(--color-fg);
  background-color: var(--ui-accent);
}

:is(.input, .select):not(:focus-visible),
.application-settings-workspace :is(.input, .select):not(:focus-visible) {
  background-color: var(--ui-input-bg);
  border-color: var(--ui-input);
}

.dark .application-settings-form :is(.input, select, textarea):focus,
.dark .application-settings-form :is(.input, select, textarea):focus-visible,
.dark .application-settings-workspace :is(.input, select, textarea):focus,
.dark .application-settings-workspace :is(.input, select, textarea):focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--ui-brand) 30%, transparent) !important;
}

:is(.application-settings-section, .application-settings-section-body, .empty-state),
.dark :is(.application-settings-section, .application-settings-section-body, .empty-state) {
  --card-border: var(--ui-border);
}

html.dark .resource-glyph {
  color: var(--color-fg-dim);
  background: var(--ui-input-bg);
  border-color: var(--ui-border);
}

html.dark .app-main :is(article.group, a.group).rounded-xl:hover {
  border-color: oklch(100% 0 0 / .2);
}

/* Coolify's purple here is !important in @layer utilities, only an earlier layer beats it */
@layer theme {
  html.dark .view-toggle {
    background-color: var(--ui-input-bg) !important;
    border-color: var(--ui-input) !important;
  }
}

html.dark .view-toggle > :is(a, button) {
  color: var(--color-fg-dim);
}

html.dark .view-toggle > :is(a, button) svg {
  color: currentColor;
}

html.dark .view-toggle > :is(a, button):not(.is-selected):hover,
html.dark .view-toggle > .is-selected {
  color: var(--color-fg);
  background: var(--ui-accent);
  box-shadow: none;
}

.view-toggle .bg-coollabs,
html.dark .view-toggle .bg-coollabs {
  color: var(--ui-fg);
  background-color: var(--ui-accent);
}

.command-palette {
  --color-accent: var(--ui-fg);
  --color-brand-light: var(--ui-muted-fg);
}

html.dark .command-palette {
  background: var(--coollabs-elevated);
  box-shadow: 0 0 0 1px var(--ui-border), var(--shadow-dropdown);
}

html.dark .command-palette-body {
  background: var(--coollabs-base);
  box-shadow: 0 0 0 1px var(--ui-border);
}

html.dark .command-palette-input::placeholder {
  color: var(--color-fg-faint);
}

.command-palette-item:focus,
.command-palette-item:focus-visible,
button.command-palette-item:focus-visible,
a.command-palette-item:focus-visible,
.command-palette-item:focus .command-palette-type-badge,
.command-palette-item:focus-visible .command-palette-type-badge,
.command-palette-item:focus .command-palette-quickcommand,
.command-palette-item:focus-visible .command-palette-quickcommand {
  background: var(--ui-accent);
}

.command-palette-item:focus .command-palette-item-icon,
.command-palette-item:focus-visible .command-palette-item-icon,
.command-palette-item:focus .command-palette-item-icon.is-create,
.command-palette-item:focus-visible .command-palette-item-icon.is-create {
  background: var(--ui-accent);
  box-shadow: inset 0 0 0 1px var(--ui-border);
}`;

const FLAT_NAV_DEFAULT = `<script>if (!localStorage.navItems) localStorage.navItems = 'flat';</script>`;

const ACCORDION = `<script>
document.addEventListener('livewire:navigated', () => {
  for (const nav of document.querySelectorAll(':is(.app-sidebar, .mobile-sidebar-sheet) nav.sidebar-nav')) {
    if (nav.querySelector('.nav-accordion')) continue;
    const state = Alpine.$data(nav);
    const drillDown = () => state.collapsed && matchMedia('(width >= 1024px)').matches;
    const panels = [...nav.querySelectorAll('.sidebar-menu > li[x-show]:has(.menu-back)')];
    for (const button of nav.querySelectorAll('.sidebar-menu > li[x-show="!submenu"] button.menu-item[title]')) {
      const panel = panels.find(li => li.querySelector('.menu-back').textContent.trim() === button.title);
      if (!panel) continue;
      const list = document.createElement('ul');
      for (const entry of panel.querySelectorAll(':scope > ul > li')) {
        if (entry.id === 'main-nav-active-children') {
          list.append(entry);
          continue;
        }
        const link = entry.querySelector(':scope > a.menu-item');
        if (!link) continue;
        const item = link.cloneNode(true);
        item.classList.replace('menu-item', 'menu-subitem');
        item.classList.replace('menu-item-active', 'menu-subitem-active');
        item.querySelector('.menu-item-icon')?.remove();
        const li = document.createElement('li');
        li.append(item);
        list.append(li);
      }
      const group = document.createElement('div');
      group.className = 'nav-children nav-accordion';
      group.append(list);
      button.setAttribute('aria-expanded', !!list.querySelector('.menu-subitem-active'));
      button.after(group);
      button.addEventListener('click', event => {
        if (drillDown()) return;
        event.stopImmediatePropagation();
        button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') !== 'true');
      }, true);
    }
    if (!drillDown()) state.submenu = '';
  }
});
</script>`;

export default {
  async fetch(request) {
    const response = await fetch(request);
    if (!response.headers.get('content-type')?.startsWith('text/html')) return response;

    return new HTMLRewriter()
      .on('head', {
        element(head) {
          head.prepend(FLAT_NAV_DEFAULT, { html: true });
          head.append(`<style id="coolify-theme">${CSS}</style>`, { html: true });
          head.append(ACCORDION, { html: true });
        },
      })
      .transform(response);
  },
};
