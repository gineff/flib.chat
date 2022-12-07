import { expect } from "chai";
import HTTPTransport from "./HTTPTransport";

const http = new HTTPTransport();

describe("HTTPTransport", () => {
  describe("get request", () => {
    it("users list status 200", async () => {
      http.endpoint = "https://reqres.in/api"; 
      return http.get("/users", { data: { page: 2 }, withCredentials: false }).then((res) => {
        expect((res as any)?.status).to.eq(200);
      });
    });
  });

  describe("post request", () => {
    it("create user status 201", async () => {
      http.endpoint = "https://reqres.in/api";
      return http.post("/users", { data: { name: "morpheus", job: "leader" }, withCredentials: false }).then((res) => {
        expect((res as any)?.status).to.eq(201);
      });
    });
  });


  describe("put request", () => {
    it("update user status 200", async () => {
      http.endpoint = "https://reqres.in/api/2";
      return http.put("/users", { data: { name: "morpheus", job: "zion leader" }, withCredentials: false }).then((res) => {
        expect((res as any)?.status).to.eq(200);
      });
    });
  });

});
