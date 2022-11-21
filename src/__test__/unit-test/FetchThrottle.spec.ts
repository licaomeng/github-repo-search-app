import { throttle } from "../../utils";
import type { RequestInterface } from "@octokit/types";

const sleep = (wait: number) => new Promise(resolve => setTimeout(resolve, wait));

jest.setTimeout(10000);

test("fetch throttling", async () => {
    const mockData = [{
        full_name: "marcosesperon/Messi",
        html_url: "https://github.com/marcosesperon/Messi",
        description: "A simple message plugin for jQuery",
        updated_at: "2022-04-26T16:40:47Z",
        stargazers_count: 143,
        language: "CSS"
    }];
    const route = "GET /search/repositories?q={q}&per_page={per_page}";

    const fetch = jest.fn();

    fetch.mockReturnValue(Promise.resolve({ data: mockData }));
    
    const throttleFetch = throttle(fetch as any as RequestInterface<object>, 1000);

    // 1st call
    throttleFetch(route, {
        q: "Messi",
        "per_page": 1
    });

    await sleep(100);

    // 2nd call
    throttleFetch(route, {
        q: "Messi",
        "per_page": 1
    });

    await sleep(600);

    // 3rd call
    await throttleFetch(route, {
        q: "Messi",
        "per_page": 1
    });
    
    await sleep(1000);

    // 4th call
    const { data } = await throttleFetch(route, {
        q: "Messi",
        "per_page": 1
    });

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(data).toBe(mockData);
});