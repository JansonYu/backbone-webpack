# 介绍

jquery backbone hogan生成器

自动生成项目静态目录，package.json，webpack配置等

从commit [d0476bf412169e5a8ec6ccc55389c36c56a2026e](http://172.16.117.224/fe/jquery-backbone-hogan-generator/commit/d0476bf412169e5a8ec6ccc55389c36c56a2026e) 起支持IE8
从commit [97a4687d455e828712d1c5ef331a699f73ac9f78](http://172.16.117.224/fe/jquery-backbone-hogan-generator/commit/97a4687d455e828712d1c5ef331a699f73ac9f78) 起支持flow
# 安装

```
npm install
```

# 运行

```
npm start
```

# 编译

```
npm run dist
```

# 老版本兼容IE8

由老版本的generator生成的系统，如果需要兼容IE8，请按照以下步骤执行（所有步骤都可以参考[jquery-backbone-hogan-generator](http://172.16.117.224/fe/jquery-backbone-hogan-generator/tree/master)中的代码）：

1、修改复制.babelrc，增加`transform-object-rest-spread`、`transform-es2015-modules-commonjs`、`transform-es3-property-literals`、`transform-es3-member-expression-literals`，并去掉`transform-runtime`

2、建议cfg目录完全覆盖。因为本次commit对cfg目录做了重构，增加了对ie8的兼容性支持，并且把`cfg/dist.js`和`cfg/dev.js`中公用的一些webpack配置，如`plugins`、`loaders`、`entry`都抽取到了`cfg/base.js`和`cfg/defaults.js`

3、修改package.json:

在`devDependencies`增加下面的依赖

```
"babel-plugin-transform-es2015-modules-commonjs": "^6.23.0",
 	32
"babel-plugin-transform-es3-member-expression-literals": "^6.22.0",
 	33
"babel-plugin-transform-es3-property-literals": "^6.22.0",
```

在`dependencies`中增加下面的依赖

```
es3ify-webpack-plugin
```

在`scripts`中，修改`start`命令，改为

```
"start": "webpack-dev-server --host 0.0.0.0 --env=dev --config webpack.config.js"
```

增加`prestart`命令

```
"prestart": "node open.js"
```

修改`copy`命令，改为

```
"copy": "copyup -u 2 ./src/lib/**/* ./dist/lib && copyup -u 2 ./src/lib/* ./dist/lib && copyup -u 2 ./src/images/**/* ./dist/images",
```

4、在根目录下新增[open.js](http://172.16.117.224/fe/jquery-backbone-hogan-generator/blob/master/open.js)脚本

5、修改`src/index.html`:

在script引用的最前面增加`<script src="./lib/babelpolyfill.js"></script>`，删除<!--[if lt IE 9]>对babelpolyfill.js的引用

删除`<script type="text/javascript" src="./lib/jquery/jquery.min.js"></script>`的引用，增加`<script type="text/javascript" src="./assets/vendor.js"></script>`的引用

6、修改`src/index_dist。htm`:

在script引用的最前面增加`<script src="./lib/babelpolyfill.js"></script>`，删除<!--[if lt IE 9]>对babelpolyfill.js的引用

删除`<script type="text/javascript" src="./lib/jquery/jquery.min.js"></script>`的引用


最后的话，因为IE8对ES6的支持极差，所以如果做了上述的工作，有可能系统仍然无法再IE8下运行

请不要烦躁，因为generator只处理了部分IE8兼容性问题，并不是全部，有可能你正好用到了ES6的一些新特性。

幸好IE8提供了控制台，查看控制台的报错，google吧，通常情况都是增加babel的plugin能够解决问题

# flow

1、安装flow libdef

```
npm install -g flow-typed
flow-typed install
```

2、flow代码检查

```
npm run flowStatus
```