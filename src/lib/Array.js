;$.extend(jT.Array, {

    /**
     * Iterates an array or an iterable value and invoke the given callback function for each item.
     *
     * @param array
     * @param fn
     * @param scope
     * @returns {*|void}
     */
    forEach: function (array, fn, scope) {

        return array.forEach(fn, scope);
    },

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     *
     * @param array
     * @param fn
     * @param scope
     * @returns {*|Array}
     */
    map: function (array, fn, scope) {

        return array.map(fn, scope);
    },

    /**
     * Filter through an array and remove empty items
     *
     * @param array
     * @returns {Array}
     */
    clean: function (array) {

        var results = [],
            i = 0,
            ln = array.length,
            item;

        for ( ; i < ln; i++ ) {
            item = array[i];

            if ( !jT.Utils.isEmpty(item, false) ) {
                results.push(item);
            }
        }

        return results;
    }
});