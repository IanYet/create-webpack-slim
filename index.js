#! /usr/bin/env node
const { program } = require('commander')
const { version, description } = require('./package.json')
const fs = require('fs')
const fsp = fs.promises

const l = console.log
const splitSign = '/'
const bs4 = '    '
const bs2 = '  '
const startEmoji = `${bs4}💫${bs2}`
const processEmoji = () =>
    [`${bs4}🌎${bs2}`, `${bs4}🌍${bs2}`, `${bs4}🌏${bs2}`][Date.now() % 3]
const doneEmoji = `${bs4}✨${bs2}`
const errorEmoji = `${bs4}🌀${bs2}`
const tipsEmoji = `${bs4}💡${bs2}`

const createProject = (path) => {
    l(`\n${startEmoji}Start\n`)

    const tarPath = process.cwd() + splitSign + path
    const srcPath = __dirname + splitSign + 'source'

    const version = Number(process.version.substr(1).split('.')[0])
    if (version < 12) {
        l(
            `${errorEmoji}Sorry, but your node verison is less than 12, please update node.\n`
        )
        return
    }

    return fsp
        .mkdir(tarPath)
        .then(() => fsp.readdir(srcPath, { withFileTypes: true }))
        .then((dirs) => {
            const all = []

            dirs.forEach((dir) => {
                if (dir.isFile()) {
                    all.push(
                        fsp.copyFile(
                            srcPath + splitSign + dir.name,
                            tarPath + splitSign + dir.name
                        )
                    )
                    l(`${processEmoji()}\x1B[2mmake file, ${dir.name}\x1B[0m`)
                } else {
                    all.unshift(dir)
                }
            })

            return Promise.all(all)
        })
        .then((dirs) =>
            Promise.all([
                ...dirs
                    .filter((dir) => dir && dir.isDirectory())
                    .map((dir) =>
                        fsp.readdir(srcPath + splitSign + dir.name, {
                            withFileTypes: true,
                        })
                    ),
                dirs,
            ])
        )
        .then((dirs) => {
            const ds = dirs[dirs.length - 1]

            ds.filter((d) => d).forEach((d) =>
                fsp.mkdir(tarPath + splitSign + d.name)
            )
            return dirs
        })
        .then((dirs) => {
            const all = []
            const pas = dirs.pop()

            pas.filter((pa) => pa).forEach((pa, idx) => {
                const tar = tarPath + splitSign + pa.name
                const src = srcPath + splitSign + pa.name
                const subs = dirs[idx]

                subs.forEach((file) => {
                    all.push(
                        fsp.copyFile(
                            src + splitSign + file.name,
                            tar + splitSign + file.name
                        )
                    )
                    l(
                        `${processEmoji()}\x1B[2mmake file, ${pa.name}${splitSign}${
                            file.name
                        }\x1B[0m`
                    )
                })
            })

            return Promise.all(all)
        })
        .then(() => {
            l(`\n${doneEmoji}Done!\n`)
            l(`${tipsEmoji}${bs2}\x1B[36myarn install\x1B[0m${bs4}to install dependencies.\n`)
            l(`${tipsEmoji}${bs2}\x1B[36myarn start  \x1B[0m${bs4}to start dev server.\n`)
            l(`${tipsEmoji}${bs2}\x1B[36myarn build  \x1B[0m${bs4}to build project.\n`)
        })
        .catch((err) => {
            l(`${errorEmoji}${err.message}.\n`) ///g
        })
}

program
    .version(version, '-v, --version', 'output the current version')
    .description(description)

program.arguments('<project-directory>').action(createProject)

program.parse(process.argv)
