const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const INPUT_DIR = path.join(process.cwd(), "public/images");
const OUTPUT_DIR = path.join(process.cwd(), "images-optimized");

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".tiff",
  ".tif",
]);

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  const image = sharp(inputPath, {
    failOn: "none",
  });

  const metadata = await image.metadata();

  let pipeline = image.rotate();

  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  await pipeline
    .webp({
      quality: WEBP_QUALITY,
      effort: 6,
      smartSubsample: true,
      nearLossless: false,
    })
    .toFile(outputPath);
}

async function walkAndOptimize(currentInputDir) {
  const entries = await fs.readdir(currentInputDir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const inputPath = path.join(currentInputDir, entry.name);
    const relativePath = path.relative(INPUT_DIR, inputPath);
    const outputBasePath = path.join(OUTPUT_DIR, relativePath);

    if (entry.isDirectory()) {
      await ensureDir(outputBasePath);
      await walkAndOptimize(inputPath);
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      console.log(`Saltado: ${relativePath}`);
      continue;
    }

    const outputDir = path.dirname(outputBasePath);
    const outputFileName = `${path.parse(entry.name).name}.webp`;
    const outputPath = path.join(outputDir, outputFileName);

    await ensureDir(outputDir);

    try {
      const before = (await fs.stat(inputPath)).size;

      await optimizeImage(inputPath, outputPath);

      const after = (await fs.stat(outputPath)).size;

      const beforeKb = (before / 1024).toFixed(1);
      const afterKb = (after / 1024).toFixed(1);
      const saved = (((before - after) / before) * 100).toFixed(1);

      console.log(
        `Optimizada: ${relativePath} → ${path.relative(
          OUTPUT_DIR,
          outputPath
        )} | ${beforeKb} KB → ${afterKb} KB | -${saved}%`
      );
    } catch (error) {
      console.error(`Error optimizando ${relativePath}:`, error.message);
    }
  }
}

async function main() {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await ensureDir(OUTPUT_DIR);

  console.log("Carpeta origen:", INPUT_DIR);
  console.log("Carpeta destino:", OUTPUT_DIR);
  console.log("Formato salida: WebP");
  console.log("Ancho máximo:", MAX_WIDTH);
  console.log("Calidad:", WEBP_QUALITY);
  console.log("");

  await walkAndOptimize(INPUT_DIR);

  console.log("");
  console.log("Listo. Imágenes optimizadas en:", OUTPUT_DIR);
}

main().catch((error) => {
  console.error("Error general:", error);
  process.exit(1);
});