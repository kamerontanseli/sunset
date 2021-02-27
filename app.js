(function () {
  var storage = window.localStorage;

  var Editor = function (onSave) {
    var element = document.querySelector(".editor");

    function exec(cmd, arg) {
      return document.execCommand(cmd, false, arg);
    }

    element.addEventListener("keydown", function (event) {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "h": {
            event.preventDefault();
            return exec("hiliteColor", "#d4d4d4");
          }
          case "m": {
            event.preventDefault();
            return exec("formatBlock", "h1");
          }
          case "k": {
            event.preventDefault();
            return exec("formatBlock", "h2");
          }
          case "s": {
            event.preventDefault();
            return onSave();
          }
          default:
            return;
        }
      }
    });

    element.focus();

    return {
      getHTML: function () {
        return element.innerHTML;
      },
      setHTML: function (html) {
        element.innerHTML = html;
      },
      onInput: function (cb) {
        element.addEventListener("input", cb);
      },
    };
  };

  var Toggle = function () {
    var TOGGLE_STORAGE_KEY = "__THEME__";
    var initialTheme = storage.getItem(TOGGLE_STORAGE_KEY) || "light";
    var element = document.querySelector(".switch");
    var checkbox = element.querySelector("input");

    element.addEventListener("click", function () {
      var isDark = checkbox.checked;
      if (isDark) {
        document.body.classList.add("is-dark");
        storage.setItem(TOGGLE_STORAGE_KEY, "dark");
      } else {
        document.body.classList.remove("is-dark");
        storage.setItem(TOGGLE_STORAGE_KEY, "light");
      }
    });

    if (initialTheme === "dark") {
      checkbox.checked = true;
      document.body.classList.add("is-dark");
    }
  };

  var Indicator = function () {
    var element = document.querySelector(".indicator");

    return {
      show: function () {
        element.classList.remove("hide");
      },
      hide: function () {
        element.classList.add("hide");
      },
    };
  };

  document.addEventListener("DOMContentLoaded", function () {
    var DOCUMENT_STORAGE_KEY = "__WRITING__";
    var editor = Editor(save);
    var toggle = Toggle();
    var indicator = Indicator();

    function save() {
      indicator.show();
      storage.setItem(DOCUMENT_STORAGE_KEY, editor.getHTML());
      setTimeout(indicator.hide, 600);
    }

    editor.setHTML(storage.getItem(DOCUMENT_STORAGE_KEY) || "");
    editor.onInput(save);
  });
})();
