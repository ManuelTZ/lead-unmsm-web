import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('imagen social institucional', () => {
  it('existe como PNG horizontal y con resolucion suficiente', () => {
    const image = readFileSync(resolve(process.cwd(), 'public/brand/social-share.png'));

    expect(image.subarray(0, 8)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );

    const width = image.readUInt32BE(16);
    const height = image.readUInt32BE(20);
    expect(width).toBeGreaterThanOrEqual(1_000);
    expect(height).toBeGreaterThanOrEqual(500);
    expect(width).toBeGreaterThan(height);
    expect(image.byteLength).toBeLessThan(750 * 1024);
  });
});
