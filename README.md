# Live Site Demo
You can directly open the link below to see the page:

https://licaomeng.github.io/github-repo-search-app/
# try to demo locally
**STEP 1:** Perform `yarn install` or `npm install`

**STEP 2:** Perform `yarn start` or `npm start`

**STEP 3:** Open [https://localhost:3000](https://localhost:3000)


# Build
Perform `yarn build` or `npm run build`, `./build` would be generated for production deployment.

# Tech Stack 
- React
- TypeScript

# Requirement Spec
- The page should meet the basic requirement on view/search/pagination/share
- Should consider the throttle use cases including but not limited to enter,  click pagination, etc.
- Should consider the performance. (garbage data collection, event listener management, animation, user interaction, etc.)
- Should consider the corner cases. (no search result, without pagination, fetch failure, etc.)
- Should work well on responsive window and desktop/mobile sides.
- Should consider basic user experience such as loading
- Should consider the accessibility (ARIA, high contrast, etc.).
- Should consider the localization (RTL, translation).

# Component architecture
<img width="425" alt="image" src="https://user-images.githubusercontent.com/4949036/204229602-184a704a-ec3a-4dc7-8efe-6e43da84222d.png" />

## Data entities
Use TS notation to describe data entities to power your components
### SearchBox 
```ts
type SearchBoxProps = {
    isInHeader: boolean;
}
```
### RepoList
```ts
type dataList = {
    name?: string;
    full_name: string;
    html_url: string;
    description: string;
    updated_at: string;
    stargazers_count: number;
    language: string;
}[];

type ListProps = {
    data: dataList;
}
```
### Pagination
```ts
type PaginationProps = {
    currentPage: number;
    totalPages: number;
}
```
### Header
```ts
type HeaderProps = {
    children?: any;
}
```

# API 
Use the following API from GitHub: https://docs.github.com/en/rest/reference/search.

> octokit: https://github.com/octokit/core.js

Octokit provides two approaches: Restful & GraphQL. For this scenario, GraphQL doesn't have much advantages than Restful, I would choose Restful. Below is their comparison.

## Restful
### Pros
 - URL indicates the location of source, more semantical
 - long history, industrial standard
 - caching

### Cons
 - overfetching and underfetching

## GraphQL

### Pros
- The response is exactly what you described in query
- client-driven architecture, benefit the rapid iteration

### Cons
- Lacks in-built caching mechanism


# Page Responsive
Using Flexbox & CSS3 to allow the page responsive, providing Desktop/Pad/Mobile experience to users. The layout of header/search-box/navigator can be changed according to the window size.

# Pagination
- 5 items per page by default.
- responsive with Desktop/Mobile
- integrated with throttling fetch

# Data flow (State Management)
- Hooks
- Router + top-down data flow


# Throttling fetch
## Usage
```js
const throttleFetch = throttle(fetch, wait)
throttleFetch.then(resolve => resolve)
```

```ts
export function throttle(fetch: RequestInterface<object>, wait: number) {
    return function throttled(
        route: keyof Endpoints | "GET /search/repositories?q={q}&per_page={per_page}",
        options?: RequestParameters | undefined
    ): Promise<OctokitResponse<any, number>> {}
}
```

# Clean-up Works

We attached many event listeners, and setInterval, those should be cleaned up at the right time. 

# Error handling
- ErrorBoundary

# CSS module
Using CSS module to prevent css globle pollution: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/



# Performance
## Throttling fetch
## useRef
`useRef vs useState`: for form-input senario, best practice is using useRef instead of useState(with onClick) to prevent component frequent rendering.



# Testing
All test is under `src/__test__`, run `npm run test`

Writing tests can help you improve efficiency,  ensure quality,  avoid regression, etc. The front-end testing usually include: unit testing, component testing, integration test.

The testing coverage is pretty high, the UT/CT coverage is close to 100%.


# ESLint

The project shipped with ESLint, which can make your code style consistent, avoid errors, and improve code quality.

# Theme color
- [x] Dark mode
- [x] Light mode

# Accessibility

- [x] Aria-label
- [x] High contrast

# Localization

- [x] RTL

# Desktop/Mobile

- [x] Desktop

- [x] Mobile
