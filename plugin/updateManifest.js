import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * const
 * @type {string}
 */
const distBasePath = 'dist';
const cssPath = './assets';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.join(__dirname, distBasePath, 'manifest.json');
const cssDir = path.join(__dirname, distBasePath, cssPath);

async function updateManifest() {
  // CSSファイルを取得
  const cssFiles = fs
    .readdirSync(cssDir)
    .filter((file) => file.endsWith('.css'));

  if (cssFiles.length === 0) {
    console.error('No CSS file found in build directory.');
    return;
  }

  // manifest.jsonを読み込む
  const manifestData = await fs.promises.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestData);

  // CSSファイルパスをmanifest.jsonに更新
  manifest.content_scripts[0].css = cssFiles.map(
    (file) => `${cssPath}/${file}`,
  );

  // 更新したmanifest.jsonを書き戻す
  await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Updated manifest.json with CSS files:', cssFiles);
}
// 実行
updateManifest();
