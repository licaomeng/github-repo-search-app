import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Header } from "../header";

test("[Desktop]renders the header component", () => {
    Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 1000,
    });
    window.dispatchEvent(new Event("resize"));

    const view = render(<Header></Header>);

    expect(view).toMatchSnapshot();
});

test("[Mobile]renders the header component", () => {
    Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 768,
    });
    window.dispatchEvent(new Event("resize"));
    
    const view = render(<Header></Header>);

    expect(view).toMatchSnapshot();
});
