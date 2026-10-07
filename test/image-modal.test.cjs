'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { isImageUrl } = require('../assets/js/image-modal.js');

test('isImageUrl detects image file links', () => {
  assert.equal(isImageUrl('/assets/images/posts/2025/certified-meshery-contributor/meshery-certification-program.png'), true);
  assert.equal(isImageUrl('/images/MeshmapDesigner.webp'), true);
  assert.equal(isImageUrl('https://example.com/photo.JPG'), true);
  assert.equal(isImageUrl('assets/images/screens/service mesh performance example.gif'), true);
  assert.equal(isImageUrl('/assets/images/logos/meshery-logo.svg'), true);
});

test('isImageUrl rejects non-image destinations', () => {
  assert.equal(isImageUrl('https://cloud.meshery.io/academy/certificates/9c6c8d01-28ee-449e-a73c-09003ae984ac'), false);
  assert.equal(isImageUrl('https://artifacthub.io'), false);
  assert.equal(isImageUrl('https://smp-spec.io'), false);
  assert.equal(isImageUrl('/catalog/designs'), false);
  assert.equal(isImageUrl(''), false);
  assert.equal(isImageUrl(null), false);
  assert.equal(isImageUrl(undefined), false);
});

test('isImageUrl handles query strings and fragments', () => {
  assert.equal(isImageUrl('/assets/a.png?v=1'), true);
  assert.equal(isImageUrl('/assets/a.jpeg#frag'), true);
});
