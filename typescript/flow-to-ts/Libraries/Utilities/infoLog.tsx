'use strict';











/**
 * Intentional info-level logging for clear separation from ad-hoc console debug logging.
 */
function infoLog(...args) {
  return console.log(...args);
}

module.exports = infoLog;
