import { cp, mkdir, rm } from 'node:fs/promises';

const version = Bun.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('Usage: bun run build.ts <coolify-version>   e.g. bun run build.ts 4.5.0');
  process.exit(1);
}

const read = (path: string) => Bun.file(path).text().then(text => text.trim());

const inlineImports = async (entry: string) => {
  const dir = entry.slice(0, entry.lastIndexOf('/') + 1);
  const lines = (await read(entry)).split('\n').filter(Boolean);
  const parts = lines.map(line => {
    const path = line.match(/^@import "(.+)";$/)?.[1];
    if (!path) throw new Error(`Only @import lines are allowed in ${entry}: ${line}`);
    return read(dir + path);
  });
  return (await Promise.all(parts)).join('\n\n');
};

const asTemplateLiteral = (text: string) =>
  text.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');

const fill = (template: string, values: Record<string, string>) =>
  Object.entries(values).reduce(
    (output, [key, value]) => output.replace(`__${key}__`, () => asTemplateLiteral(value)),
    template,
  );

const compare = (a: string, b: string) => {
  const [x, y] = [a, b].map(v => v.split('.').map(Number));
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

const css = await inlineImports('src/theme.css');
const accordion = await read('src/js/accordion.js');
const versionSync = await read('src/js/version-sync.js');
const flatNavDefault = await read('src/js/flat-nav-default.js');

const outDir = `dist/${version}`;
await mkdir(outDir, { recursive: true });
await Bun.write(`${outDir}/style.css`, `${css}\n`);
await Bun.write(`${outDir}/script.js`, `(() => {\n${accordion}\n\n${versionSync}\n})();\n`);
await Bun.write(
  `${outDir}/snippet.js`,
  fill(await Bun.file('src/snippet.js').text(), { CSS: css, FLAT_NAV_DEFAULT: flatNavDefault, ACCORDION: accordion }),
);
await Bun.write('dist/loader.js', fill(await Bun.file('src/loader.js').text(), { FLAT_NAV_DEFAULT: flatNavDefault }));

const versionsFile = Bun.file('dist/versions.json');
const known: string[] = (await versionsFile.exists()) ? await versionsFile.json() : [];
const versions = [...new Set([...known, version])].sort(compare);
await Bun.write(versionsFile, `${JSON.stringify(versions, null, 2)}\n`);

const isLatest = versions.at(-1) === version;
if (isLatest) {
  await rm('dist/latest', { recursive: true, force: true });
  await cp(outDir, 'dist/latest', { recursive: true });
}

console.log(`Built ${outDir}${isLatest ? ' (also dist/latest)' : ''}`);
