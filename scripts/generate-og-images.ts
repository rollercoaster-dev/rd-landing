#!/usr/bin/env bun

// Main OG image generator script - Puppeteer + HTML approach
import puppeteer from "puppeteer";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { generateOGTemplate } from "./og-templates.js";
import {
  OGContentConfig,
  getOGContentForRoute,
  type OGContentItem,
} from "./og-content-config.js";
import { OGDesignTokens } from "./og-design-tokens.js";

interface GenerateImageOptions {
  routeName: string;
  content?: Partial<OGContentItem>;
  outputDir?: string;
}

// Main function to generate all OG images
export async function generateAllOGImages(outputDir = "public/og") {
  console.log("🎨 Generating OG images...");

  const fullOutputDir = join(process.cwd(), outputDir);
  await mkdir(fullOutputDir, { recursive: true });

  let generatedCount = 0;

  // Generate for all configured routes
  for (const [routeName, config] of Object.entries(OGContentConfig.routes)) {
    try {
      await generateOGImage({
        routeName,
        content: config,
        outputDir: fullOutputDir,
      });
      generatedCount++;
      console.log(
        `✓ Generated OG image for /${routeName} (${config.template})`,
      );
    } catch (error) {
      console.error(`✗ Failed to generate OG image for /${routeName}:`, error);
    }
  }

  console.log(`🎉 Generated ${generatedCount} OG images in ${outputDir}/`);
}

// Generate a single OG image
export async function generateOGImage({
  routeName,
  content = {},
  outputDir = "public/og",
}: GenerateImageOptions) {
  // Get the content configuration for this route
  const routeContent = getOGContentForRoute(routeName);

  // Merge with any provided overrides
  const finalContent: OGContentItem = {
    ...routeContent,
    ...content,
    // Ensure template is valid
    template: content.template || routeContent.template,
  };

  // Generate the image
  const imageBuffer = await generateOGImageBuffer(finalContent);

  // Save to file
  const fileName = `${routeName}-${finalContent.template}-1200x630.png`;
  const imagePath = join(outputDir, fileName);

  await writeFile(imagePath, imageBuffer);

  return {
    fileName,
    imagePath,
    content: finalContent,
  };
}

// Generate image buffer from content using Puppeteer
export async function generateOGImageBuffer(
  content: OGContentItem,
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set viewport to exact OG image dimensions
    await page.setViewport({
      width: OGDesignTokens.dimensions.ogWidth,
      height: OGDesignTokens.dimensions.ogHeight,
      deviceScaleFactor: 1,
    });

    // Generate HTML template
    const html = generateOGTemplate({
      ...content,
      siteName: OGContentConfig.defaults.siteName,
    });

    // Set the HTML content
    // Using 'domcontentloaded' for faster generation since all assets are self-contained (local fonts, inline SVGs)
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: "png",
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: OGDesignTokens.dimensions.ogWidth,
        height: OGDesignTokens.dimensions.ogHeight,
      },
    });

    return screenshot as Buffer;
  } finally {
    await browser.close();
  }
}

// Utility function to generate OG image path for use in components
export function getOGImagePath(routeName: string, template?: string): string {
  const routeContent = getOGContentForRoute(routeName);
  const finalTemplate = template || routeContent.template;
  return `/og/${routeName}-${finalTemplate}-1200x630.png`;
}

// CLI functionality - run if called directly
if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
OG Image Generator for RollerCoaster.dev

Usage:
  bun run scripts/generate-og-images.ts [options]

Options:
  --help, -h     Show this help message
  --route <name> Generate image for specific route only
  --output <dir> Output directory (default: public/og)

Examples:
  bun run scripts/generate-og-images.ts
  bun run scripts/generate-og-images.ts --route index
  bun run scripts/generate-og-images.ts --output dist/og
`);
    process.exit(0);
  }

  const routeIndex = args.indexOf("--route");
  const outputIndex = args.indexOf("--output");

  const specificRoute = routeIndex !== -1 ? args[routeIndex + 1] : null;
  const outputDir = outputIndex !== -1 ? args[outputIndex + 1] : "public/og";

  try {
    if (specificRoute) {
      console.log(`🎨 Generating OG image for route: ${specificRoute}`);
      const fullOutputDir = join(process.cwd(), outputDir);
      await mkdir(fullOutputDir, { recursive: true });

      const result = await generateOGImage({
        routeName: specificRoute,
        outputDir: fullOutputDir,
      });

      console.log(`✓ Generated: ${result.fileName}`);
    } else {
      await generateAllOGImages(outputDir);
    }
  } catch (error) {
    console.error("❌ Error generating OG images:", error);
    process.exit(1);
  }
}
