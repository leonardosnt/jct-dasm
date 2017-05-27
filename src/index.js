#!/usr/bin/env node

/*!
 * https://github.com/leonardosnt/jct-dasm
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

const { JavaClassFileReader } = require('java-class-tools');
const { inspect } = require('util');
const fs = require('fs');
const parseArgs = require('./parseArgs');

const { args, options } = parseArgs(process.argv.slice(2));

if (args.length === 0) {
  console.log(`
Use "jct-dasm ClassFile.class [output file]"

Options:
  --json - Print class file as JSON
  --no-color - Don't use colors to print in console
  --elapsed - Show time took by JavaClassFileReader

Example:
  $ jct-dasm --json Foo.class Foo.json
`);
  process.exit(1);
}

const [ inputFile, outputFile ] = args;

if (!fs.existsSync(inputFile)) {
  console.log(`File not found: ${inputFile}`);
  process.exit(2);
}

const inputFileData = fs.readFileSync(inputFile);

// Check header (0xCAFEBABE)
if (inputFileData[0] !== 0xCA || inputFileData[1] !== 0xFE ||
    inputFileData[2] !== 0xBA || inputFileData[3] !== 0xBE) {
  console.log(`${inputFile} is not a valid class file.`);
  process.exit(3);
}

const classReader = new JavaClassFileReader();

const readStart = process.hrtime();
const classFile = classReader.read(inputFileData);
const readEnd = process.hrtime(readStart);

const classFileToString = options.json
  ? JSON.stringify(classFile, undefined, 2)
  : inspect(classFile, false, 100, !options['no-color']);

// No output file provided
if (outputFile === undefined) {
  console.log(classFileToString);
} else {
  fs.writeFileSync(outputFile, classFileToString);
}

if (options['elapsed']) {
  const elapsedMs = readEnd[0] * 1000.0 + readEnd[1] / 1e6;
  console.log(`\nTook ${elapsedMs}ms.`);
}