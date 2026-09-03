// Where the runtime store lives.
//
// Every path here defaults to exactly where it has always been, so nothing changes without
// APOLLO_DATA_DIR set. It exists so the behaviour harness can boot the server against a
// throwaway directory: that sweep clicks real controls, Delete and "Clear local" among them,
// and it must never do that to the committed store. CLAUDE.md protects apollo-studio/data/;
// this is the mechanism that keeps the promise while still exercising the destructive paths,
// which are the ones most worth testing.
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const override = process.env.APOLLO_DATA_DIR || '';
const defaultDir = fileURLToPath(new URL('./data/', import.meta.url));

export const dataDir = override || defaultDir;
export const isScratchData = Boolean(override);

export const dataFile = name => join(dataDir, name);
