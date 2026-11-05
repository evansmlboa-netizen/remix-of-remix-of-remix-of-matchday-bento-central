import { describe, expect, it } from "vitest";
import { riversideFixtures } from "@/lib/league";

describe("Riverside FC fixtures", () => {
  it("includes only matches featuring Riverside FC", () => {
    expect(riversideFixtures.map((match) => match.id)).toEqual(["m10-1", "m11-1", "m12-1"]);
    expect(riversideFixtures.every((match) => match.home === "riv" || match.away === "riv")).toBe(true);
  });
});