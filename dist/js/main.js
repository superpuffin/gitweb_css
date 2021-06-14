"use strict";

var attachFooter = function attachFooter() {
  var footer = document.querySelector("div.footer");
  var bounds = footer.getBoundingClientRect();
  var cs = window.getComputedStyle(f);

  var pc_to_int = function pc_to_int(str) {
    return Number(str.substring(0, str.length - 2));
  };

  var padding = [cs.paddingLeft, cs.paddingRight];
  padding = padding.map(pc_to_int);
  padding = padding.reduce(function (a, b) {
    return a + b;
  });

  if (bounds.bottom < window.innerHeight) {
    footer.style.position = 'absolute';
    footer.style.width = "calc(100% - ".concat(padding, "px)");
  }
};

document.addEventListener("readystatechange", function (e) {
  if (e.target.readyState === "interactive") {
    attachFooter();
  }
});