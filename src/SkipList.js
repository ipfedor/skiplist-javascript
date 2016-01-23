import SkipListNode from './SkipListNode';

export default class SkipList {
    levels = 1;

    constructor(headKey=0, tailKey=Infinity, p=0.5, maxLevel=16) {
        this.p = p;
        this.maxLevel = maxLevel;
        this.head = new SkipListNode(headKey, null, this.maxLevel);
        this.tail = new SkipListNode(tailKey, null, 0);
        Object.defineProperty(this.tail, 'next', {
            configurable: false,
            enumerable: false,
            get: function get() {
                throw new RangeError('Exceeded maximum range of skip list');
            }
        });
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
                return node.next[level];
            }
        }
    }

    has(key) {
        return this.get(key) !== void 0;
    }

    set(key, value) {
        if (typeof key !== 'number') {
            throw new TypeError('Must provide numeric key for SkipListNode');
        }
        let node = this.head;
        let update = new Array(this.levels);
        for (let level = this.levels - 1; level > -1; level--) {
            while (node.next[level].key < key) {
                node = node.next[level];
            }
            update[level] = node;
        }
        node = node.next[0];
        let entry;
        if (node.key === key) {
            node.value = value;
            entry = node;
        } else {
            let level = randomLevel(this.p, this.levels);
            if (level === this.levels) {
                if (this.levels < this.maxLevel) {
                    this.levels++;
                    this.head.next[level] = this.tail;
                }
                update.push(this.head);
            }
            entry = new SkipListNode(key, value, level);
            for (let i = 0; i <= level; i++) {
                entry.next[i] = update[i].next[i];
                update[i].next[i] = entry;
            }
        }
        return entry;
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
        if (node === this.tail) {
            return;
        }
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

    before(key) {
        let node = this.head;
        for (let level = this.levels - 1; level > -1; level--) {
            while (node.next[level].key < key) {
                node = node.next[level];
            }
        }
        return node;
    }

    forEach(fn) {
        forEach(this, fn);
    }

    map(fn) {
        let res = [];
        forEach(this, node => res.push(fn(node)));
        return res;
    }

    reduce(fn, memo) {
        forEach(this, node => memo = fn(node));
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

function forEach(list, fn) {
    let node = list.head.next[0];
    while (node != list.tail) {
        fn(node);
        node = node.next[0];
    }
}
