import { expect } from "chai";
import Component from "./component";

const template = "<p>{{greetings}}</p>";
const ternarTemplate = "<p>{{this.isMorning ? Good Morning! : Good afternoon!}}</p>";

class TestComponent extends Component {
  constructor() {
    super({ template });
  }
  getStateFromProps(): void {
    this.setState({ greetings: "Hellow, World!", isMorning: true });
  }
}

const testComponent = new TestComponent();

describe("Templator", () => {
  describe("compile result from <p>{{greetings}}</p>", () => {
    it("should be '<p>Hellow, World!</p>'", () => {
      expect(testComponent._compile(template)).to.eq("<p>Hellow, World!</p>");
    });
  });

  describe("ternar operator <p>{{this.isMorning ? Good Morning! : Good afternoon!}}</p>", () => {
    it("should should return <p>Good Morning!</p>", () => {
      expect(testComponent._compile(ternarTemplate)).to.eq("<p>Good Morning!</p>");
    });
  });
});

describe("Component", () => {
  describe("component.getContent().innerHTML", () => {
    it("should be Hellow, World!", () => {
      expect((testComponent.getContent() as HTMLElement).innerHTML).to.eq("Hellow, World!");
    });
  });

  describe("component on setState", () => {
    it("should update!", () => {
      testComponent.setState({ greetings: "Good Day!" });
      expect((testComponent.getContent() as HTMLElement).innerHTML).to.eq("Good Day!");
    });
  });

  describe("Component property isComponent", () => {
    it("should be true!", () => {
      expect(TestComponent.isComponent).to.eq(true);
    });
  });
});
