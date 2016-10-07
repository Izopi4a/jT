;$.extend(jT.Object, {

    /**
     * Iterates through an object and invokes the given callback function for each iteration
     *
     * @param object
     * @param fn
     * @param scope
     */
    each: function(object, fn, scope) {

        var property;

        if (object) {
            scope = scope || object;

            for (property in object) {
                if (object.hasOwnProperty(property)) {
                    if (fn.call(scope, property, object[property], object) === false) {
                        return;
                    }
                }
            }
        }
    },

    eachValue: function(object, fn, scope) {

        var property;

        scope = scope || object;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                if (fn.call(scope, object[property]) === false) {
                    return;
                }
            }
        }
    },

    /**
     *  Gets the total number of this object's own properties
     *
     * @param object
     * @returns {number}
     */
    getSize: function(object) {
        var size = 0,
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                size++;
            }
        }

        return size;
    },
});