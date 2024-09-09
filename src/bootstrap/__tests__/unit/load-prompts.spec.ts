import fs from "node:fs";
import { loadPrompts } from "../../load-prompts";
jest.mock("fs");
jest.mock(
  "/path/to/prompts/prompt1.js",
  () => ({
    name: "Prompt 1",
    message: "Enter value for Prompt 1",
    handler: jest.fn(),
  }),
  { virtual: true }
);
jest.mock(
  "/path/to/prompts/prompt2.js",
  () => ({
    name: "Prompt 2",
    message: "Enter value for Prompt 2",
    handler: jest.fn(),
  }),
  { virtual: true }
);

describe("loadPrompts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should load prompts from the given directory", () => {
    const promptsDir = "/path/to/prompts";
    const mockPromptFiles = ["prompt1.js", "prompt2.js"];
    const mockPrompts = [
      { name: "Prompt 1", message: "Enter value for Prompt 1" },
      { name: "Prompt 2", message: "Enter value for Prompt 2" },
    ];

    jest
      .spyOn(fs, "readdirSync")
      .mockReturnValue(mockPromptFiles as unknown as fs.Dirent[]);

    const result = loadPrompts(promptsDir);

    expect(fs.readdirSync).toHaveBeenCalledWith(promptsDir);
    expect(result).toEqual(mockPrompts);
  });

  it("should throw an error if no prompts are found", () => {
    const promptsDir = "/path/to/prompts";
    const mockPromptFiles: string[] = [];

    jest.spyOn(fs, "readdirSync").mockReturnValue(mockPromptFiles as any);

    expect(() => loadPrompts(promptsDir)).toThrow("No prompts found");
  });
});
