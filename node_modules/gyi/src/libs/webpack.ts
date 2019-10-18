import { LibsBase } from "./libsbase";
import webpack from 'webpack';
import { isString } from 'lodash';
import { join } from "path";

export class Webpack extends LibsBase {
    /**
     * build config import
     * @param config configpath or webpack.Configuration
     */
    async runtime(
        config?: string | webpack.Configuration
    ): Promise<NodeJS.ReadWriteStream> {
        let configuration: webpack.Configuration = {};
        if (config) {
            if (isString(config)) {
                configuration = Object.create(require(config));
            } else {
                configuration = config;
            }
        }
        try {
            if (!configuration) {
                configuration = Object.create(require(join(__dirname, 'webpack.config')));
            }
            return await new Promise(r => webpack(configuration, async (err, stats) => {
                if (err) return await Promise.reject(err);
                return await stats;
            }));
        } catch (err) {
            return await Promise.reject(err);
        }
    }
}