# GitHub Status Cards Integration

## Overview

A simple, lightweight system that displays live progress from 3 OpenBadges repositories on the rollercoaster.dev landing page. Shows authentic project status with GitHub issue completion data, designed specifically for the neurodivergent community to provide transparent progress indicators instead of static estimates.

## Architecture

### Repositories Tracked

1. **openbadges-modular-server** → "Core Badge Engine" card
2. **openbadges-ui** → "User Interface (Vue)" card
3. **openbadges-system** → "Community Features" card

### System Components

```
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│   GitHub API        │    │   Backend Proxy      │    │   Frontend UI       │
│                     │    │                      │    │                     │
│ • GraphQL v4        │───▶│ • GitHubProjectsService │───▶│ • Landing Page      │
│ • Issue/Milestone   │    │ • In-Memory Cache    │    │ • Status Cards      │
│   Data              │    │ • Single Endpoint    │    │ • Progress Bars     │
└─────────────────────┘    └──────────────────────┘    └─────────────────────┘
```

## Backend Implementation

### GitHubProjectsService

**Location**: `src/backend/services/github-projects.service.ts`

**Key Methods**:

- `fetchAllRepositoryProgress()`: Fetch current status from all 3 repos
- `getStatusCardData()`: Format data for landing page cards
- `getDashboardStats()`: Aggregate statistics for admin dashboard

**GraphQL Query Structure**:

```graphql
query GetRepositoryProgress($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    url
    openIssues: issues(states: OPEN) {
      totalCount
    }
    closedIssues: issues(states: CLOSED) {
      totalCount
    }
    milestones(states: OPEN, first: 10) {
      nodes {
        title
        progressPercentage
        openIssues: issues(states: OPEN) {
          totalCount
        }
        closedIssues: issues(states: CLOSED) {
          totalCount
        }
        dueOn
      }
    }
  }
}
```

### API Endpoints

**Location**: `src/backend/api/github/github.routes.ts`

- `GET /api/github/status-cards`: Live data for landing page cards with 5-minute caching

### Caching Strategy

**In-Memory Cache**: 5-minute TTL to prevent API spam while keeping data fresh
**No Database**: Simplified architecture with no persistent storage needed

## Frontend Implementation

### Landing Page Integration

**Location**: `src/frontend/pages/index.vue`

**Changes**:

- Replaced static status cards with live GitHub data
- Added loading states and error handling
- Fetches fresh data on page load
- Reactive progress bars and issue counts

### Enhanced Status Cards

**Location**: `src/frontend/components/rd/StatusCard/index.vue`

**New Features**:

- Live progress bars with smooth animations
- GitHub repository links
- Real issue counts (completed/total)
- Last updated timestamps
- Responsive loading states

### Composable for Data Management

**Location**: `src/frontend/composables/useGitHubProjects.ts`

**Functionality**:

- Reactive data management
- Backend API integration
- Error handling and retry logic
- Loading state management

## Configuration

### Environment Variables

```bash
# GitHub API Token (required for API access)
GITHUB_TOKEN=ghp_your_personal_access_token
```

### GitHub Token Permissions

Required scopes:

- `repo` (for private repositories)
- `public_repo` (for public repositories)
- `read:org` (for organization data)

## Automatic Updates

### Update Strategy

The system fetches live data on demand:

- **On-demand loading**: Fresh data fetched when page loads
- **In-memory caching**: Backend caches results for 5 minutes
- **Simple refresh**: Users can refresh page for latest data
- **Rate limiting**: Respects GitHub's 5000 requests/hour limit

## Data Flow

### Page Load Flow

1. User visits landing page
2. `useGitHubProjects` composable calls backend
3. Backend checks in-memory cache (5min TTL)
4. If cache expired, fetches fresh data from GitHub GraphQL API
5. Live data populates status cards with real progress

### Data Refresh

1. User refreshes page or navigates back
2. Backend serves cached data if still fresh
3. Or fetches latest data from GitHub if cache expired
4. Status cards update with current progress

## Benefits for Neurodivergent Users

### Authentic Progress Tracking

- **Real Data**: Progress reflects actual GitHub activity, not estimates
- **Visual Validation**: See genuine accomplishments through progress bars
- **Transparent Development**: No hidden or inflated metrics

### Reduced Cognitive Load

- **Simple Loading**: No need to manually check multiple repositories
- **Consistent Interface**: All project data in one unified view
- **Clear Status Indicators**: Immediate understanding of project state

### Flexible Information Access

- **Clean Interface**: Focus on essential progress information
- **Direct Links**: Easy access to GitHub issues and repositories
- **Fresh Data**: "Last updated" timestamps for context

## Future Enhancements (If Needed)

### Database-Backed Caching

- [ ] Add database tables if high traffic requires persistent caching
- [ ] Historical progress tracking
- [ ] Analytics and usage metrics

### Enhanced Features

- [ ] Pull request completion tracking
- [ ] Milestone deadline indicators
- [ ] Simple admin page for manual refresh

## Maintenance

### Monitoring

- Monitor server logs for GitHub API errors
- Check API rate limits (5000 requests/hour)
- Verify GitHub API status for service issues

### Troubleshooting

- **Stale Data**: Wait for cache to expire (5min) or restart server
- **API Errors**: Verify GITHUB_TOKEN permissions and rate limits
- **Loading Issues**: Check frontend console for fetch errors

## Security Considerations

- GitHub PAT stored securely as environment variable
- Database queries parameterized to prevent injection
- API rate limiting prevents abuse
- Admin dashboard requires authentication (future enhancement)

---

This lightweight system provides authentic, transparent project status perfectly suited for the neurodivergent community's need for genuine progress indicators and reduced uncertainty around project status.
