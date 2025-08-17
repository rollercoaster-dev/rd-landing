// HTML templates for OG image generation - NO REACT!
import { OGDesignTokens, TemplateConfigs } from "./og-design-tokens.js";
import type { OGContentItem } from "./og-content-config.js";

// Base64-encoded SVG assets for OG templates
// Note: values copied verbatim from existing inline CSS
const OG_BRAND_ACCENT_SVG =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjAwIDEyMDAiPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS41LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxMzcpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgZmlsbDogI2ZkMjE4MTsKICAgICAgfQoKICAgICAgLnN0MSB7CiAgICAgICAgZmlsbDogI2ZkMjI4MjsKICAgICAgfQoKICAgICAgLnN0MiB7CiAgICAgICAgZmlsbDogIzAwYzhlZDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9InN0MiIgZD0iTTk1Ny42Myw2MTcuMTJjLjE2LDEwNy4zNy0uMjMsMjE0LjctMS4xNywzMjEuOTgtNS40MSwyMC4yNC0zNC40OSwyMC4zMS00MC40MSwxLjE5LTQuMzgtMTQuMTYtLjYtMzQtLjUxLTQ4LjU1LjE5LTMwLjI4LTEuOTUtNjAuMTEsMC05MC4xNmwtLjIyLTE5My4wOGMtLjY4LTIuMzgtNy41NS0uODItOS42Mi0uNTgtMjEuNDIsMi41MS00MC40MiwxMS41NS01OC4xMiwyMy4yNS4xNiwxMDEuOTEtLjIzLDIwMy43Ny0xLjE3LDMwNS41OS01LjMzLDIzLjEyLTM2LjIyLDI0LjEyLTQwLjk4LDEuMTdsLS43MS0zLjItLjQ2LTI3MC43OGMtMjcuMjEsMzIuMTQtNTIuOTQsNjYuNjItNzYuMTEsMTAxLjg2bC0xLjEzLDIuNDJjLjI1LDU2LjU4LS4xNSwxMTMuMTUtMS4yMSwxNjkuNjktNS4yNiwyMi4xNi0zNy4zNywyMy4wNi00Mi4xNS0yLjM0LS45NC00MC4xMS0xLjMzLTgwLjMxLTEuMTctMTIwLjYtMjguOTIsMjYuNjctNjYuODUsNDIuNjUtMTA2LjU2LDMyLjIxLTIuOS0uNzYtMTIuMTgtNS4yOS0xMi44Ny01LjI4LS40OCwzMS4yNS0uODcsNjIuNDctMS4xNyw5My42Ny0yLjgzLDE1LjA4LTE1Ljc2LDIyLjU0LTMwLjQyLDE2Ljk2LTguOTctMy40Mi0xMS4zNy05LjQ1LTEyLjktMTguMTMtLjM5LTM5LjQ3LS43OC03OC44OS0xLjE3LTExOC4yNi0uMzEtLjI2LTEuOS0uMjctMi45My0xLjEyLTI4LjA3LTIzLjE0LTUwLjYyLTUzLjY4LTc4LjQ1LTc3LjMyLTEuMTctLjA0LS4zNCwxLjY2LS41OCwyLjM0LS40LDY1LjEtLjc5LDEzMC4yOC0xLjE3LDE5NS41My0zLjQzLDE1LjM2LTE2LjQ5LDIyLjc5LTMxLjYsMTYuOTYtNi41OC0yLjU0LTEyLjg5LTExLjgzLTEyLjg5LTE4Ljcydi0yMDljLTQ0LjQ4LDIuODQtNzQuODgsMzQuMjctODEuOTYsNzcuMjgtLjQsNDQuNDEtLjc5LDg4LjktMS4xNywxMzMuNDgtMi42OCwxNC4yNS0xNC4zMywyMi4xNC0yOC43NiwxNy42My04LjQ1LTIuNjQtMTEuNi04LjQxLTEzLjM5LTE2LjQ2LS44OS00Ni45OS0xLjIzLTk1LjgyLDAtMTQyLjg0LDguNDUtOTQsMTE0LjE4LTE0Ni4zLDE5NC45Ny05NC44Niw1Mi45MSwzMy42OSw5NC4zNSwxMjUuODcsMTY3Ljk3LDk3Ljc3LDQ5Ljg4LTE5LjA0LDEwMy42Ny0xMjAuODMsMTQyLjI2LTE2My4zMyw0OC4yNy01My4xNiwxMjQuNC05Ni43NCwxOTcuMjgtNjQuOTQsMzAuODQsMTMuNDUsMjIuNyw1MC4xOC05LjM0LDQ4LjU3WiIvPgogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01OTQuMzksMjAxLjc3YzI2Ljc1LTMuOTIsMzkuMTgsMjIuMDEsNjIuODgsMjksMTguOTMsNS41OCw0MS45OS0uNTEsNTcuMzgsMTEuNywxNi4yMiwxMi44NywxMi4xMiwzNy41NCwyMS4wNiw1NS4wNSw5LjE1LDE3LjkyLDM0LjM2LDI5LjM4LDM2LjgsNDkuODQsMy4wMywyNS40OS0xOC45NywzOS43NS0yMS44MSw2Mi4yMy0zLjIzLDI1LjUxLDguNTIsNTEuOTItMTguMjIsNjguNDItMTEuNzYsNy4yNi0yOC43MSw5LjIzLTM5LjM4LDE2LjgyLTEzLjk2LDkuOTMtMjAuNTksMzEuODctMzguMDYsMzguMDUtMjMuMzcsOC4yNi00MC4yNy0xMy45LTY1LjA2LTcuNjktMTUuMywzLjg0LTI1LjkyLDEyLjk5LTQzLjEsNy45OS0xOS4xMi01LjU3LTI0LjQ1LTI4LjA2LTM4LjkzLTM4LjM1LTEyLjU0LTguOTEtMzEuNjMtOS41NC00My44LTE5LjQyLTIwLTE2LjIyLTExLjU0LTQwLjY2LTEzLjQ1LTYyLjY1LTIuMi0yNS4zNC0yNi4wNS0zOC43LTIyLjE5LTY2LjU5LDIuNjMtMTksMjUuODMtMzAuOSwzNC43OS00NiwxMS4xNC0xOC43Nyw1LjMyLTQ0LjI3LDIzLjYyLTU4LjM0LDE1LjItMTEuNjgsMzYuODgtNS40Nyw1NS4wMy0xMC41NCwxOS4xMi01LjM0LDM1LjQxLTI3LjAyLDUyLjQ0LTI5LjUyWiIvPgogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01NzQuNzYsNTUzLjljLTMuMzYsMjEuMDUtNy41OSw0Mi4zNi0xMi4yNCw2My4yNi0xLjAzLDQuNjMtNC42NiwyNC44Mi03LjY0LDI2LjMxLTIuMjgsMS4xNC01LjYzLDEuMDMtNy43LS41NGwtMzAuNDUtMzQuMDktMzkuMTIsMTYuMDFjLTIuMzguOC00Ljc0LS4xMi02LjQ3LTEuODhsMjEuNjUtMTEwLjczYzEuMzktLjY0LDMuMDgsMS4wMSw0LjAyLDEuOTQsNi4zLDYuMjYsMTIsMTYuOTgsMTguMjIsMjMuOTMsMTYuNDUsMTguMzgsMzYuMDQsMjMuMTYsNTkuNzQsMTUuNzhaIi8+CiAgPHBhdGggY2xhc3M9InN0MCIgZD0iTTY1NS4yMiw2NDIuNTNjLTMuNDIsMi43Ni05LjExLDIuMTktMTAuMjgtMi40OWwtMTguNTgtODQuMjZjLjY2LTEuMTQsMS4xNi0xLjczLDIuNi0xLjY4LDUuMzcuMjEsMTIuMDUsMy41NSwxOC45NCwzLjMzLDYuMDQtLjE5LDE3LjQ1LTMuNjEsMjIuOTMtNi40MSwxNS43My04LjAzLDIzLjg1LTI4LjIyLDM2Ljg0LTM5LjI0bDIyLjY2LDExMC40MWMtMS4xOCwyLjI3LTMuMjgsMy01LjcyLDIuNjUtNy4yNy0xLjA1LTM3LTE2LjMtNDAuMTktMTUuNzJsLTI5LjE5LDMzLjQxWiIvPgo8L3N2Zz4=";
const OG_BRAND_LOGO_SVG =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjAwIDEyMDAiPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS41LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxMzcpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgZmlsbDogI2ZkMjE4MTsKICAgICAgfQoKICAgICAgLnN0MSB7CiAgICAgICAgZmlsbDogI2ZkMjI4MjsKICAgICAgfQoKICAgICAgLnN0MiB7CiAgICAgICAgZmlsbDogIzAwYzhlZDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9InN0MiIgZD0iTTk1Ny42Myw2MTcuMTJjLjE2LDEwNy4zNy0uMjMsMjE0LjctMS4xNywzMjEuOTgtNS40MSwyMC4yNC0zNC40OSwyMC4zMS00MC40MSwxLjE5LTQuMzgtMTQuMTYtLjYtMzQtLjUxLTQ4LjU1LjE5LTMwLjI4LTEuOTUtNjAuMTEsMC05MC4xNmwtLjIyLTE5My4wOGMtLjY4LTIuMzgtNy41NS0uODItOS42Mi0uNTgtMjEuNDIsMi41MS00MC40MiwxMS41NS01OC4xMiwyMy4yNS4xNiwxMDEuOTEtLjIzLDIwMy43Ny0xLjE3LDMwNS41OS01LjMzLDIzLjEyLTM2LjIyLDI0LjEyLTQwLjk4LDEuMTdsLS43MS0zLjItLjQ2LTI3MC43OGMtMjcuMjEsMzIuMTQtNTIuOTQsNjYuNjItNzYuMTEsMTAxLjg2bC0xLjEzLDIuNDJjLjI1LDU2LjU4LS4xNSwxMTMuMTUtMS4yMSwxNjkuNjktNS4yNiwyMi4xNi0zNy4zNywyMy4wNi00Mi4xNS0yLjM0LS45NC00MC4xMS0xLjMzLTgwLjMxLTEuMTctMTIwLjYtMjguOTIsMjYuNjctNjYuODUsNDIuNjUtMTA2LjU2LDMyLjIxLTIuOS0uNzYtMTIuMTgtNS4yOS0xMi44Ny01LjI4LS40OCwzMS4yNS0uODcsNjIuNDctMS4xNyw5My42Ny0yLjgzLDE1LjA4LTE1Ljc2LDIyLjU0LTMwLjQyLDE2Ljk2LTguOTctMy40Mi0xMS4zNy05LjQ1LTEyLjktMTguMTMtLjM5LTM5LjQ3LS43OC03OC44OS0xLjE3LTExOC4yNi0uMzEtLjI2LTEuOS0uMjctMi45My0xLjEyLTI4LjA3LTIzLjE0LTUwLjYyLTUzLjY4LTc4LjQ1LTc3LjMyLTEuMTctLjA0LS4zNCwxLjY2LS41OCwyLjM0LS40LDY1LjEtLjc5LDEzMC4yOC0xLjE3LDE5NS41My0zLjQzLDE1LjM2LTE2LjQ5LDIyLjc5LTMxLjYsMTYuOTYtNi41OC0yLjU0LTEyLjg5LTExLjgzLTEyLjg5LTE4Ljcydi0yMDljLTQ0LjQ4LDIuODQtNzQuODgsMzQuMjctODEuOTYsNzcuMjgtLjQsNDQuNDEtLjc5LDg4LjktMS4xNywxMzMuNDgtMi42OCwxNC4yNS0xNC4zMywyMi4xNC0yOC43NiwxNy42My04LjQ1LTIuNjQtMTEuNi04LjQxLTEzLjM5LTE2LjQ2LS44OS00Ni45OS0xLjIzLTk1LjgyLDAtMTQyLjg0LDguNDUtOTQsMTE0LjE4LTE0Ni4zLDE5NC45Ny05NC44Niw1Mi45MSwzMy42OSw5NC4zNSwxMjUuODcsMTY3Ljk3LDk3Ljc3LDQ5Ljg4LTE5LjA0LDEwMy42Ny0xMjAuODMsMTQyLjI2LTE2My4zMyw0OC4yNy01My4xNiwxMjQuNC05Ni43NCwxOTcuMjgtNjQuOTQsMzAuODQsMTMuNDUsMjIuNyw1MC4xOC05LjM0LDQ4LjU3WiIvPgogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01OTQuMzksMjAxLjc3YzI2Ljc1LTMuOTIsMzkuMTgsMjIuMDEsNjIuODgsMjksMTguOTMsNS41OCw0MS45OS0uNTEsNTcuMzgsMTEuNywxNi4yMiwxMi44NywxMi4xMiwzNy41NCwyMS4wNiw1NS4wNSw5LjE1LDE3LjkyLDM0LjM2LDI5LjM4LDM2LjgsNDkuODQsMy4wMywyNS40OS0xOC45NywzOS43NS0yMS44MSw2Mi4yMy0zLjIzLDI1LjUxLDguNTIsNTEuOTItMTguMjIsNjguNDItMTEuNzYsNy4yNi0yOC43MSw5LjIzLTM5LjM4LDE2LjgyLTEzLjk2LDkuOTMtMjAuNTksMzEuODctMzguMDYsMzguMDUtMjMuMzcsOC4yNi00MC4yNy0xMy45LTY1LjA2LTcuNjktMTUuMywzLjg0LTI1LjkyLDEyLjk5LTQzLjEsNy45OS0xOS4xMi01LjU3LTI0LjQ1LTI4LjA2LTM4LjkzLTM4LjM1LTEyLjU0LTguOTEtMzEuNjMtOS41NC00My44LTE5LjQyLTIwLTE2LjIyLTExLjU0LTQwLjY2LTEzLjQ1LTYyLjY1LTIuMi0yNS4zNC0yNi4wNS0zOC43LTIyLjE5LTY2LjU5LDIuNjMtMTksMjUuODMtMzAuOSwzNC43OS00NiwxMS4xNC0xOC43Nyw1LjMyLTQ0LjI3LDIzLjYyLTU4LjM0LDE1LjItMTEuNjgsMzYuODgtNS40Nyw1NS4wMy0xMC41NCwxOS4xMi01LjM0LDM1LjQxLTI3LjAyLDUyLjQ0LTI5LjUyWiIvPgogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01NzQuNzYsNTUzLjljLTMuMzYsMjEuMDUtNy41OSw0Mi4zNi0xMi4yNCw2My4yNi0xLjAzLDQuNjMtNC42NiwyNC44Mi03LjY0LDI2LjMxLTIuMjgsMS4xNC01LjYzLDEuMDMtNy43LS41NGwtMzAuNDUtMzQuMDktMzkuMTIsMTYuMDFjLTIuMzguOC00Ljc0LS4xMi02LjQ3LTEuODhsMjEuNjUtMTEwLjczYzEuMzktLjY0LDMuMDgsMS4wMSw0LjAyLDEuOTQsNi4zLDYuMjYsMTIsMTYuOTgsMTguMjIsMjMuOTMsMTYuNDUsMTguMzgsMzYuMDQsMjMuMTYsNTkuNzQsMTUuNzhaIi8+CiAgPHBhdGggY2xhc3M9InN0MCIgZD0iTTY1NS4yMiw2NDIuNTNjLTMuNDIsMi43Ni05LjExLDIuMTktMTAuMjgtMi40OWwtMTguNTgtODQuMjZjLjY2LTEuMTQsMS4xNi0xLjczLDIuNi0xLjY4LDUuMzcuMjEsMTIuMDUsMy41NSwxOC45NCwzLjMzLDYuMDQtLjE5LDE3LjQ1LTMuNjEsMjIuOTMtNi40MSwxNS43My04LjAzLDIzLjg1LTI4LjIyLDM2Ljg0LTM5LjI0bDIyLjY2LDExMC40MWMtMS4xOCwyLjI3LTMuMjgsMy01LjcyLDIuNjUtNy4yNy0xLjA1LTM3LTE2LjMtNDAuMTktMTUuNzJsLTI5LjE5LDMzLjQxWiIvPgo8L3N2Zz4=";

interface TemplateProps extends OGContentItem {
  siteName?: string;
}

// Main template router
export function generateOGTemplate(props: TemplateProps): string {
  switch (props.template) {
    case "default":
      return generateDefaultTemplate(props);
    case "page":
      return generatePageTemplate(props);
    case "feature":
      return generateFeatureTemplate(props);
    default:
      return generatePageTemplate(props);
  }
}

// Generate CSS styles as string
function generateStyles(): string {
  const tokens = OGDesignTokens;

  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;600;700;800&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        width: ${tokens.dimensions.ogWidth}px;
        height: ${tokens.dimensions.ogHeight}px;
        font-family: ${tokens.fonts.primary};
        overflow: hidden;
      }
      
      .template-container {
        width: 100%;
        height: 100%;
        position: relative;
      }
      
      .center-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      
      .hero-title {
        font-size: ${tokens.typography.heroTitle.fontSize}px;
        font-weight: ${tokens.typography.heroTitle.fontWeight};
        line-height: ${tokens.typography.heroTitle.lineHeight};
        background: ${tokens.colors.primaryGradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .page-title {
        font-size: ${tokens.typography.pageTitle.fontSize}px;
        font-weight: ${tokens.typography.pageTitle.fontWeight};
        line-height: ${tokens.typography.pageTitle.lineHeight};
        color: ${tokens.colors.foreground};
      }
      
      .subtitle {
        font-size: ${tokens.typography.subtitle.fontSize}px;
        font-weight: ${tokens.typography.subtitle.fontWeight};
        line-height: ${tokens.typography.subtitle.lineHeight};
        color: ${tokens.colors.foreground};
      }
      
      .page-subtitle {
        font-size: ${tokens.typography.pageSubtitle.fontSize}px;
        font-weight: ${tokens.typography.pageSubtitle.fontWeight};
        line-height: ${tokens.typography.pageSubtitle.lineHeight};
        color: ${tokens.colors.primary};
      }
      
      .description {
        font-size: ${tokens.typography.description.fontSize}px;
        font-weight: ${tokens.typography.description.fontWeight};
        line-height: ${tokens.typography.description.lineHeight};
        color: ${tokens.colors.mutedForeground};
      }
      
      .context {
        font-size: ${tokens.typography.context.fontSize}px;
        font-weight: ${tokens.typography.context.fontWeight};
        line-height: ${tokens.typography.context.lineHeight};
        color: ${tokens.colors.mutedForeground};
      }
      
      .brand-accent {
        width: ${tokens.brand.accentSize}px;
        height: ${tokens.brand.accentSize}px;
        background-image: url('${OG_BRAND_ACCENT_SVG}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: ${tokens.borderRadius.lg}px;
      }
      
      .brand-logo {
        width: ${tokens.brand.logoSize}px;
        height: ${tokens.brand.logoSize}px;
        background-image: url('${OG_BRAND_LOGO_SVG}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: ${tokens.borderRadius.lg}px;
        margin-right: ${tokens.spacing.xs}px;
        flex-shrink: 0;
      }
      
      .absolute-bottom-left {
        position: absolute;
        bottom: ${tokens.spacing.xl}px;
        left: ${tokens.spacing.xxl}px;
        display: flex;
        align-items: center;
      }
      
      .absolute-bottom-right {
        position: absolute;
        bottom: ${tokens.spacing.xxl}px;
        right: ${tokens.spacing.xxl}px;
      }
      
      .card {
        background: ${tokens.colors.card};
        border-radius: ${tokens.borderRadius.xl}px;
        padding: ${tokens.spacing.lg}px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        max-width: 1040px;
      }
    </style>
  `;
}

// Default template: Hero-style for homepage
function generateDefaultTemplate({
  title,
  subtitle,
  description,
}: TemplateProps): string {
  const config = TemplateConfigs.default;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      ${generateStyles()}
    </head>
    <body>
      <div class="template-container" style="
        background: ${OGDesignTokens.colors.backgroundGradient};
        padding: ${config.padding}px;
      ">
        <div class="center-content">
          <div class="hero-title text-center" style="
            margin-bottom: ${config.titleMargin}px;
            max-width: ${config.contentMaxWidth}px;
          ">
            ${title}
          </div>
          
          ${
            subtitle
              ? `
            <div class="subtitle text-center" style="
              margin-bottom: ${config.subtitleMargin}px;
              max-width: ${config.contentMaxWidth}px;
            ">
              ${subtitle}
            </div>
          `
              : ""
          }
          
          ${
            description
              ? `
            <div class="description text-center" style="
              max-width: ${config.contentMaxWidth}px;
            ">
              ${description}
            </div>
          `
              : ""
          }
          
          <div class="absolute-bottom-right brand-accent"></div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Page template: Clean title + subtitle layout for content pages
function generatePageTemplate({
  title,
  subtitle,
  siteName = "RollerCoaster.dev",
}: TemplateProps): string {
  const config = TemplateConfigs.page;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      ${generateStyles()}
    </head>
    <body>
      <div class="template-container" style="
        background: ${OGDesignTokens.colors.background};
        padding: ${config.padding}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      ">
        <div class="page-title" style="
          margin-bottom: ${config.titleMargin}px;
          max-width: ${config.contentMaxWidth}px;
        ">
          ${title}
        </div>
        
        ${
          subtitle
            ? `
          <div class="page-subtitle" style="
            margin-bottom: ${OGDesignTokens.spacing.lg}px;
            max-width: ${config.contentMaxWidth}px;
          ">
            ${subtitle}
          </div>
        `
            : ""
        }
        
        <div class="absolute-bottom-left context">
          <div class="brand-logo"></div>
          ${siteName}
        </div>
      </div>
    </body>
    </html>
  `;
}

// Feature template: Highlight layout for special content
function generateFeatureTemplate({
  title,
  subtitle,
  description,
  siteName = "RollerCoaster.dev",
}: TemplateProps): string {
  const config = TemplateConfigs.feature;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      ${generateStyles()}
    </head>
    <body>
      <div class="template-container" style="
        background: ${OGDesignTokens.colors.background};
        padding: ${config.padding}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      ">
        <div class="card">
          <div class="page-title" style="
            margin-bottom: ${config.featureMargin}px;
          ">
            ${title}
          </div>
          
          ${
            subtitle
              ? `
            <div class="page-subtitle" style="
              color: ${OGDesignTokens.colors.secondary};
              margin-bottom: ${description ? config.featureMargin : 0}px;
            ">
              ${subtitle}
            </div>
          `
              : ""
          }
          
          ${
            description
              ? `
            <div class="description">
              ${description}
            </div>
          `
              : ""
          }
        </div>
        
        <div class="absolute-bottom-right context" style="
          display: flex;
          align-items: center;
        ">
          <div class="brand-logo"></div>
          ${siteName}
        </div>
      </div>
    </body>
    </html>
  `;
}
