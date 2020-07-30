#! /usr/bin/env node
const { program } = require('commander')
const { version, description } = require('./package.json')
const fs = require('fs')
const { dir } = require('console')
const fsp = fs.promises

const l = console.log
const splitSign = '/'

const createProject = (path) => {
    l('\n🏁: Start!\n')

    const tarPath = process.cwd() + splitSign + path
    const srcPath = __dirname + splitSign + 'source'

    const version = Number(process.version.substr(1).split('.')[0])
    if (version < 12) {
        l(
            '😔: Sorry, but your node verison is less than 12, please update node.\n'
        )
        return
    }

    fsp.mkdir(tarPath)
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

                subs.forEach((file) =>
                    all.push(
                        fsp.copyFile(
                            src + splitSign + file.name,
                            tar + splitSign + file.name
                        )
                    )
                )
            })

            return Promise.all(all)
        })
        .catch((err) => {
            l(`😔: ${err.message}.\n`) ///g
        })
}

program
    .version(version, '-v, --version', 'output the current version')
    .description(description)

program.arguments('<project-directory>').action(createProject)

program.parse(process.argv)
