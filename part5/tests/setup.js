import { expect, afterEach,beforeAll,afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.post("http://localhost:3001/api/login", (req, res, ctx) => {
    console.log('here!')
    return res(
      ctx.json({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuc2ltYXBlcnNpY0BnbWFpbC5jb20iLCJpZCI6IjY0NzkxNTZiYmIxZmU2NzRlMTI2ZjIwNiIsImlhdCI6MTY4NjE1ODkzOSwiZXhwIjoxNjg2MTYyNTM5fQ.TC1mC8j1Le7oN18QGXq4IV6KlAJdWXmHoP9WqWlFNM0",
        username: "ansimapersic@gmail.com",
        name: "Ansima",
      })
    );
  })
);

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => server.listen())
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  server.resetHandlers()
});

afterAll(() => server.close())
