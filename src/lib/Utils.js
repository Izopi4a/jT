;$.extend(jT.Utils, {

    /**
     * @property Function
     *
     * A reusable empty function.
     */
    emptyFn: function () {
    },

    /**
     * Returns true if the passed value is a string.
     *
     * @param value The value to test.
     * @return {boolean}
     */
    isString: function (value) {
        return typeof value === 'string';
    },

    /**
     * Returns true if the passed value is defined.
     *
     * @param value
     * @returns {boolean}
     */
    isDefined: function (value) {
        return typeof value !== 'undefined';
    },

    /**
     * Returns true if the passed value is a JavaScript Array, false otherwise.
     *
     * @param {Object} target The target to test.
     * @return {Boolean}
     * @method
     */
    isArray: ('isArray' in Array) ? Array.isArray : function(value) {
        return toString.call(value) === '[object Array]';
    },

    isEmpty: function (value, allowEmptyString) {
        return (value == null) || (!allowEmptyString ? value === '' : false) || (jT.isArray(value) && value.length === 0);
    },

    isFunction: function(value){
        return !!value && toString.call(value) === '[object Function]';
    },

    extend : function (target) {

        for(var i=1; i<arguments.length; ++i) {
            var from = arguments[i];
            if(typeof from !== 'object') continue;
            for(var j in from) {
                if(from.hasOwnProperty(j)) {
                    target[j] = typeof from[j]==='object'
                        ? jT.Utils.extend({}, target[j], from[j])
                        : from[j];
                }
            }
        }
        return target;
    }
});