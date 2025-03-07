/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/* eslint-disable testing-library/no-unnecessary-act */
describe("App Form", () => {
  test("renders form elements", async () => {
    render(<App />);

    // Ensure input field is rendered
    await screen.findByRole("textbox", { name: /text/i });

    // Ensure dropdown is rendered
    await screen.findByRole("combobox", { name: /dropdown/i });

    // Ensure submit button is rendered
    await screen.findByRole("button", { name: /submit/i });
  });

  test("validates required fields", async () => {
    render(<App />);

    const submitButton = await screen.findByRole("button", { name: /submit/i });

    // Click submit without filling fields
    await userEvent.click(submitButton);

    // Wait for validation messages
    await screen.findByText(/text is required/i);
  });

  test("submits form with valid input", async () => {
    render(<App />);

    const textInput = (await screen.findByRole("textbox", {
      name: /text/i,
    })) as HTMLInputElement;
    const dropdown = (await screen.findByRole("combobox", {
      name: /dropdown/i,
    })) as HTMLElement;
    const submitButton = await screen.findByRole("button", { name: /submit/i });

    // Fill text input
    await userEvent.type(textInput, "Test Input");

    // Select a dropdown value
    await act(async () => {
      fireEvent(dropdown, new CustomEvent("valueChanged", { detail: "2" }));
    });

    // Click submit
    await act(async () => {
      await userEvent.click(submitButton);
    });

    const results = await screen.findByTestId("results");
    expect(results).toHaveTextContent(
      JSON.stringify({
        dropdown: "2",
        text: "Test Input",
      })
    );
  });
});
