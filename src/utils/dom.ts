/* eslint-disable class-methods-use-this */

export default class Dom {
  root: HTMLDivElement =  document.createElement("div");
  constructor(htmlString: string) {
    this.root.innerHTML = htmlString;
  }

  querySelector(selector: string) {
    return this.root.querySelector(selector);
  }

  getElement() {
    return this.root.firstChild;
  }
}
