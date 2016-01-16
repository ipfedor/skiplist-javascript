export default class SkipListNode {
    constructor(key, value, level) {
        this.key = key;
        this.value = value;
        this.next = new Array(level);
    }
}
