import SkipList from '../src/SkipList';
import { expect } from 'chai';

it('.set() & .unset()', () => {
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
});

it('.has()', () => {
    const skippy = new SkipList();
    skippy.set(5, 'boo');
    expect(skippy.has(5)).to.equal(true);
});

it('unset()', () => {
    const skippy = new SkipList();
    skippy.set(5, 'boo');
    skippy.unset(5);
    expect(skippy.has(5)).to.equal(false);
});

it('calling unset() on empty skiplist should not throw', () => {
    const skippy = new SkipList();
    skippy.unset(30);
    expect(true).to.equal(true);
});

it('.get()', () => {
    const skippy = new SkipList();
    skippy.set(0, 'bar');
    expect(skippy.get(0).value).to.equal('bar');
    skippy.unset(0);
    expect(skippy.get(0)).to.equal(void 0);
});

it('.before()', () => {
    const skippy = new SkipList();
    skippy.set(4, 'hello');
    skippy.set(1, 'oh');
    skippy.set(19, 'world');
    skippy.set(2, 'hi');
    expect(skippy.before(2).value).to.equal('oh');
    expect(skippy.before(19).value).to.equal('hello');
    expect(skippy.before(1).value).to.equal(null);
    expect(skippy.before(0).value).to.equal(null);
});
