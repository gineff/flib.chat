import { expect } from "chai";

describe("Router", () => {
  describe("navigate page 'login' then 'register'", () => {
    it("should change history length", () => {
      window.history.pushState({ page: "login" }, "Login", "/login");
      window.history.pushState({ page: "register" }, "Register", "/register");
      expect(window.history.length).to.eq(3);
    });
  });
});
