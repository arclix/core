import fs from 'node:fs';
import path from 'node:path';
import type { ArclixConfig } from '../../types/type.js';
import getRootDirectory from './getRootDirectory.js';

/**
 * Get's the properties of config file.
 *
 * @param defaultPath path to the config file.
 * @returns config `properties` if the file exists otherwise `null`.
 */
const getConfig = (defaultPath: string): ArclixConfig | null => {
  const configPath = path.resolve(
    getRootDirectory() ?? process.cwd(),
    defaultPath,
  );
  if (!fs.existsSync(configPath)) {
    return null;
  }

  const data = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(data) as ArclixConfig;
};

export default getConfig;
