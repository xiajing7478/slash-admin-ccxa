## 1. 配置项目的规范

你可以通过配置 ESLint 和 Prettier 实现 src 目录下所有文件统一不加分号结尾。推荐做法如下：

1. 安装 Prettier 及相关依赖（如果未安装）：

```
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

2. 在项目根目录新建或修改 `.prettierrc` 文件，添加如下内容：

```json
{
  "semi": false
}
```

3. 在项目根目录新建或修改 `.eslintrc.js` 文件，添加如下内容：

```js
module.exports = {
  extends: [
    // ... 其他配置
    "plugin:prettier/recommended",
  ],
  rules: {
    // ... 其他规则
    "prettier/prettier": ["error", { semi: false }],
  },
}
```

4. 在项目根目录新建或修改 `.prettierignore` 文件，添加如下内容：

```
node_modules
dist
```

5. 在项目根目录新建或修改 `.eslintignore` 文件，添加如下内容：

```
node_modules
dist

6. 修改 ESLint 配置，确保集成 Prettier 规则，避免冲突。

7. 执行格式化命令：
```

pnpm exec prettier --write src
