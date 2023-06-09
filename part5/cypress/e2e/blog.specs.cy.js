describe("Blog App", () => {
  beforeEach(function () {
    cy.request("GET", "http://localhost:3001/reset");
    const user1 = {
      name: "Elvis Ansima",
      username: "elvis.ansima@gmail.com",
      password: "12345678",
    };
    const user2 = {
      name: "Ansima Elvis",
      username: "ansima.elvis@gmail.com",
      password: "12345678",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user1);
    cy.request("POST", "http://localhost:3001/api/users/", user2);

    cy.visit("http://127.0.0.1:5173");
  });


  it("Should show a login form", function () {
    cy.contains("Login").click({ force: true });
    cy.get("input[type=email]").should("be.visible")
    cy.get("input[data-testid=passwordInput]").should("be.visible")
  });


  it("Should hide blog form for anonymous users", function () {
    cy.contains("Blogs").click({ force: true });
    cy.get("form").should("not.exist");
  });

  describe('Login', function () {

    beforeEach(function () {
      cy.visit('http://127.0.0.1:5173/login')
    })

    it('succeeds with correct credentials', function () {
      cy.get("input[type=email]").should("be.visible").type("elvis.ansima@gmail.com");
      cy.get("input[data-testid=passwordInput]").should("be.visible").should("be.enabled").type("12345678");
      cy.get("button.login-btn").click();
      cy.contains("Logout").should("be.visible");
      cy.contains("Elvis Ansima").should("be.visible")
    })

    it('fails with wrong credentials', function () {
      cy.get("input[type=email]").should("be.visible").type("elvis.ansima@gmail.com");
      cy.get("input[data-testid=passwordInput]").should("be.visible").should("be.enabled").type("1234567890");
      cy.get("button.login-btn").click();
      cy.contains("invalid username or password").should("be.visible");
      cy.contains("invalid username or password").parent().should("have.class", "alert-error");
    })
  })

  describe("When logged In", function () {
    beforeEach(function () {
      cy.contains("Login").click({ force: true });
      cy.get("input[type=email]").should("be.visible").type("elvis.ansima@gmail.com");
      cy.get("input[data-testid=passwordInput]").should("be.visible").should("be.enabled").type("12345678");
      cy.get("button.login-btn").click();
    })

    it("Should allow users to create & delete a blog", function () {
      let post_title = "Cypress is enjoyable";
      cy.get(".dropdown").click();
      cy.contains("Blogs").click();
      cy.get(":input").first().should("have.attr", "placeholder", "title").type(post_title);
      cy.get(":input").eq(1).should("have.attr", "placeholder", "url").type("https://google.com");
      cy.get(":input").eq(2).should("have.attr", "placeholder", "likes").type(10);
      cy.contains("Publish").should("be.visible").click();
      cy.contains("Cypress is enjoyable").should("be.visible")
      cy.get(`#delete${post_title.replace(/ /g, '')}`).click();
      cy.contains("Cypress is enjoyable").should("not.exist");
    });

    it("Should not show delete button for non blog owners", function () {
      cy.get(".dropdown").click();
      cy.contains("Blogs").click();
      cy.get(":input").first().should("have.attr", "placeholder", "title").type("Cypress is enjoyable");
      cy.get(":input").eq(1).should("have.attr", "placeholder", "url").type("https://google.com");
      cy.get(":input").eq(2).should("have.attr", "placeholder", "likes").type(10);
      cy.contains("Publish").should("be.visible").click();

      cy.contains("Profile").click({ force: true });
      cy.contains("Logout").click({ force: true });

      cy.contains("Login").click({ force: true });
      cy.get("input[type=email]").should("be.visible").type("ansima.elvis@gmail.com");
      cy.get("input[data-testid=passwordInput]").should("be.visible").should("be.enabled").type("12345678");
      cy.get("button.login-btn").click();
      cy.get(".dropdown").click();
      cy.contains("Blogs").click();
      cy.contains("Delete").should("not.exist");
    });
  })

  it("Should have blog list arranged based on likes number", function () {
    //login
    cy.contains("Login").click({ force: true });
    cy.get("input[type=email]").should("be.visible").type("elvis.ansima@gmail.com");
    cy.get("input[data-testid=passwordInput]").should("be.visible").should("be.enabled").type("12345678");
    cy.get("button.login-btn").click();

    //create 3posts

    cy.get(".dropdown").click();
    cy.contains("Blogs").click();
    cy.get(":input").first().should("have.attr", "placeholder", "title").type("Cypress is enjoyable");
    cy.get(":input").eq(1).should("have.attr", "placeholder", "url").type("https://google.com");
    cy.get(":input").eq(2).should("have.attr", "placeholder", "likes").type(10);
    cy.contains("Publish").should("be.visible").click();
    cy.contains("Cypress is enjoyable").should("be.visible")


    cy.get(":input").first().should("have.attr", "placeholder", "title").type("Cypress is for fullstacks");
    cy.get(":input").eq(1).should("have.attr", "placeholder", "url").type("https://google.com");
    cy.get(":input").eq(2).should("have.attr", "placeholder", "likes").type(12);
    cy.contains("Publish").should("be.visible").click();
    cy.contains("Cypress is for fullstacks").should("be.visible")


    cy.get(":input").first().should("have.attr", "placeholder", "title").type("Cypress is for fullstacks");
    cy.get(":input").eq(1).should("have.attr", "placeholder", "url").type("https://google.com");
    cy.get(":input").eq(2).should("have.attr", "placeholder", "likes").type(8);
    cy.contains("Publish").should("be.visible").click();
    cy.contains("Cypress is for fullstacks").should("be.visible")

    cy.get(".blog-item .blog-likes").should(($items) => {
      expect($items, '2 blog posts likes').to.have.length(3)
      expect($items.eq(0)).to.contain(12)
    })

  })
});
