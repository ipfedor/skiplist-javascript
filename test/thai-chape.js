import test from 'tape-catch';
import { expect } from 'chai';

export default function testWrapper(str, fn) {
    const DONE = {};
    const _fn = t => {
        let gen;
        let first = true;
        function fakeExpect(value) {
            if (gen === void 0) {
                gen = expectWrapper(t, DONE, value);
            }
            return gen.next(value).value;
        }
        fn(fakeExpect);
        gen.next(DONE);
        t.end();
    };
    Object.defineProperty(_fn, 'name', { value: str });
    test(str, _fn);
};

function *expectWrapper(assert, sentinel, firstValue) {
    let value = firstValue;
    while (value !== sentinel) {
        let exp = expect(value);
        value = yield exp;
    }
    assert.pass('success');
}
