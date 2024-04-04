import * as webpack from 'webpack';
import { UserConfig, UserConfigDefaults } from '@unocss/core';

interface WebpackPluginOptions<Theme extends object = object> extends UserConfig<Theme> {
    /**
     * Manually enable watch mode
     *
     * @default false
     */
    watch?: boolean;
}
declare function defineConfig<Theme extends object>(config: WebpackPluginOptions<Theme>): WebpackPluginOptions<Theme>;
declare function WebpackPlugin<Theme extends object>(configOrPath?: WebpackPluginOptions<Theme> | string, defaults?: UserConfigDefaults): webpack.WebpackPluginInstance;

export { type WebpackPluginOptions, WebpackPlugin as default, defineConfig };
