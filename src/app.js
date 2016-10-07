;(function () {

    window.jT = {

        Utils: {},
        controller: {},
        Array: {},
        Object: {},
        String: {},

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
