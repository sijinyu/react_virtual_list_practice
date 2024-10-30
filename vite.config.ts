import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import tsconfigPaths from 'vite-tsconfig-paths';

import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { PluginOption } from 'vite';

function reactVirtualized(): PluginOption {
  const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

  return {
    name: 'my:react-virtualized',
    async configResolved() {
      const reactVirtualizedPath = path.dirname(
        fileURLToPath(import.meta.resolve('react-virtualized'))
      );

      const brokenFilePath = path.join(
        reactVirtualizedPath,
        '..',
        'es',
        'WindowScroller',
        'utils',
        'onScroll.js'
      );
      const brokenCode = await readFile(brokenFilePath, 'utf-8');

      const fixedCode = brokenCode.replace(WRONG_CODE, '');
      await writeFile(brokenFilePath, fixedCode);
    },
  };
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), reactVirtualized()],
  server: {
    proxy: {
      '/v1/search/shop.json': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/search/, '/v1/search/shop.json'),
        headers: {
          'X-Naver-Client-Id': process.env.VITE_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.VITE_NAVER_CLIENT_SECRET,
        },
      },
    },
  },
});
