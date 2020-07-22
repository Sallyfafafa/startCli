const fs = require('fs');
const handlebars = require('handlebars');
const chalk = require('chalk');
module.exports = async ()=>{
    // 获取列表
    const list = fs.readdirSync('./src/views')
        .filter(v=>v!=='Home.vue')
        .map(v=>({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }))
    console.log('list', list)


    // 生成路由定义
    compile({list}, './src/router.js', './template/router.js.hbs')
    // 生成菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    /**
    *模板编译 meta 数据定义 filePath 目标文件 templatePath 模板文件
     */
    function compile(meta, filePath, templatePath) {
        if(fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString(); // 读取content，同步读取模板，读出的二进制转化一下
            const result = handlebars.compile(content)(meta); // 编译
            fs.writeFileSync(filePath, result);  // 写入到source文件
            console.log(`🚀 ${filePath} 创建成功`);
        }
    }

}