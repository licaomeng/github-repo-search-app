# Live Site Demo
You can directly open the link below to see the page:

https://licaomeng.github.io/github-repo-search-app/
# Try to demo locally
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
Except `LoadingBar`, customized those components: `Header, SearchBox, RepoList, Pagination`.

<img width="408" alt="image" src="https://user-images.githubusercontent.com/4949036/204257688-bd40d558-80ea-4dc8-a57a-be5555ceca65.png" />

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

## Desktop
<img width="906" alt="image" src="https://user-images.githubusercontent.com/4949036/204261937-9231723f-d647-4e33-93fd-b3222230c4ab.png" />


<img width="906" alt="image" src="https://user-images.githubusercontent.com/4949036/204261868-761949a5-b2d2-401c-89f3-09d11a8a0bce.png" />


## Pad
<img width="475" alt="image" src="https://user-images.githubusercontent.com/4949036/204261709-e2bc05b6-54fa-421f-a2a5-d519f4077f8d.png" />


<img width="472" alt="image" src="https://user-images.githubusercontent.com/4949036/204261587-81e0e368-de84-46c4-9e32-645e27ec891e.png" />



## Mobile
<img width="331" alt="image" src="https://user-images.githubusercontent.com/4949036/204261001-8205b43f-85e9-4d8b-8472-e0045e6810b2.png" />

<img width="330" alt="image" src="https://user-images.githubusercontent.com/4949036/204261448-d82f4df5-cc35-480e-be0b-75e3a8e7f9bd.png" />








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
