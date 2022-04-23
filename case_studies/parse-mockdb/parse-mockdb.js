'use strict';

let hooks = {};

function registerHook(className, hookType, hookFn) {
  if (!hooks[className]) {
    hooks[className] = {};
  }

  hooks[className][hookType] = hookFn;
}

module.exports = {registerHook};
