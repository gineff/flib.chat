const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const { window } = new JSDOM("<!DOCTYPE html><div class='root'>Hello world</div>", {
  url: "http://localhost",
});
const { document } = window;

global.window = window;
global.document = document;
global.XMLHttpRequest = window.XMLHttpRequest;
