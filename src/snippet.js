const CSS = `__CSS__`;

const FLAT_NAV_DEFAULT = `<script>__FLAT_NAV_DEFAULT__</script>`;

const ACCORDION = `<script>
__ACCORDION__
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
