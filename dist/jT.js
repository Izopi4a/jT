;(function () {

    window.jT = {

        Utils: {},
        controller: {},
        Array: {},
        Object: {},

        controllers: [],
        singletons: [],

        createSingleton: function (path, value) {

            var pList = path.split('.'),
                schemeName = pList[0];

            if ( false === jT.Utils.isDefined(window[schemeName]) ) {

                window[schemeName] = {};
            }

            pList.shift();

            var schema = window[schemeName],
                len = pList.length,
                i = 0;

            for ( ; i < len - 1; i++ ) {
                var elem = pList[i];
                if ( !schema[elem] ) {
                    schema[elem] = {}
                }
                schema = schema[elem];
            }

            schema[pList[len - 1]] = value;
            return value;
        },

        define: function (name, obj) {

            jT.beforeDefine(obj);

            obj._namespace = name;

            if ( true === jT.Utils.isDefined(obj.extend) ) {

                jT.Utils.extend(obj, eval(obj.extend));

                jT.controllers.push(obj);

            } else if ( true === jT.Utils.isDefined(obj.singleton) ) {

                jT.createSingleton(name, obj);

                jT.singletons.push(obj);
            }

            jT.onDefine(obj);
        },

        beforeDefine: function(obj){

            if (jT.Utils.isFunction(obj.beforeInit)){

                obj.beforeInit.call(obj);
            }
        },

        onDefine: function(obj){

            if (jT.Utils.isFunction(obj.init)){

                obj.init.call(obj)
            }
        }
    };
})();

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
;$.extend(jT.controller, {

    functionExists: function(name){

        if ( false === jT.Utils.isFunction(this[name]) ) {
            throw "function does not exist on runtime";
        }
    },

    bindComponentListeners: function (components) {

        var me = this;

        if ( 0 === jT.Object.getSize(components) ) {
            return;
        }

        $.each(components, function (selector, ev) {

            if ( 0 === jT.Object.getSize(ev) ) {
                return true;
            }

            var $el = $(selector);

            $.each(ev, function (name, funcName) {

                me.functionExists(funcName);

                var cb = function(){

                    var args = [$el];

                    $.each(arguments, function(idx, value){
                        args.push(value);
                    });

                    me[funcName].apply(me, $el, args)
                }

                if (name === "ready"){
                    
                    $el.ready(cb);
                } else {

                    $el.on(name, cb);
                }
            });
        });
    },

    fireEvent: function(evName, data){

        setTimeout(function(){

            var myEvent = new CustomEvent('_jtEv' + evName, {
                'detail' : data
            });

            document.body.dispatchEvent(myEvent);

        }, 50);
    },

    bindEvents: function(events){

        var me = this;

        jT.Object.each(events, function (evName, funcName) {

            this.functionExists(funcName);

            document.body.addEventListener('_jtEv' + evName, function(e){
                me[funcName].apply(me, [e.detail, e]);
            }, false);
            
        }, this);

    },

    listen: function (obj) {

        var me = this;

        document.addEventListener("DOMContentLoaded", function(event) {
            me.bindComponentListeners(obj.components);
            me.bindEvents(obj.events);
        });
    }
});
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