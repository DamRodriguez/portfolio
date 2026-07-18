import assert from "node:assert/strict";
import test from "node:test";
import { buildThemeActionConfirmation } from "./chatTheme";

test("builds a deterministic confirmation for dark theme actions", () => {
  assert.equal(
    buildThemeActionConfirmation("dark"),
    "Listo, cambié al modo oscuro.",
  );
});

test("builds a deterministic confirmation for light theme actions", () => {
  assert.equal(
    buildThemeActionConfirmation("light"),
    "Listo, cambié al modo claro.",
  );
});

test("returns null when there is no theme action", () => {
  assert.equal(buildThemeActionConfirmation(null), null);
});
