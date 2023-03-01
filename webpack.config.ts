import path from "path";
import webpack from "webpack";
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {ModeType} from "./config/build/types/build.types";


interface EnvVariables {
    mode: ModeType,
    port?: number;
}

export default (env: EnvVariables): webpack.Configuration => {
    const MODE = env.mode || "production";
    const IS_DEV = MODE === "development";
    const PORT = env.port || 8080;

    return buildWebpackConfig({
        mode: MODE,
        isDev: IS_DEV,
        port: PORT,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            output: path.resolve(__dirname, 'dist'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            src: path.resolve(__dirname, 'src'),
            alias: {
                i18n: ''
            }
        },
    })
}