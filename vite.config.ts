import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";


// https://vitejs.dev/config/
// export default defineConfig(
  
//   {
  
//   define: {
//     global: {},
//   },
 
// });


export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), '')
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return {
    // vite config
    define: {
      global: {},
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        stream: "stream-browserify",
        os: "os-browserify/browser",
        util: "util",
        process: "process/browser",
        buffer: "buffer",
        url: 'rollup-plugin-node-polyfills/polyfills/url',
      },
    },
  }
})