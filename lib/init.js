const {promisify} = require("util");
const figlet = promisify(require('figlet'));
const clear = require('clear')
const chalk = require('chalk')
const {clone} = require('./download');
const open  = require("open");

const spawn = async (...args) => {
    console.log(...args);
    const {spawn} = require('child_process'); // 我们也可以直接用，只是现在想要看日志
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout); // 管道 安装过程输出
        proc.stderr.pipe(process.stderr); // 管道 安装过程错误打印
        proc.on('close', ()=>{
            resolve(); // 结束
        })
    });
}

const log =  content =>{
    console.log(chalk.green(content));
}
module.exports = async name => {
    // 打印欢迎界面
    clear();
    const data = await figlet('KKB welcome');
    log(data);

    // clone
    // log(`🚀创建项目: ${name}`)
    // await clone('github:su37josephxia/vue-template', name);

    // 自动安装依赖
//     log(`🔨安装依赖: ${name}`)
//     await spawn('cnpm', ['install'], {'cwd': `./${name}`}) //命令：cnpm 参数['install','chalk']  cwd是在哪里运行
//     log(`
// 👌安装完成
//     To get Start
// =====================
//     cd ${name}
//     npm run serve
// =====================
//                     `);
    open(`http://localhost:8080/`); // 打开浏览器并且等加载完自动刷新
    // 自动启动
    log('🔚自动启动');
    await spawn('cnpm', ['run', 'serve'], {'cwd': `./${name}`})
}
