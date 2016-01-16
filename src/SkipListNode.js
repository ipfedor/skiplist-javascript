export default class SkipListNode {
    constructor(value, level) {
        this.value = value;
        this.next = new Array(level);
    }
}
