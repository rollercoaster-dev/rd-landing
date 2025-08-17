// React templates for OG image generation
import React from 'react'
import { OGDesignTokens, OGStyleUtils, TemplateConfigs } from './og-design-tokens.js'
import type { OGContentItem } from './og-content-config.js'

interface TemplateProps extends OGContentItem {
  siteName?: string
}

// Main template router
export function OGTemplate(props: TemplateProps) {
  switch (props.template) {
    case 'default':
      return <DefaultTemplate {...props} />
    case 'page': 
      return <PageTemplate {...props} />
    case 'feature':
      return <FeatureTemplate {...props} />
    default:
      return <PageTemplate {...props} />
  }
}

// Default template: Hero-style for homepage
function DefaultTemplate({ title, subtitle, description }: TemplateProps) {
  const config = TemplateConfigs.default
  
  return (
    <div style={{
      background: OGDesignTokens.colors.backgroundGradient,
      ...OGStyleUtils.centerContent,
      fontFamily: OGDesignTokens.fonts.primary,
      padding: config.padding,
    }}>
      {/* Hero title with gradient */}
      <div style={{
        ...OGDesignTokens.typography.heroTitle,
        background: OGDesignTokens.colors.primaryGradient,
        backgroundClip: 'text',
        color: 'transparent',
        ...OGStyleUtils.textCenter,
        marginBottom: config.titleMargin,
        maxWidth: config.contentMaxWidth,
      }}>
        {title}
      </div>
      
      {/* Subtitle */}
      {subtitle && (
        <div style={{
          ...OGDesignTokens.typography.subtitle,
          color: OGDesignTokens.colors.foreground,
          ...OGStyleUtils.textCenter,
          marginBottom: config.subtitleMargin,
          maxWidth: config.contentMaxWidth,
        }}>
          {subtitle}
        </div>
      )}

      {/* Description */}
      {description && (
        <div style={{
          ...OGDesignTokens.typography.description,
          color: OGDesignTokens.colors.mutedForeground,
          ...OGStyleUtils.textCenter,
          maxWidth: config.contentMaxWidth,
        }}>
          {description}
        </div>
      )}

      {/* Brand accent element */}
      <div style={{
        ...OGStyleUtils.absoluteBottomRight(
          config.padding, 
          config.padding
        ),
        ...OGStyleUtils.brandAccent(),
      }} />
    </div>
  )
}

// Page template: Clean title + subtitle layout for content pages  
function PageTemplate({ title, subtitle, siteName = "RollerCoaster.dev" }: TemplateProps) {
  const config = TemplateConfigs.page
  
  return (
    <div style={{
      background: OGDesignTokens.colors.background,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: OGDesignTokens.fonts.primary,
      padding: config.padding,
    }}>
      {/* Page title */}
      <div style={{
        ...OGDesignTokens.typography.pageTitle,
        color: OGDesignTokens.colors.foreground,
        lineHeight: 1.1,
        marginBottom: config.titleMargin,
        maxWidth: config.contentMaxWidth,
      }}>
        {title}
      </div>
      
      {/* Subtitle with accent color */}
      {subtitle && (
        <div style={{
          ...OGDesignTokens.typography.pageSubtitle,
          color: OGDesignTokens.colors.primary,
          marginBottom: OGDesignTokens.spacing.lg,
          maxWidth: config.contentMaxWidth,
        }}>
          {subtitle}
        </div>
      )}

      {/* Site context at bottom left */}
      <div style={{
        ...OGStyleUtils.absoluteBottomLeft(
          config.contextPadding,
          config.padding
        ),
        ...OGDesignTokens.typography.context,
        color: OGDesignTokens.colors.mutedForeground,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          ...OGStyleUtils.brandAccent(OGDesignTokens.brand.logoSize),
          marginRight: OGDesignTokens.spacing.xs,
        }} />
        {siteName}
      </div>
    </div>
  )
}

// Feature template: Highlight layout for special content
function FeatureTemplate({ title, subtitle, description, siteName = "RollerCoaster.dev" }: TemplateProps) {
  const config = TemplateConfigs.feature
  
  return (
    <div style={{
      background: OGDesignTokens.colors.background,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: OGDesignTokens.fonts.primary,
      padding: config.padding,
    }}>
      {/* Feature highlight card */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        background: OGDesignTokens.colors.card,
        borderRadius: OGDesignTokens.borderRadius.xl,
        padding: config.highlightPadding,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        maxWidth: config.contentMaxWidth,
      }}>
        {/* Feature title */}
        <div style={{
          ...OGDesignTokens.typography.pageTitle,
          color: OGDesignTokens.colors.foreground,
          marginBottom: config.featureMargin,
        }}>
          {title}
        </div>
        
        {/* Feature subtitle */}
        {subtitle && (
          <div style={{
            ...OGDesignTokens.typography.pageSubtitle,
            color: OGDesignTokens.colors.secondary,
            marginBottom: description ? config.featureMargin : 0,
          }}>
            {subtitle}
          </div>
        )}

        {/* Feature description */}
        {description && (
          <div style={{
            ...OGDesignTokens.typography.description,
            color: OGDesignTokens.colors.mutedForeground,
          }}>
            {description}
          </div>
        )}
      </div>

      {/* Site context at bottom right */}
      <div style={{
        ...OGStyleUtils.absoluteBottomRight(
          config.padding,
          config.padding
        ),
        ...OGDesignTokens.typography.context,
        color: OGDesignTokens.colors.mutedForeground,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          ...OGStyleUtils.brandAccent(OGDesignTokens.brand.logoSize),
          marginRight: OGDesignTokens.spacing.xs,
        }} />
        {siteName}
      </div>
    </div>
  )
}

// Export individual templates for testing
export { DefaultTemplate, PageTemplate, FeatureTemplate }
