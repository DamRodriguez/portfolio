import assert from "node:assert/strict";
import test from "node:test";
import { parseMarkdownTokens } from "./parser";

test("parses plain URLs as links but keeps emails as text", () => {
  const tokens = parseMarkdownTokens(
    "Puedes ver mi GitHub en https://github.com/DamRodriguez y mi email es nombre@gmail.com",
  );

  assert.deepEqual(tokens, [
    { type: "text", content: "Puedes ver mi GitHub en " },
    {
      type: "link",
      content: "https://github.com/DamRodriguez",
      href: "https://github.com/DamRodriguez",
    },
    { type: "text", content: " y mi email es nombre@gmail.com" },
  ]);
});
