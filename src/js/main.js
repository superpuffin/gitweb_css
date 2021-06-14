const attachFooter = () => {
  const footer = document.querySelector("div.footer");
  const bounds = footer.getBoundingClientRect();
  const cs = window.getComputedStyle(footer);
  const pc_to_int = (str) => Number(str.substring(0, str.length - 2));
  let padding = [cs.paddingLeft, cs.paddingRight];
  padding = padding.map(pc_to_int);
  padding = padding.reduce((a, b) => a + b);

  if (bounds.bottom < window.innerHeight) {
    footer.style.position = "absolute";
    footer.style.bottom = "0";
    footer.style.width = `calc(100% - ${padding}px)`;
  }
};

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "interactive") {
    attachFooter();
  }
});
