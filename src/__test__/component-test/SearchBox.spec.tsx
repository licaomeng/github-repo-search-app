import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SearchBox } from "../../components/search-box";
import { BrowserRouter as Router } from "react-router-dom";

test("renders the search-box: in header", () => {
  const { container } = render(<Router><SearchBox isInHeader={true}></SearchBox></Router>);

  expect(container).toMatchSnapshot();
});

test("renders the search-box: not in header", () => {
  const { container } = render(<Router><SearchBox isInHeader={false}></SearchBox></Router>);
  const searchBox = screen.getByTestId("search-box-submit-btn");

  expect(container).toMatchSnapshot();
  expect(searchBox).toBeVisible();
});
