#!/usr/bin/env node
const program = require("commander");
program.version(require("../package.json").version)
program
    .command('init <name>') // 命令语法
    .description('init project  ') // 命令的描述
    .action(
        require('../lib/init.js')
    )
program
    .command('refresh') // 命令语法
    .description('refresh routers an menu project  ') // 命令的描述
    .action(
        require('../lib/refresh.js')
    )
program.parse(process.argv) // 解析主进程的参数 （整个命令行解析和定制的过程 传入的就是主进程的参数）
