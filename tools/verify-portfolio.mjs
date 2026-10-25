import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
async function load(path) {
  const source = await readFile(resolve(root, path), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
}
const { works } = await load('src/data/works.ts');
const { workEnglish, localizeWork, categoryText } = await load('src/data/workContent.ts');
const { caseStudies, selectedCaseIds } = await load('src/data/caseStudies.ts');
assert.equal(new Set(works.map(work => work.id)).size, works.length, 'Duplicate project IDs');
for (const work of works) {
  assert.ok(workEnglish[work.id], `Missing English: ${work.id}`);
  const english = localizeWork(work, 'en');
  for (const text of [english.title, english.description, english.category, ...english.tags]) {
    assert.ok(!/[\u3400-\u9fff]/.test(text), `Untranslated text for ${work.id}: ${text}`);
  }
  assert.notEqual(categoryText(work.category, 'en'), '', 'Empty category');
  for (const source of [work.thumbnail, work.poster, work.videoUrl]) {
    if (source?.startsWith('/')) await access(resolve(root, 'public', source.slice(1)));
  }
}
for (const id of selectedCaseIds) {
  assert.ok(works.some(work => work.id === id), `Invalid selected case: ${id}`);
  const detail = caseStudies[id];
  assert.ok(detail?.goal[0] && detail.goal[1] && detail.scope[0] && detail.scope[1], `Incomplete case: ${id}`);
  for (const image of detail.gallery) if (image.src.startsWith('/')) await access(resolve(root, 'public', image.src.slice(1)));
}
console.log(`Verified ${works.length} bilingual projects, local assets and ${selectedCaseIds.length} selected cases.`);

const { integrateMomentum } = await load('src/data/motionMath.ts');
function simulate(hz, startVelocity) {
  let velocity = startVelocity, distance = 0;
  for (let i = 0; i < hz; i++) { const step = integrateMomentum(velocity, 1000 / hz); velocity = step.velocity; distance += step.distance; }
  return distance;
}
assert.ok(Math.abs(simulate(60, 1000) - simulate(120, 1000)) < 1e-8, 'Inertia varies with refresh rate');
assert.ok(simulate(60, 1000) > 0 && simulate(60, -1000) < 0, 'Release momentum reverses drag direction');
console.log('Verified inertia direction and 60/120 Hz equivalence.');
