import type { RequestInterface, Endpoints, RequestParameters, OctokitResponse } from "@octokit/types";

export function throttle(fetch: RequestInterface<object>, wait: number) {
    let lastRun = 0;
    let timeoutId: number = 0;
    let result: OctokitResponse<any, number> | PromiseLike<OctokitResponse<any, number>>;

    async function throttled(
        route: keyof Endpoints | "GET /search/repositories?q={q}&per_page={per_page}",
        options?: RequestParameters | undefined
    ): Promise<OctokitResponse<any, number>> {
        const currentWait = lastRun + wait - Date.now();
        const shouldRun = currentWait <= 0;

        if (shouldRun) {
            lastRun = Date.now();
            result = await fetch(route, options);

            return result;
        }

        if (timeoutId) {
            window.clearTimeout(timeoutId as any as number);
        }

        return await new Promise((resolve) => {
            timeoutId = window.setTimeout(() => {
                resolve(throttled(route, options));
            }, currentWait);
        });
    }

    return throttled;
}
