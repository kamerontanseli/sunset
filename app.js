(function () {
  var config = { DOCUMENT_KEY: "__WRITING__", TOGGLE_KEY: "__THEME__" },
    editor = document.querySelector(".editor"),
    toggle = document.querySelector(".switch"),
    checkbox = toggle.querySelector("input"),
    indicator = document.querySelector(".indicator"),
    execKeys = {
      j: ["hiliteColor", "#d4d4d4"],
      m: ["formatBlock", "h1"],
      k: ["formatBlock", "h2"],
      g: ["formatBlock", "p"]
    };
  function saveToLocalStorage() {
    indicator.classList.remove("hide");
    localStorage.setItem(config.DOCUMENT_KEY, editor.innerHTML);
    setTimeout(function () {
      indicator.classList.add("hide");
    }, 600);
  }
  function setTheme() {
    var theme = checkbox.checked ? "dark" : "light";
    localStorage.setItem(config.TOGGLE_KEY, theme);
    document.body.classList[checkbox.checked ? "add" : "remove"]("is-dark");
  }
  function listen(el, evt, fn) {
    return el.addEventListener(evt, fn);
  }
  listen(editor, "keydown", function (event) {
    if (event.ctrlKey || event.metaKey) {
      var args = execKeys[event.key];
      if (args) {
        event.preventDefault();
        document.execCommand(args[0], false, args[1]);
      } else if (event.key === "s") {
        event.preventDefault();
        saveToLocalStorage();
      }
    }
  });
  listen(editor, "input", saveToLocalStorage);
  listen(toggle, "click", setTheme);
  editor.focus();
  editor.innerHTML = localStorage.getItem(config.DOCUMENT_KEY) || "";
  checkbox.checked = localStorage.getItem(config.TOGGLE_KEY) === "dark";
  setTheme();
})();
