This is a tiny library that depends on jQuery (for the moment) that allows you to create controllers in an ExtJS like syntax


#Installation 

include this before `</body>`
```html
<script type="text/javascript" src="/public/js/jT.min.js"></script>

```

and after it include your stuff

```html
<script type="text/javascript" src="/public/js/app/Modules/Controller1.js"></script>
<script type="text/javascript" src="/public/js/app/Modules/Controller2.js"></script>

//etc
```

##Examples

```js

jT.define("app.Controllers.Users", {

    extend : "jT.controller",

    _some_private_property: true,

    init: function(){

        this.listen({
            components: {
                "#koko" : { //or any jQuery selector
                    click: 'onKokoClick',
                    //submit: 'onKokoSubmit'
                }
            },
            events: {
                "initUserValidators" : 'initUserValidators'
            }
        });
    },

    initUserValidators: function(data, e){
        console.log("i would but someone has to define them first");
    },

    onKokoClick: function($el){ //first param will always be the element itself
        console.log(this); //is the controller
    }
});

```

To fire event from one controller to another

```js

jT.define("app.Controllers.FiringEvents", {

    extend : "jT.controller",


    init: function(){

        this.fireEvent("initUserValidators", {
            'user_id' : 1
        });
    }
});

```

Singeltons

```js


jT.define("app.Utils", {

    singleton: true,

    isKoko: function(){
        return true;
    }
});



```

if you define it like this you can call it from anywhere like this 

```js

console.log(app.Utils.isKoko());

```


Because of the events between controllers browser support is IE 11+

[can i use link](http://caniuse.com/#search=CustomEvent)


### Notes

In ext you set your controllers and include them automatically. I can make it happen but i find it poinless because it will add a lot of code when it takes just few secs to add `<script src="..">`


There are some helpers for strings,arrays,objects you can check them in src/lib/ folder.

I coded this for myself, but if anyone else needs something do let me know.

