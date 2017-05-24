/*!
 * https://github.com/leonardosnt/jct-dasm
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

function parseArgs(argv) {
  const options = {};
  const args = [];

  argv.forEach(arg => {
    if (arg.startsWith('--')) {
      options[arg.substring(2)] = true;
    } else {
      args.push(arg);
    }
  });

  return { args, options };
}

module.exports = parseArgs;