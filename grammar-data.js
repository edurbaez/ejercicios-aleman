// Loader shim: grammar-data.js used to hold all levels inline; now each level
// lives in its own grammar-data-{level}.js file (easier to grow independently).
// Resolve partial file URLs from this script's own location so callers can keep
// referencing grammar-data.js from any path (root, ../, /) without changes.
(function () {
  var base = document.currentScript.src.replace(/grammar-data\.js(\?.*)?$/, '');
  var levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  levels.forEach(function (lvl) {
    document.write('<script src="' + base + 'grammar-data-' + lvl + '.js"></' + 'script>');
  });
})();

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const GRAMMAR_DATA = window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
