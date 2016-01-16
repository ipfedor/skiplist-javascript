import 'source-map-support/register';
import { expect } from 'chai';

import SkipList from '../src/SkipList';

const skippy = new SkipList();

skippy.set(4, 'hello');
skippy.set(1, 'oh');
skippy.set(19, 'world');
skippy.set(2, 'hi');
skippy.set(2, 'lala');
skippy.unset(2);
skippy.set(2, 'hi');

expect(skippy.get(4).value).to.equal('hello');
expect(skippy.has(19)).to.equal(true);
expect(skippy.has(5)).to.equal(false);

skippy.set(5, 'boo');
expect(skippy.has(5)).to.equal(true);

skippy.unset(5);
expect(skippy.has(5)).to.equal(false);

skippy.set(0, 'bar');
expect(skippy.get(0).value).to.equal('bar');

skippy.unset(0);
expect(skippy.get(0)).to.equal(void 0);

console.log(skippy.map((val, key) => val));
