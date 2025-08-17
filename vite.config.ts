import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'inject-scripts',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `    <script type="text/javascript">
      // Duration in milliseconds to wait while the Kameleoon application file is loaded
      var kameleoonLoadingTimeout = 1000;

      window.kameleoonQueue = window.kameleoonQueue || [];
      window.kameleoonStartLoadTime = new Date().getTime();
      if (! document.getElementById("kameleoonLoadingStyleSheet") && ! window.kameleoonDisplayPageTimeOut)
      {
        var kameleoonS = document.getElementsByTagName("script")[0];
        var kameleoonCc = "* { visibility: hidden !important; background-image: none !important; }";
        var kameleoonStn = document.createElement("style");
        kameleoonStn.type = "text/css";
        kameleoonStn.id = "kameleoonLoadingStyleSheet";
        if (kameleoonStn.styleSheet)
        {
          kameleoonStn.styleSheet.cssText = kameleoonCc;
        }
        else
        {
          kameleoonStn.appendChild(document.createTextNode(kameleoonCc));
        }
        kameleoonS.parentNode.insertBefore(kameleoonStn, kameleoonS);
        window.kameleoonDisplayPage = function(fromEngine)
        {
          if (!fromEngine)
          {
            window.kameleoonTimeout = true;
          }
          if (kameleoonStn.parentNode)
          {
            kameleoonStn.parentNode.removeChild(kameleoonStn);
          }
        };
        window.kameleoonDisplayPageTimeOut = window.setTimeout(window.kameleoonDisplayPage, kameleoonLoadingTimeout);
      }
    </script>
    <script type="text/javascript" src="//rl0huf0o8c.kameleoon.io/engine.js" async="true" fetchpriority="high"></script>`,
        );
      },
    },
  ],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      core: path.resolve(__dirname, 'src/core'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  base: '/new3-images/',
});
