import SkipListNode from './SkipListNode';

const Nil = new SkipListNode(Infinity, null, 0);

Object.defineProperty(Nil, 'next', {
    configurable: false,
    enumerable: false,
    get: () => { throw new RangeError('Exceeded maximum range of skip list'); }
});

export default class SkipList {
    p = 0.5;
    maxLevel = 16;
    levels = 1;
    head = new SkipListNode(0, null, this.maxLevel);
    tail = Nil;

    constructor() {
        for (let level = 0; level < this.levels; level++) {
            this.head.next[level] = this.tail;
        }
    }

    get(key) {
        let node = this.head;
        for (let level = this.levels - 1; level > -1; level--) {
            while (node.next[level].key < key) {
                node = node.next[level];
            }
            if (node.next[level].key === key) {
                return { key: key, value: node.next[level].value };
            }
        }
    }

    has(key) {
        return this.get(key) !== void 0;
    }

    set(key, value) {
        let node = this.head;
        let update = new Array(this.levels);
        for (let level = this.levels - 1; level > -1; level--) {
            while (node.next[level].key < key) {
                node = node.next[level];
            }
            update[level] = node;
        }
        node = node.next[0];
        if (node.key === key) {
            node.value = value;
        } else {
            let level = randomLevel(this.p, this.levels);
            if (level === this.levels) {
                if (this.levels < this.maxLevel) {
                    this.levels++;
                    this.head.next[level] = this.tail;
                }
                update.push(this.head);
            }
            const entry = new SkipListNode(key, value, level);
            for (let i = 0; i <= level; i++) {
                entry.next[i] = update[i].next[i];
                update[i].next[i] = entry;
            }
        }
    }

    unset(key) {
        let node = this.head;
        let update = new Array(this.levels);
        for (let level = this.levels - 1; level > -1; level--) {
            while (node.next[level].key < key) {
                node = node.next[level];
            }
            update[level] = node;
        }
        node = node.next[0];
        for (let level = 0; level < this.levels; level++) {
            if (update[level].next[level] !== node) {
                break;
            } else {
                update[level].next[level] = node.next[level];
            }
        }
        while (this.levels > 1 && this.head.next[this.levels - 1] === this.tail) {
            this.levels--;
        }
    }

    forEach(fn) {
        let node = this.head.next[0];
        while (node != Nil) {
            fn(node.value, node.key);
            node = node.next[0];
        }
    }

    map(fn) {
        let res = [];
        this.forEach((value, key) => {
            res.push(fn(value, key));
        });
        return res;
    }

    reduce(memo, fn) {
        this.forEach((value, key) => {
            memo = fn(memo, value, key);
        });
        return memo;
    }
}

function randomLevel(p, maxLevel) {
    let level = 0;
    while (Math.random() < p && level < maxLevel) {
        level++;
    }
    return level;
}
