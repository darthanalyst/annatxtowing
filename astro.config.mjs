import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://annatxtowing.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
