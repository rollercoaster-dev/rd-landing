#!/bin/bash

# Comprehensive Issue Enhancement Script for Rollercoaster.dev
# This script adds proper labels, priorities, and milestones to all issues

REPO="rollercoaster-dev/rd-monolith"

echo "🚀 Enhancing all GitHub issues with proper labels and priorities..."

# Phase 1: Critical Accessibility Issues (Foundation)
echo "📋 Updating Phase 1 Critical Issues..."

# Issue #30: Focus indicators (already has critical priority)
gh issue edit 30 --add-label "priority: critical" --repo $REPO

# Issue #31: Skip links (already has critical priority and good first issue)
gh issue edit 31 --add-label "priority: critical" --repo $REPO

# Issue #32: Target size compliance
gh issue edit 32 --add-label "priority: critical,good first issue" --repo $REPO

# Issue #33: Motion control implementation
gh issue edit 33 --add-label "priority: high,documentation" --repo $REPO

# Issue #37: WCAG audit and testing
gh issue edit 37 --add-label "priority: high,testing,help wanted" --repo $REPO

# Phase 2: Neurodivergent Experience Issues
echo "📋 Updating Phase 2 Neurodivergent Experience Issues..."

# Issue #34: Content chunking system
gh issue edit 34 --add-label "priority: medium,help wanted" --repo $REPO

# Issue #35: Sensory customization panel
gh issue edit 35 --add-label "priority: medium,help wanted" --repo $REPO

# Issue #36: Attention management tools
gh issue edit 36 --add-label "priority: medium,help wanted" --repo $REPO

# SEO and Content Issues (from the original plan)
echo "📋 Updating SEO and Content Issues..."

# Issue #19: Copy content for core pages
gh issue edit 19 --add-label "content,priority: high,help wanted,good first issue" --repo $REPO

# Issue #20: Legal pages
gh issue edit 20 --add-label "legal,content,priority: medium,good first issue" --repo $REPO

# Issue #21: Design polish
gh issue edit 21 --add-label "design,frontend,priority: medium" --repo $REPO

# Issue #22: Accessibility (duplicate of our new issues)
gh issue edit 22 --add-label "a11y,wcag22,frontend,priority: low" --add-assignee joeczar --repo $REPO
gh issue comment 22 --body "⚠️ **Note**: This issue is superseded by the comprehensive accessibility issues #30-37. Consider closing this in favor of the more detailed implementation plan." --repo $REPO

# Issue #23: Social share OG images
gh issue edit 23 --add-label "seo,design,frontend,priority: medium" --repo $REPO

# Issue #24: SEO meta tags
gh issue edit 24 --add-label "seo,frontend,priority: high" --repo $REPO

# Issue #25: Robots.txt and sitemap
gh issue edit 25 --add-label "seo,frontend,priority: medium,good first issue" --repo $REPO

# Issue #26: Performance optimization
gh issue edit 26 --add-label "performance,frontend,priority: high" --repo $REPO

# Issue #27: Content freshness
gh issue edit 27 --add-label "content,frontend,priority: low" --repo $REPO

# i18n and Internationalization Issues
echo "📋 Updating i18n Issues..."

# Issue #10: Architecture plan
gh issue edit 10 --add-label "i18n,a11y,documentation,priority: medium" --repo $REPO

# Issue #11: Brand voice and guidelines
gh issue edit 11 --add-label "i18n,content,documentation,priority: medium" --repo $REPO

# Issue #12: Translation review templates
gh issue edit 12 --add-label "i18n,documentation,priority: low,good first issue" --repo $REPO

# Issue #13: Variant locales
gh issue edit 13 --add-label "i18n,frontend,priority: medium" --repo $REPO

# Issue #14: Language dropdown UI
gh issue edit 14 --add-label "i18n,frontend,design,priority: medium" --repo $REPO

# Issue #15: Header language toggle
gh issue edit 15 --add-label "i18n,frontend,priority: low" --repo $REPO

# Issue #16: i18n tests
gh issue edit 16 --add-label "i18n,testing,frontend,priority: low" --repo $REPO

# Issue #17: Tooling and CI
gh issue edit 17 --add-label "i18n,testing,priority: low" --repo $REPO

echo "✅ All issues have been enhanced with proper labels and priorities!"
echo ""
echo "📊 Summary of Priority Distribution:"
echo "🔴 Critical Priority: Issues #30, #31, #32 (Foundation accessibility)"
echo "🟠 High Priority: Issues #19, #24, #26, #33, #37 (Core functionality)"
echo "🟡 Medium Priority: Issues #10, #11, #13, #14, #20, #21, #23, #25, #34, #35, #36"
echo "🟢 Low Priority: Issues #12, #15, #16, #17, #22, #27"
echo ""
echo "🎯 Recommended Implementation Order:"
echo "1. Start with Critical Priority accessibility issues (#30-32)"
echo "2. Move to High Priority SEO and performance (#19, #24, #26)"
echo "3. Complete Phase 1 with motion controls and testing (#33, #37)"
echo "4. Begin Phase 2 neurodivergent features (#34-36)"
echo "5. Address remaining medium/low priority items as capacity allows"
