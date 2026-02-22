import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf-8');

export default typeDefs;
