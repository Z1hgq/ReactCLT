const fs = require('fs');
const path = require('path');
// const ora = require('ora');
const archiver = require('archiver');
const chalk = require('chalk');

const port = 3010;
const conf = JSON.parse(
  fs.readFileSync(__dirname + '/package.json').toString(),
);
const outputDir = path.join(__dirname, 'release');
const message = {
  error: msg => console.log(chalk.red(msg)),
  info: msg => console.log(chalk.cyan(msg)),
  success: msg => console.log(chalk.green(msg)),
  warning: msg => console.log(chalk.yellow(msg)),
};
// const spinner = ora({
//     spinner: 'line',
//     text: chalk.cyan(`building release...`)
// }).start();
function buildWeb() {
  // 生成服务文件
  const codePath = path.join(outputDir, conf.siteOutputName, 'main.js');
  const code = `const http = require('http');
    const fs = require('fs');
    const path = require('path');
    http.createServer(function(request, response) {
        let filePath = '.' + request.url;
        if (filePath == './') {
            filePath = './index.html';
        }
        let extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                } else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\\n');
                    response.end();
                }
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }).listen(${port});
    console.log('Server running at http://127.0.0.1:${port}/');
    `;
  fs.writeFileSync(codePath, code);

  // 生成pm2.json文件
  const pm2Path = path.join(outputDir, conf.siteOutputName, 'pm2.json');
  const pm2Json = `{
        "apps": [{
            "name": "${conf.name}",
            "script": "./main.js",
            "watch": false,
            "node_args": "--harmony",
            "merge_logs": false,
            "cwd": "./",
            "error_file": "/dev/null",
            "out_file": "/dev/null",
            "env": {
                "NODE_ENV": "production"
            }
        }]
    }
    `;
  fs.writeFileSync(pm2Path, pm2Json);
}

function buildShell() {
  // 生成start.sh脚本
  const startShPath = path.join(outputDir, conf.siteOutputName, 'start.sh');
  const startSh = `#!/bin/sh
    function info() {
        echo "============================================="
        echo "$1"
        echo "============================================="
    }
    # 启动服务
    pm2 stop './pm2.json'
    echo 'start process...'
    sleep 2
    pm2 start "./pm2.json"
    info '服务启动成功!'`;
  fs.writeFileSync(startShPath, startSh);

  // 生成stop.sh脚本
  const stopShPath = path.join(outputDir, conf.siteOutputName, 'stop.sh');
  const stopSh = `#!/bin/sh
    pm2 stop './pm2.json'`;
  fs.writeFileSync(stopShPath, stopSh);

  // 生成restart.sh脚本
  const restartShPath = path.join(outputDir, conf.siteOutputName, 'restart.sh');
  const restartSh = `#!/bin/sh
    pm2 stop './pm2.json'
    echo 'start process...'
    sleep 2
    pm2 start "./pm2.json"`;
  fs.writeFileSync(restartShPath, restartSh);
}
function pack() {
  const filePath = path.join(outputDir, `${conf.siteOutputName}.tar.gz`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  const arc = archiver('tar', {
    gzip: true,
    gzipOptions: {
      level: 9,
    },
  });
  const output = fs.createWriteStream(filePath);
  arc.on('error', function(err) {
    throw err;
  });
  arc.on('end', function(err) {
    // spinner.stop();
    removeDir(path.resolve(__dirname, `release/${conf.siteOutputName}`));
    message.success(`release/${conf.siteOutputName} is deleted`);
    message.success(
      `${conf.siteOutputName}.tar.gz build completd in ${outputDir}`,
    );
  });
  arc.pipe(output);
  arc.directory(`release/${conf.siteOutputName}/`, conf.siteOutputName);
  arc.finalize();
}
function removeDir(dir) {
  let files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}
try {
  buildWeb();
  buildShell();
  pack();
} catch (error) {
  console.error(error);
}
