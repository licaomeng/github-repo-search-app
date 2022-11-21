import { stringToColor } from "../../utils";

test("string to color util", () => {
    expect(stringToColor("JavaScript")).toBe("#ada17a");
    expect(stringToColor("Python")).toBe("#fc1c63");
    expect(stringToColor("Java")).toBe("#421e23");
    expect(stringToColor("C#")).toBe("#400800");
});