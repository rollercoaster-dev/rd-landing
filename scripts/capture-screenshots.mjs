import puppeteer from 'puppeteer';
import { execSync, spawn } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const routes = [
  '/',
  '/#waitlist',
  '/about',
  '/how-it-works',
  '/roadmap',
  '/legal/impressum',
  '/legal/privacy',
];

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

const outDir = join(process.cwd(), 'docs', 'screenshots');

async function main() {
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  // Build and run preview server on a random port
  console.log('Building app...');
  execSync('pnpm exec vite build', { stdio: 'inherit' });

  console.log('Starting preview server...');
  const preview = spawn('pnpm', ['exec', 'vite', 'preview', '--host', '--port', '4173'], {
    stdio: 'inherit',
    env: process.env,
  });

  // Give server time to boot
  await new Promise((r) => setTimeout(r, 2000));

  const baseUrl = 'http://localhost:4173';

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    for (const vp of viewports) {
      const dir = join(outDir, vp.name);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      for (const path of routes) {
        const url = baseUrl + path;
        console.log(`Capturing ${vp.name} -> ${url}`);
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        // Ensure header/footer render
        await page.waitForSelector('header', { timeout: 10000 }).catch(() => {});
        await page.waitForSelector('footer', { timeout: 10000 }).catch(() => {});
        const safe = path.replace(/[^a-z0-9-]/gi, '_') || 'home';
        await page.screenshot({ path: join(dir, `${safe}.png`), fullPage: true });
      }

      await page.close();
    }
  } finally {
    await browser.close();
    preview.kill('SIGINT');
  }

  console.log('Screenshots saved to', outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});