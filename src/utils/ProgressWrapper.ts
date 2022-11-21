import { Dispatch, SetStateAction } from "react";

// Utility helper to get the type out of a Promise 
type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;

export function progressWrapper<F extends (...args: any[]) => any>(fetch: F, setProgress: Dispatch<SetStateAction<number>>) {
    let intervalId: number | null;

    return async (...args: Parameters<F>): Promise<ReturnPromiseType<F> | undefined> => {
        setProgress(0);
        window.clearInterval(intervalId as number);
        intervalId = window.setInterval(() => {
            setProgress((progress: number) => progress + 10);
        }, 500);

        try {
            return await fetch(...args);
        } catch (error) {
            console.log(error);
        } finally {
            setProgress(100);
            window.clearInterval(intervalId);
        }
    };
}