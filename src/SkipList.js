import SkipListNode from './SkipListNode';

export default class SkipList {
    p = 0.5;
    maxLevel = 16;
    levels = 1;
    head = new SkipListNode(null, this.levels);
    tail = new SkipListNode(Infinity, this.levels);

    constructor() {
        for (let level = 0; level < this.levels; level++) {
            this.head[level] = this.tail;
        }
    }

    insert(val) {
        let node = this.head;
        let update = new Array(this.levels);
        for (let level = 0; level < this.levels; level++) {
            while (val < node.next[level].value) {
                node = node.next[level];
            }
        }
    }
}
