import Component from "utils/component";

export default function (component: Component) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = "";
    root.append(component.getContent());
  }
}
