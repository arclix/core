import path from 'node:path';
import { describe, expect, it } from 'vitest';
import getRootDirectory from '../generate/helpers/getRootDirectory';

describe('Get Root Directory', () => {
  it("should return null if the package.json file doesn't exist", () => {
    expect(getRootDirectory(path.sep)).toBeNull();
  });

  it('should return root path', () => {
    expect(getRootDirectory(process.cwd())).not.toBeNull();
  });
});
