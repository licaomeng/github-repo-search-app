import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Pagination } from "../../pagination";
import { BrowserRouter as Router } from "react-router-dom";

test("renders the pagination component: currentPage={7} totalPages={15}", () => {
  const view = render(<Router><Pagination currentPage={7} totalPages={15}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={1} totalPages={1}", () => {
  const view = render(<Router><Pagination currentPage={1} totalPages={1}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={1} totalPages={9}", () => {
  const view = render(<Router><Pagination currentPage={1} totalPages={9}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={5} totalPages={9}", () => {
  const view = render(<Router><Pagination currentPage={5} totalPages={9}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={9} totalPages={9}", () => {
  const view = render(<Router><Pagination currentPage={9} totalPages={9}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={5} totalPages={10}", () => {
  const view = render(<Router><Pagination currentPage={5} totalPages={10}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={10} totalPages={10}", () => {
  const view = render(<Router><Pagination currentPage={10} totalPages={10}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={10} totalPages={15}", () => {
  const view = render(<Router><Pagination currentPage={10} totalPages={15}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={11} totalPages={15}", () => {
  const view = render(<Router><Pagination currentPage={11} totalPages={15}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={14} totalPages={15}", () => {
  const view = render(<Router><Pagination currentPage={14} totalPages={15}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});

test("renders the pagination component: currentPage={5} totalPages={15}", () => {
  const view = render(<Router><Pagination currentPage={5} totalPages={15}></Pagination></Router>);

  expect(view).toMatchSnapshot();
});