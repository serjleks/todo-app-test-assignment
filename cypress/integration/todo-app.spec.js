describe("ToDo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("should have h1 text", () => {
    cy.get("#root h1").contains("Hello, world");
  });
});
