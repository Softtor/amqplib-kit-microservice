import { HandlerType, Prompts } from "../../../types/handler-types";
import handleRequest from "../../handlers/handler-request";

describe("handleRequest", () => {
  const mockHandler1: HandlerType = jest.fn().mockResolvedValue("Result 1");
  const mockHandler2: HandlerType = jest.fn().mockResolvedValue("Result 2");
  const mockPrompts: Prompts = [
    { name: "Prompt 1", handler: mockHandler1 },
    { name: "Prompt 2", handler: mockHandler2 },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle the request and return the result for Prompt 1", async () => {
    const prompt = "Prompt 1";
    const message = "Test message";

    const result = await handleRequest(mockPrompts, prompt, message);

    expect(mockHandler1).toHaveBeenCalledWith(message);
    expect(result).toEqual("Result 1");
  });

  it("should handle the request and return the result for Prompt 2", async () => {
    const prompt = "Prompt 2";
    const message = "Test message";

    const result = await handleRequest(mockPrompts, prompt, message);

    expect(mockHandler2).toHaveBeenCalledWith(message);
    expect(result).toEqual("Result 2");
  });

  it("should throw an error when no handler is found for the prompt", async () => {
    const prompt = "Prompt 3";
    const message = "Test message";

    await expect(handleRequest(mockPrompts, prompt, message)).rejects.toThrow(
      `No handler found for prompt: ${prompt}`
    );
  });
});
