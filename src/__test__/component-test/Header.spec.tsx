import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "../../header";
import { SearchBox } from "../../search-box";

test("[Desktop]renders the header component", () => {
    const { container } = render(<Router><Header><SearchBox isInHeader={true}></SearchBox></Header></Router>);

    expect(container).toMatchSnapshot();
});
