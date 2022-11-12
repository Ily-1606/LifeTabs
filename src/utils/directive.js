const toFloat = (el) => {
  el.innerText = parseFloat(el.innerText).toFixed(1);
};

const directives = [
  {
    name: "float",
    handler: toFloat,
  },
];
export { directives, toFloat };
