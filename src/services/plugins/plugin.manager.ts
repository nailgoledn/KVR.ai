import { TiresPlugin } from './tires.plugin';

export class PluginManager {
  private plugins = [new TiresPlugin()];

  resolve(input: string) {
    const plugin = this.plugins.find((p) => p.match(input));

    if (plugin) {
      return plugin.generate();
    }

    return null;
  }
}