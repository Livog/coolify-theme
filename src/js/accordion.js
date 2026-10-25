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
