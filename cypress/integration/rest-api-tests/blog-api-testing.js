describe("api testing on blog", () => {
  it("create a new post", function () {
    cy.request({
      method: "POST",
      url: `${Cypress.env("api_url")}/posts`,
      body: {
        title: "Automation",
        body: "sample",
        userId: 1,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(function (response) {
      expect(response.status).to.be.eq(201);
      expect(response.body).to.deep.equal({
        title: "Automation",
        body: "sample",
        userId: 1,
        id: 101,
      });
    });
  });

  it("Get all posts", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("api_url")}/posts`,
    }).then(function (response) {
      expect(response.status).to.be.eq(200);
      expect(response.body.length).to.be.eq(100);
    });
  });

  it("Update an existing post", function () {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("api_url")}/posts/1`,
      body: {
        id: 1,
        title: "Automation Update",
        body: "sample update",
        userId: 1,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(function (response) {
      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.equal({
        title: "Automation Update",
        body: "sample update",
        userId: 1,
        id: 1,
      });
    });
  });

  it("Delete an existing posts", function () {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("api_url")}/posts/1`,
    }).then(function (response) {
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.empty;
    });
  });

  it("Filtering the posts for the first user and checking the results", function () {
    cy.request({
      url: `${Cypress.env("api_url")}/posts?userId=1`,
    }).then(function (response) {
      expect(response.status).to.be.eq(200);
      expect(response.body.length).to.be.eq(10);
      response.body.forEach((post) => {
        expect(post.userId).to.be.eq(1);
      });
    });
  });
  
  it("Get an existing post", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("api_url")}/posts/1`,
    }).then(function (response) {
      expect(response.status).to.be.eq(200);
      expect(response.body.userId).to.be.eq(1);
    });
  });
});
