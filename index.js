#! /usr/bin/env node
const { program } = require('commander')
const { version, description } = require('./package.json')
const fs = require('fs')
const fsp = fs.promises

const l = console.log

const createProject = (path) => {
    l('\n🏁: Start!\n')

    const version = Number(process.version.substr(1).split('.')[0])
    if (version < 12) {
        l(
            '😔: Sorry, but your node verison is less than 12, please update node.\n'
        )
        return
    }

    fsp.mkdir(path)
        .then(() => fsp.readdir('source'))
        .then((dirs) => {
            dirs.forEach((dir) => {
                console.log(dir, typeof dir)
            })
        })
        .catch((err) => {
            l(`😔: ${err.message}.\n`)///g
        })
}

program
    .version(version, '-v, --version', 'output the current version')
    .description(description)

program.arguments('<project-directory>').action(createProject)

program.parse(process.argv)
