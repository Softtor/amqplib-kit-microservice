import toJson from "../../helpers/sequelize/to-json.sequelize";

describe("toJson", () => {
  it("should return null if the input is null", () => {
    const result = toJson(null);
    expect(result).toBeNull();
  });

  it("should return an array of plain objects if the input is an array of sequelize models", () => {
    const models = [
      { get: jest.fn().mockReturnValue({ id: 1, name: "John" }) },
      { get: jest.fn().mockReturnValue({ id: 2, name: "Jane" }) },
    ];

    const result = toJson(models);

    expect(result).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ]);
    expect(models[0].get).toHaveBeenCalledWith({ plain: true });
    expect(models[1].get).toHaveBeenCalledWith({ plain: true });
  });

  it("should return a plain object if the input is a single sequelize model", () => {
    const model = { get: jest.fn().mockReturnValue({ id: 1, name: "John" }) };

    const result = toJson(model);

    expect(result).toEqual({ id: 1, name: "John" });
    expect(model.get).toHaveBeenCalledWith({ plain: true });
  });
});
