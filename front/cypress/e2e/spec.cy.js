describe("My First Test", () => {
  it("should allow a user to navigate through the application", () => {
    // Visit the homepage
    cy.visit("/"); // baseUrl is set, so just use the path

    // Verify the homepage contains the correct title
    cy.get("span").should("contain", "Jobetus");

    // Navigate to the Jobs page
    cy.contains("Jobs").click();
    cy.url().should("include", "/jobs");
    cy.get("h2").should("contain", "Available Jobs");

    // Click on a job to view details
    cy.contains("Read More").first().click();
    cy.url().should("include", "/jobs/");
    cy.get("h3").should("contain", "Job Description");

    // Navigate to the login page
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("h4").should("contain", "Login");

    // Navigate to the register page
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get("h4").should("contain", "Register");

    // Fill in the registration form
    cy.get('input[name="firstName"]').type("john");
    cy.get('input[name="lastName"]').type("wick");
    cy.get('input[name="username"]').type("johnwick");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Register").click();

    cy.get(
      ".Vue-Toastification__toast--success .Vue-Toastification__toast-body"
    ).should("contain", "Registration successful!");

    cy.url().should("include", "/login");
    cy.get('input[name="username"]').type("johnwick");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/");

    // Verify that user can add/edit/delete job
    cy.contains("Add Job").click();
    cy.url().should("include", "/jobs/add");

    cy.contains("Jobs").click();
    cy.contains("Read More").click();
    cy.contains("Edit Job");
    cy.contains("Delete Job");

    cy.contains("Logout").click();
    cy.url().should("include", "/");
  });
});
