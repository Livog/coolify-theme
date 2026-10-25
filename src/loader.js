const THEME_URL = 'https://livog.github.io/coolify-theme';

const FLAT_NAV_DEFAULT = `<script>__FLAT_NAV_DEFAULT__</script>`;

export default {
  async fetch(request) {
    const response = await fetch(request);
    if (!response.headers.get('content-type')?.startsWith('text/html')) return response;

    const version = request.headers.get('cookie')?.match(/(?:^|;\s*)coolify-theme=([\d.]+)/)?.[1] ?? 'latest';
    const css = await fetch(`${THEME_URL}/${version}/style.css`, { cf: { cacheTtl: 600 }, signal: AbortSignal.timeout(3000) })
      .then(theme => (theme.ok ? theme.text() : ''))
      .catch(() => '');

    return new HTMLRewriter()
      .on('head', {
        element(head) {
          head.prepend(FLAT_NAV_DEFAULT, { html: true });
          if (!css) return;
          head.append(`<style id="coolify-theme">${css}</style>`, { html: true });
          head.append(`<script src="${THEME_URL}/${version}/script.js" defer></script>`, { html: true });
        },
      })
      .transform(response);
  },
};
