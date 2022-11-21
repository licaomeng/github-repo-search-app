import { progressWrapper } from "../../utils";

const sleep = (wait: number) => new Promise(resolve => setTimeout(resolve, wait));

jest.setTimeout(10000);

test("fetch throttling", async () => {
    const fetch = jest.fn();
    const setProgress = jest.fn();

    fetch.mockImplementation(async () => sleep(2000));
    
    const wrappedFetch = progressWrapper(fetch, setProgress);

    wrappedFetch();

    await sleep(2000);

    expect(setProgress).toHaveBeenCalledTimes(4);
});