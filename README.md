# AI Story Rating for Jira - User Manual

## Overview

**AI Story Rating for Jira** is an enterprise-grade web application that leverages artificial intelligence to automatically analyze, rate, and improve your Jira user stories. The system evaluates story quality across multiple dimensions and provides actionable suggestions to help teams write better, more testable, and clearer user stories.

### Key Features
- 🤖 **AI-Powered Analysis**: Intelligent scoring of user stories based on industry best practices
- 📊 **Real-Time Dashboards**: Monitor story quality metrics and trends across your projects
- 💡 **Smart Suggestions**: Get AI-generated improvement recommendations for each story
- 📈 **Analytics & Insights**: Deep-dive analytics into story quality patterns and trends
- ⚙️ **Custom Rubrics**: Define your own evaluation criteria and weights
- 🔌 **Seamless Jira Integration**: Connect directly to your Jira instance
- 📱 **Responsive Design**: Fully responsive interface for desktop and mobile

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Navigation & Layout](#navigation--layout)
3. [Core Sections](#core-sections)
4. [Detailed Workflows](#detailed-workflows)
5. [Technical Configuration](#technical-configuration)
6. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### Login

When you first access the application, you'll arrive at the **Login** page.

#### Login Page Layout
- **Left Panel** (Desktop): Branding section showcasing the application's value proposition with features and benefits
- **Right Panel**: Login form where you authenticate with your Jira credentials

#### Logging In
1. **Email**: Enter your organizational email address
2. **Jira API Token**: Provide your Jira API token (not your password)
3. **Remember Me**: Optional checkbox to keep you logged in on this device
4. **Sign In**: Click the "Sign in with Jira" button to proceed

#### Obtaining a Jira API Token
- Navigate to your [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
- Click "Create API Token"
- Copy the token and paste it into the Jira API Token field
- For help, click "Forgot token?" link on the login page

---

## Navigation & Layout

After logging in, you'll see the main application interface consisting of:

### Sidebar Navigation
Located on the left side (collapsible on mobile), the sidebar contains:

1. **Logo & Branding** (Top)
   - Application icon and "AI Story Rating for Jira" branding
   - Serves as a home button when clicked

2. **Main Navigation Menu**
   - **Dashboard**: Overview of story quality metrics and trends
   - **Stories**: Browse and evaluate all user stories
   - **Projects**: Manage your connected Jira projects
   - **Analytics**: Deep-dive analysis of story quality patterns
   - **Settings**: Configure API keys, LLM models, and rating rubrics

3. **User Section** (Bottom)
   - **Logout**: Sign out of the application

### Mobile Menu
On mobile devices:
- Tap the **Menu icon** (☰) in the top-left to open/close the sidebar
- Sidebar slides in from the left with overlay backdrop
- Tap the **X icon** or anywhere on the overlay to close

### Main Content Area
- Displays the content of the currently selected page
- Responsive design adapts to all screen sizes
- Smooth transitions between pages

---

## Core Sections

### 1. Dashboard

The Dashboard provides a high-level overview of your story quality metrics and trends.

#### Header
- **Title**: "Dashboard"
- **Project Selector**: Choose which Jira project to analyze
- **Filter Button**: Apply additional filters to the data
- **Evaluate Stories Button**: Trigger AI evaluation of stories

#### Key Performance Indicators (KPIs)
Four KPI cards display critical metrics:

| Card | Description | Example Value |
|------|-------------|---|
| **Avg Quality Score** | Average AI rating across all stories | 78 |
| **Missing ACs** | Percentage of stories lacking acceptance criteria | 23% |
| **Risky Stories** | Count of low-scoring, high-risk stories | 12 |
| **Rated Today** | Number of stories evaluated in the last 24 hours | 34 |

Each KPI shows a trend indicator (↑/↓) comparing to the previous sprint.

#### Charts & Visualizations

**Story Quality Distribution** (Bar Chart)
- Shows how many stories fall into each quality band (0-20, 21-40, 41-60, 61-80, 81-100)
- Helps identify quality patterns across your project
- Hover over bars for exact counts

**Quality Trend Over Time** (Line Chart)
- Displays average story score progression across sprints
- Visualizes improvement or decline trends
- Useful for measuring the impact of quality initiatives

#### Weak Stories Table
Lists the lowest-scoring stories in your project with:
- **Story Key**: Unique identifier (e.g., ECOM-123)
- **Summary**: Brief description of the story
- **Score**: Current AI rating (0-100)
- **Status**: Current Jira status (To Do, In Progress, Done)

**Action**: Click on any weak story to view detailed analysis and improvement suggestions.

---

### 2. Stories

The Stories page is your central hub for viewing, searching, and managing individual user stories.

#### Header
- **Title**: "User Stories"
- **Project Selector**: Filter stories by project
- Displays total number of stories and last sync time

#### Search & Filter Section
- **Search Box**: Find stories by key or summary text
- **Filter Button**: Apply advanced filters (sprint, status, score range, etc.)
- **Evaluate All Button**: Re-rate all visible stories at once
- **Active Filters Display**: Shows currently applied filters as tags

#### Stories Table
A comprehensive table of all stories in the selected project:

| Column | Description |
|--------|-------------|
| **Story Key** | Unique identifier (clickable link to detail page) |
| **Summary** | Story title/description |
| **Score** | AI quality rating displayed as a colored badge |
| **Sprint** | Sprint assignment (desktop view only) |
| **Status** | Current Jira status (tablet view and up) |
| **Last Rated** | When the AI last evaluated this story (desktop view only) |
| **Actions** | View and Evaluate buttons |

#### Score Badge Colors
- 🟢 **Green (80+)**: Excellent - Well-written story
- 🟡 **Yellow (60-79)**: Good - Minor improvements suggested
- 🔴 **Red (<60)**: Poor - Significant issues to address

#### Story Actions
- **View**: Navigate to the story detail page for full analysis
- **Evaluate**: Trigger AI re-evaluation of a single story

#### Workflow Example
1. Select a project from the dropdown
2. Use search to find a specific story
3. Review the score and status
4. Click "View" to see detailed analysis
5. Implement suggestions and click "Evaluate" to re-rate
6. Watch the score improve

---

### 3. Story Detail

The Story Detail page provides comprehensive AI analysis of a single user story.

#### Header & Navigation
- **Back Button**: Return to Stories list
- **Story Key**: Displays the story identifier (e.g., ECOM-101)
- **Open in Jira**: Link to view the story in your Jira instance
- **Re-rate Story**: Trigger AI evaluation to update the score

#### Left Column: Story Content

**Story Details Section**
- **Summary**: The user story title (As a [role], I want [action], so that [benefit])
- **Description**: Full story description and context
- **Acceptance Criteria**: Bulleted list of testable criteria
- **Metadata**: Story points, sprint assignment, current status

**AI Improvement Suggestions Section**
A list of actionable recommendations generated by AI to improve the story:
- Specific and concrete suggestions
- Prioritized by impact
- Examples: "Add specific acceptance criteria for error handling", "Define edge cases", "Include performance requirements"

#### Right Column: Quality Analysis

**Overall Score**
- Large, prominent display of the story's quality rating (0-100)
- Score badge with color indicator
- Timestamp of last evaluation

**Quality Dimensions Breakdown**
A detailed analysis of specific quality aspects:

| Dimension | Purpose | Weight |
|-----------|---------|--------|
| **Clarity** | How clearly the story explains what is needed | 25% |
| **Completeness** | Whether all necessary information is included | 20% |
| **Acceptance Criteria** | Quality and testability of defined criteria | 25% |
| **Testability** | How verifiable the story is | 15% |
| **Independence** | How independent the story is from others | 15% |

Each dimension displays:
- A descriptive name
- Individual score (0-100)
- Progress bar showing score percentage
- Weight in overall calculation

#### Story Improvement Workflow
1. Review your overall score and dimensional breakdown
2. Read the AI improvement suggestions
3. Click "Open in Jira" to edit the story in Jira
4. Implement the suggested improvements
5. Return to this page and click "Re-rate Story"
6. Watch your score improve as quality increases

---

### 4. Projects

The Projects page is where you manage your connected Jira projects.

#### Header
- **Title**: "Projects"
- **Add Project Button**: Start the onboarding wizard for new projects

#### Projects Grid
A responsive card-based layout displaying all connected projects:

**Each Project Card Shows:**
- **Project Name**: Full project name
- **Project Key**: Short identifier (e.g., ECOM)
- **Status Badge**: "Active" indicates the project is synced
- **Total Stories**: Count of all stories in the project
- **Average Score**: Average quality rating across all stories
- **Last Sync**: When the project was last synchronized with Jira
- **Trending Icon**: Visual indicator of score trend

**Card Actions:**
- **Open Button**: View project in Jira
- **Configure Button**: Open project settings wizard

#### Onboarding Card
Positioned below the projects grid, encourages adding more projects:
- **Title**: "Ready to add more projects?"
- **Description**: Explanation of the 5-step wizard process
- **Call-to-Action**: "Start Project Setup" button

#### Project Management Workflow
1. Click "Add Project" to start setup
2. Complete the 5-step wizard (Connect Jira → Select Projects → Field Mapping → Rating Rubric → Domain Context)
3. Once complete, project appears in the grid
4. Click "Configure" anytime to update project settings
5. Click "Open" to manage the project in Jira

---

### 5. Analytics

The Analytics page provides advanced insights into story quality patterns and trends.

#### Header
- **Title**: "Analytics"
- **Project Selector**: Choose which project to analyze
- **Date Range Button**: Filter data by date range
- **Export Report Button**: Download analytics as a report

#### Analytics Visualizations

**Sprint Comparison Chart** (Bar Chart)
- Shows average score progression across recent sprints
- X-axis: Sprint names (Sprint 1-6)
- Y-axis: Average score (0-100)
- Trend lines help identify improvement patterns
- Hover for exact values

**Issue Breakdown** (Pie Chart)
Common quality issues found in stories, displayed as percentages:
- 🔴 **Missing ACs** (Acceptance Criteria): Stories lacking clear testable criteria
- 🟡 **Unclear Description**: Stories with vague or confusing descriptions
- 🟠 **Poor Testability**: Stories that are difficult to verify
- 🔵 **Dependencies**: Stories with unclear relationships to other work

**Quality Bands Distribution** (Bar Chart)
Categorizes stories by quality level:
- **Excellent (80+)**: Well-written stories
- **Good (60-79)**: Acceptable with minor improvements
- **Fair (40-59)**: Needs significant improvement
- **Poor (<40)**: Critical issues to address

#### Analytics Insights Workflow
1. Select a project to analyze
2. Review sprint progression chart to identify trends
3. Examine issue breakdown to pinpoint common problems
4. Check quality bands distribution to see overall health
5. Export reports to share with stakeholders or track improvement over time
6. Use date range filters to compare specific time periods

---

### 6. Settings

The Settings page allows you to configure your application and customize the AI evaluation criteria.

#### Settings Tabs

**API Keys Tab**
Configure connections to external services:
- **Jira Instance URL**: Your Atlassian instance URL (https://your-domain.atlassian.net)
- **Jira API Token**: Authentication token for Jira access
- **OpenAI API Key**: API key for AI model access (or other LLM providers)
- **Save Button**: Persist your configuration changes

**LLM Model Tab**
Select which AI model powers your story evaluations:
- **GPT-4** (Recommended)
  - Most accurate and capable
  - Best for complex, nuanced story analysis
  - Slightly slower and more expensive
- **GPT-3.5 Turbo**
  - Good balance of speed and accuracy
  - Faster evaluation times
  - Lower cost
- **Claude 2** (Coming Soon)
  - Alternative AI provider option
  - Additional perspective on story quality

**Rubric Tab**
Define your custom evaluation criteria:

Each evaluation dimension shows:
- **Name**: Dimension title (e.g., "Clarity")
- **Weight**: Percentage contribution to overall score (set with slider)
- **Toggle**: Enable/disable this dimension
- **Remove Button**: Delete custom dimensions

**Predefined Dimensions:**
- Clarity (default: 20%)
- Completeness (default: 25%)
- Acceptance Criteria (default: 25%)
- Testability (default: 15%)
- Estimation Quality (default: 15%)

**Custom Dimensions:**
- **Add Custom Dimension**: Input field to create new evaluation criteria
- Example custom dimensions: "Security", "Performance", "Accessibility"
- Total weights automatically recalculated

**Users Tab**
Manage team members and access (admin feature):
- View list of users with access to the system
- Manage user roles and permissions
- Add/remove team members

#### Settings Workflow
1. Go to Settings from the main menu
2. Navigate to the appropriate tab
3. Make your changes (API keys, model selection, rubric customization)
4. Click "Save" to persist changes
5. Changes take effect immediately

---

## Detailed Workflows

### Workflow 1: Complete Your First Story Evaluation

**Goal**: Evaluate a story and implement improvements

**Steps:**
1. Log in with your Jira credentials
2. Navigate to **Dashboard**
3. Select your project from the dropdown
4. Review KPI cards and identify weak stories
5. Click on a weak story from the "Weak Stories" table
6. Navigate to the story detail page
7. Review the overall score and dimensional breakdown
8. Read the AI improvement suggestions
9. Click "Open in Jira" to edit the story directly
10. Implement 2-3 of the top suggestions
11. Return to the app and click "Re-rate Story"
12. Observe the score improvement
13. Repeat for other weak stories

### Workflow 2: Batch Evaluate All Stories in a Sprint

**Goal**: Rate all stories at once to get comprehensive metrics

**Steps:**
1. Navigate to **Stories** page
2. Select your project
3. (Optional) Apply filters for specific sprint or status
4. Click "Evaluate All" button
5. Wait for the evaluation to complete (shows "Evaluating..." status)
6. Review the "Last Rated" timestamps to confirm completion
7. Go to **Dashboard** to see updated metrics
8. Navigate to **Analytics** for detailed patterns
9. Export report for team sharing

### Workflow 3: Set Up Project-Specific Evaluation Criteria

**Goal**: Customize how stories are evaluated for your specific project

**Steps:**
1. Navigate to **Projects** page
2. Find your project card
3. Click "Configure" button
4. Complete the Project Wizard (Step 4: Rating Rubric)
5. Review predefined dimensions
6. Add custom dimensions relevant to your project
7. Adjust weights to reflect your priorities
8. Example: If security is critical, increase "Security" dimension weight
9. Continue through remaining wizard steps
10. Confirm and save changes
11. Existing stories will be re-evaluated with new criteria

### Workflow 4: Monitor Quality Trends Over Time

**Goal**: Track how story quality improves with each sprint

**Steps:**
1. Navigate to **Analytics** page
2. Select your project
3. Review "Sprint Comparison" chart
4. Look for upward trend indicating improvement
5. Click on specific sprints to drill down
6. Review "Issue Breakdown" to identify common problems
7. Check "Quality Bands" to see distribution
8. (Optional) Apply date range filters
9. Export report to track progress
10. Share results with team to celebrate improvements

### Workflow 5: Connect a New Jira Project

**Goal**: Add another Jira project to the application

**Steps:**
1. Navigate to **Projects** page
2. Click "Add Project" or "Start Project Setup" button
3. **Step 1 - Connect Jira**
   - Enter your Jira Instance URL
   - Provide your Jira API Token
   - Click "Next"
4. **Step 2 - Select Projects**
   - See list of available projects in your Jira instance
   - Check the projects you want to evaluate
   - Click "Next"
5. **Step 3 - Field Mapping**
   - Map Jira custom fields to standard fields
   - Ensure Description and Acceptance Criteria are properly mapped
   - Click "Next"
6. **Step 4 - Rating Rubric**
   - Review/customize evaluation dimensions and weights
   - Add any project-specific criteria
   - Click "Next"
7. **Step 5 - Domain Context**
   - Enter domain-specific context about your project
   - Example: "E-commerce platform handling payments, security is critical"
   - Click "Complete"
8. Project syncs with Jira and appears in Projects grid

---

## Technical Configuration

### Prerequisites
- Active Jira Cloud instance or Jira Server
- Jira API token (not password)
- OpenAI API key or alternative LLM provider
- Modern web browser (Chrome, Firefox, Safari, Edge)

### System Architecture
- **Frontend**: React + TypeScript with Vite
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: React Hook Form + TanStack Query
- **Routing**: React Router v6
- **Charts**: Recharts for data visualization
- **Styling**: Tailwind CSS with custom theme

### API Integrations
1. **Jira API**: Fetches story data, manages project connections
2. **LLM API**: Sends stories for evaluation, receives scores and suggestions

### Data Flow
1. User logs in → Authenticated with Jira credentials
2. Select project → App fetches stories from Jira
3. Evaluate stories → Stories sent to LLM for analysis
4. LLM returns scores and suggestions → Stored and displayed
5. View analytics → Data aggregated and visualized

---

## Tips & Best Practices

### For Story Writers
1. **Use the Standard Format**: "As a [role], I want [action], so that [benefit]"
2. **Be Specific**: Avoid vague language; be precise about requirements
3. **Add Acceptance Criteria**: Always include testable acceptance criteria
4. **Define Edge Cases**: Mention error scenarios and edge cases
5. **Include Non-Functionals**: Mention security, performance, or accessibility requirements
6. **Keep Stories Independent**: Minimize dependencies on other stories
7. **Estimate Realistically**: Provide story points based on actual effort

### For Project Managers
1. **Monitor Trends**: Check Analytics weekly to track quality improvements
2. **Set Goals**: Use quality scores to set team improvement targets
3. **Celebrate Progress**: Share positive trends with your team
4. **Prioritize High-Impact Improvements**: Focus on the most common issues
5. **Export Reports**: Use analytics exports in stakeholder meetings
6. **Review with Team**: Regular walkthroughs of weak stories with the team

### For Quality Advocates
1. **Use Custom Rubrics**: Tailor evaluation criteria to your standards
2. **Add Domain Context**: Provide project-specific context during setup
3. **Track Improvements**: Export reports to measure quality initiatives
4. **Identify Patterns**: Use issue breakdown to find systemic problems
5. **Share Best Practices**: Highlight well-written stories as examples

### For Administrators
1. **Keep API Keys Secure**: Store credentials in secure environment variables
2. **Regular Syncs**: Ensure projects sync with Jira regularly
3. **Monitor Usage**: Track evaluation volume to estimate LLM costs
4. **Update Settings**: Periodically review and optimize evaluation criteria
5. **Backup Data**: Export reports regularly for compliance and audit purposes

---

## Troubleshooting

### Common Issues

**Issue: Login fails with "Invalid credentials"**
- Verify your Jira API token is correct (tokens expire and need renewal)
- Check that you're using an API token, not your password
- Ensure your email address is correct and matches your Jira account

**Issue: Stories not appearing**
- Confirm project is properly synced from Jira
- Check that you have read access to the project in Jira
- Try re-syncing the project from the Projects page

**Issue: Evaluation taking too long**
- Large numbers of stories may take several minutes
- Check that your API keys are valid
- Consider evaluating stories in smaller batches

**Issue: Low scores on all stories**
- Review your rubric weights - they may be too strict
- Adjust dimension weights in Settings to better reflect your standards
- Add domain context during project setup to improve accuracy

**Issue: API errors**
- Verify your API keys are valid and haven't expired
- Check your internet connection
- Ensure your Jira instance is accessible
- Contact support if errors persist

---

## Support & Resources

### Getting Help
- Review this manual for detailed feature explanations
- Check the in-app tooltips for quick guidance
- Export reports for offline reference
- Contact your administrator for access or configuration issues

### Best Practices Resources
- [JIRA Story Writing Best Practices](https://www.atlassian.com/agile/project-management/user-stories)
- [Acceptance Criteria Guidelines](https://www.agilealliance.org/glossary/acceptance-criteria/)
- [AI Evaluation Methodology](See documentation in app settings)

---

## Version & Updates

- **Current Version**: 1.0.0
- **Last Updated**: December 2024
- **Built With**: React 18, TypeScript, Tailwind CSS, Vite
- **Supported Jira Versions**: Cloud and Server 8.0+

---

## Summary

AI Story Rating for Jira transforms how teams evaluate and improve user stories. By combining machine learning with industry best practices, the application provides objective, consistent feedback that helps teams write clearer, more testable, more complete stories. Whether you're a story writer seeking improvement suggestions, a project manager monitoring quality trends, or a quality advocate setting standards, this application provides the insights and tools needed to elevate your storytelling and delivery quality.

Start by connecting your first Jira project, evaluate some stories, and watch as your team's story quality improves sprint after sprint!
