import {test} from 'node:test';import assert from 'node:assert/strict';
import config from '../netlify/functions/config.mjs';import checkout from '../netlify/functions/checkout.mjs';import license from '../netlify/functions/license.mjs';import support from '../netlify/functions/support.mjs';
test('config exposes no secrets and remains unconfigured by default',async()=>{const r=await config();assert.equal(r.status,200);const b=await r.json();assert.equal(b.checkoutEnabled,false);assert.equal(b.configured,false);assert.equal(b.serviceRoleKey,undefined)});
test('checkout disabled before live services',async()=>{const r=await checkout(new Request('https://example.com/api/checkout',{method:'POST'}));assert.equal(r.status,503)});
test('license requires POST',async()=>{const r=await license(new Request('https://example.com/api/license'));assert.equal(r.status,405)});
test('support requires POST',async()=>{const r=await support(new Request('https://example.com/api/support'));assert.equal(r.status,405)});
