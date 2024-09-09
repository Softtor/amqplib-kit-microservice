import fs from "node:fs";
import { loadPrompts } from "../../load-prompts";

// Mock do módulo fs
jest.mock("node:fs");

describe("loadPrompts", () => {
  const promptsDir = "/fake/promptsDir";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve carregar os prompts corretamente", () => {
    // Mock para a função readdirSync para retornar uma lista de arquivos
    (fs.readdirSync as jest.Mock).mockReturnValue(["prompt1.js", "prompt2.js"]);

    // Mock para a função require para retornar objetos simulados
    jest.mock(
      "/fake/promptsDir/prompt1.js",
      () => ({ name: "prompt1", handler: jest.fn() }),
      { virtual: true }
    );
    jest.mock(
      "/fake/promptsDir/prompt2.js",
      () => ({ name: "prompt2", handler: jest.fn() }),
      { virtual: true }
    );

    const result = loadPrompts(promptsDir);

    expect(result).toEqual([
      { name: "prompt1", handler: expect.any(Function) },
      { name: "prompt2", handler: expect.any(Function) },
    ]);

    expect(fs.readdirSync).toHaveBeenCalledWith(promptsDir);
  });

  test("deve lançar erro se nenhum prompt for encontrado", () => {
    // Mock para a função readdirSync retornando uma lista vazia
    (fs.readdirSync as jest.Mock).mockReturnValue([]);

    expect(() => loadPrompts(promptsDir)).toThrow("No prompts found");
  });
});
