/**
 * 检测到预加载错误时，会自动刷新页面
 * 在开发过程中，当热更新（HMR）失败或资源预加载出错时，可能会导致页面显示异常,
 * 这种情况下，自动刷新可以快速恢复到正常状态,避免开发者手动刷新页面的麻烦
 *
 * 'vite:preloadError' 事件是 Vite 开发服务器特有的自定义事件, 生产环境使用的是构建后的静态文件，没有 Vite 开发服务器在运行
 * dev:  代码修改 → Vite 服务器检测 → 触发热更新 → 如果失败 → 触发 'vite:preloadError' → 执行刷新
 * prod: 用户访问 → 加载静态文件 → 如果资源加载失败 → 浏览器原生错误处理
 */
window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})
