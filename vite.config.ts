import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   /**
//    * 配置port为4000
//    * @see https://vitejs.dev/config/#server-port
//    */
//    server: {
//      port: 4000
//    }
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // console.log('env...', env)
  return {
    plugins: [react()],
    server: {
      port: 8082,
      proxy: {
        '/auth': {
          target: env.VITE_APP_BASEURLAPI,
          ws: true,
        },
        '/api': {
          target: env.VITE_APP_BASEURLAPI,
          changeOrigin: true,
          ws: true,
        },
      },
    },
    // define: {
    //   'process.env.NODE_ENV': JSON.stringify(mode),
    // },
    /**
     * 配置alias别名
     */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
