import test from './thai-chape';
import { SkipList } from '../';

test('.set() & .unset()', expect => {
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

test('.has()', expect => {
    const skippy = new SkipList();
    skippy.set(5, 'boo');
    expect(skippy.has(5)).to.equal(true);
});

test('unset()', expect => {
    const skippy = new SkipList();
    skippy.set(5, 'boo');
    skippy.unset(5);
    expect(skippy.has(5)).to.equal(false);
});

test('calling unset() on empty skiplist should not throw', expect => {
    const skippy = new SkipList();
    skippy.unset(30);
    expect(true).to.equal(true);
});

test('.get()', expect => {
    const skippy = new SkipList();
    skippy.set(0, 'bar');
    expect(skippy.get(0).value).to.equal('bar');
    skippy.unset(0);
    expect(skippy.get(0)).to.equal(void 0);
});

test('.before()', expect => {
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
