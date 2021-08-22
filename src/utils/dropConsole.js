/**
 * This file is to handle unwanted console logs.
 * It is important to call this file at the beginning of the app.
 */
var console = (function (oldCons) {
  // eslint-disable-next-line no-undef
  // let drop = "true" === process.env.REACT_APP_DROP_CONSOLE ? true : false;
  let drop = false
  let newCons = { ...oldCons }
  window.console = oldCons // A quick handle to enable all console logs again. In browser > developer tools > console tab: {window.console = window.consol}
  if (drop) {
    oldCons.log(
      '%c%s',
      'color: red; font-size: 12px;',
      'CAUTION: This space is only for developers. Please do not copy-paste any scripts here. It can be harmful!',
    )
    newCons.log = function () {}
    newCons.warn = function () {}
  }
  return newCons
})(window.console)
window.console = console
