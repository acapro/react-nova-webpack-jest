// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import nodeCrypto from "crypto";

/////////////////////////////  POLYFILLS  //////////////////////////////////////

window.crypto = {
  getRandomValues: function (buffer) {
    if (!buffer) throw new Error("buffer is required");
    return nodeCrypto.randomFillSync(buffer as any);
  },
} as Crypto;

class MockElementInternals {
  shadowRoot: ShadowRoot | null;
  form: HTMLFormElement | null;
  states: Set<string>;
  formValue?: unknown;

  constructor(element: HTMLButtonElement) {
    this.shadowRoot = element.shadowRoot || null;
    this.form = null;
    this.states = new Set();
  }
  setFormValue(value: unknown) {
    this.formValue = value;
  }
}

(Element.prototype as any).attachInternals = function (): MockElementInternals {
  return new MockElementInternals(this);
};

HTMLDialogElement.prototype.show = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true;
});

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true;
});

HTMLDialogElement.prototype.close = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = false;
});
