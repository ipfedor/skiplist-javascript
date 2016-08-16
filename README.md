### Skip lists for JavaScript

Skip lists are a balanced, ordered data structure that provide O(log(n)) for
`set`, `unset`, `has`, `get`, and `before`.  Every node in a skip list
has a numeric key as well as an associated value.  A typical usage scenario
for a skip list is building an ordered map or set.  This implementation was
originally written to support an Attributed String type.

This implementation also provides convenience iterators such as `forEach`,
`map`, and `reduce` that all allow for O(n) traversal of the entire set of
values.

`set(key, value)` - Store a value in the list.  Key must be numeric.

`unset(key)` - Remove a value from the list.

`has(key)` - Return true if the list contains a value for the provided numeric key.

`get(key)` - Return the node associated with the provided key or undefined.

`before(key)` - Return the node directly before the one with the provided key.

`forEach(fn)` - Iterate the list.  `fn` is passed each node in sequence.

`map(fn)` - Construct an array of results from each element in the list.

`reduce(fn, memo)` - Build up the starting `memo` arg from each element.
