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