import { expect, test } from "vitest";
import { getEmailConfig } from "./email-config";

test("all three present", () => {
  expect(
    getEmailConfig({
      NEXT_PUBLIC_SERVICE_ID: "s",
      NEXT_PUBLIC_TEMPLATE_ID: "t",
      NEXT_PUBLIC_PUBLIC_KEY: "k",
    })
  ).toEqual({ serviceId: "s", templateId: "t", publicKey: "k" });
});

test("missing or blank → null", () => {
  expect(getEmailConfig({})).toBeNull();
  expect(
    getEmailConfig({
      NEXT_PUBLIC_SERVICE_ID: "s",
      NEXT_PUBLIC_TEMPLATE_ID: " ",
      NEXT_PUBLIC_PUBLIC_KEY: "k",
    })
  ).toBeNull();
});
