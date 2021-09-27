import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginForm from "../LoginForm";

test("Renders initially", () => {
  render(<LoginForm />);
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
});

test("Shows a warning if username is empty", async () => {
  render(<LoginForm />);
  let userInput = screen.getByPlaceholderText("Username");
  let passwordInput = screen.getByPlaceholderText("Password");

  user.click(userInput);
  user.click(passwordInput);

  await waitFor(() => {
    expect(screen.getByText(/Username cannot be empty./)).toBeInTheDocument();
  });
});

test("Shows a warning if password is empty", async () => {
  render(<LoginForm />);
  let userInput = screen.getByPlaceholderText("Username");
  let passwordInput = screen.getByPlaceholderText("Password");

  user.click(passwordInput);
  user.click(userInput);

  await waitFor(() => {
    expect(screen.getByText(/Password cannot be empty./)).toBeInTheDocument();
  });
});
