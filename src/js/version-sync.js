const versionsUrl = new URL('../versions.json', document.currentScript.src);

const compare = (a, b) => {
  const [x, y] = [a, b].map(version => version.split('.').map(Number));
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

document.addEventListener('livewire:navigated', async () => {
  const running = document.querySelector('a[href*="/coolify/releases/tag/v"]')?.href.match(/\/tag\/v(\d+\.\d+\.\d+)/)?.[1];
  if (!running) return;
  const versions = await fetch(versionsUrl).then(response => response.json());
  const theme = versions.filter(version => compare(version, running) <= 0).at(-1) ?? versions[0];
  if (document.cookie.match(/(?:^|;\s*)coolify-theme=([\d.]+)/)?.[1] !== theme) {
    document.cookie = `coolify-theme=${theme}; path=/; max-age=31536000; samesite=lax; secure`;
  }
}, { once: true });
