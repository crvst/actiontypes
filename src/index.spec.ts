import actionTypes from ".";

describe("Normal scenario", () => {
  it("Produces an object with namespaced strings", () => {
    expect(actionTypes("namespace", "ONE", "TWO", "3"))
    .toEqual({
      ONE: "namespace/ONE",
      TWO: "namespace/TWO",
      3: "namespace/3",
    });
  });

  it("Skips repeated keys", () => {
    expect(actionTypes("namespace", "one", "one", "ONE", "oNe"))
    .toEqual({
      ONE: "namespace/ONE",
    });
  });

  it("Works well with options", () => {
    expect(
      actionTypes("namespace", "ONE", "one", "3", {
        delimiter: "",
        prefix: "@@",
      }))
    .toEqual({
      ONE: "@@namespaceONE",
      3: "@@namespace3",
    });
  });
});

describe("Second argument is an array", () => {
  it("Produces an object with namespaced strings", () => {
    expect(actionTypes("namespace", ["ONE", "TWO", "3"]))
    .toEqual({
      ONE: "namespace/ONE",
      TWO: "namespace/TWO",
      3: "namespace/3",
    });
  });

  it("Skips repeated keys", () => {
    expect(
      actionTypes("namespace", ["one", "one", "ONE", "oNe"]))
    .toEqual({
      ONE: "namespace/ONE",
    });
  });

  it("Works well with options", () => {
    expect(
      actionTypes("namespace", ["ONE", "one", "3"], {
        delimiter: "",
        prefix: "@@",
      }))
    .toEqual({
      ONE: "@@namespaceONE",
      3: "@@namespace3",
    });
  });
});

describe("Wrong number of arguments passed", () => {
  it("Throws an error when no arguments passed", () => {
    expect(() => {
      // @ts-ignore
      actionTypes();
    }).toThrow();
  });

  it("Throws an error when the only argument passed", () => {
    expect(() => {
      // @ts-ignore
      actionTypes("namespace");
    }).toThrow();
  });
});

describe("Wrong arguments' types passed", () => {
  it("Throws an error when no string has passed at all", () => {
    expect(() => {
      // @ts-ignore
      actionTypes(1, { prefix: "--" }, [3]);
    }).toThrow();
  });

  it("Throws an error when the namespace is not a string", () => {
    expect(() => {
      // @ts-ignore
      actionTypes(1, "THROW");
    }).toThrow();
  });

  it("Throws an error when the second argument neither a string nor an array", () => {
    expect(() => {
      // @ts-ignore
      actionTypes("namespace", {});
    }).toThrow();
  });
});
