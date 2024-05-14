import { type AstroIntegration } from 'astro'
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from "node:path";

// TODO: what's the best way to handle this?
const cwd = dirname(fileURLToPath(import.meta.url))
const PATH_TO_DATA_JSON = join(cwd, './src/data.json')

const createPlugin = (): AstroIntegration => {
  return {
    name: 'integration',
    hooks: {
      'astro:config:setup': async ({ }) => {
        // I need to get the path to the destination file, and then somehow join it with the path to the script
        const pathToScript = relative('./src/page/dynamic', './scripts/test-file.js');

        const data = [{
          params: {
            'route': '1'
          },
          props: {
            pathToScript
          }
        },
        {
          params: {
            'route': '2'
          },
          props: {
            pathToScript
          }
        }]

        fs.writeFileSync(PATH_TO_DATA_JSON, JSON.stringify(data, null, 2));

      }
    }
  }
}



export default createPlugin
