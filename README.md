#  Conveyor

Conveyor animates HTML anchor navigation. It uses vanilla JavaScript and has no library dependencies.

## Getting started

Conveyor looks for links with a data attribute of _data-fx_ and a value of _conveyor_. Example:

``` html
<a href="#home" data-fx="conveyor" class="nav-home">Home</a>
```

Each link must have a matching id target. For example, the above link must correspond to something in the dom like:
``` html
<div id="home"></div>
```

Once the links have the proper data attribute create a new instance of Conveyor and add custom options (see below):

``` js
document.addEventListener('DOMContentLoaded', function() {
    var conveyor = new Conveyor({
        // options
    });
}, false);
```

## Options

All options are optional and do not need to be set.

### animationEasing

**Type:** String

``` js
animationEasing: 'easeInOutCubic'
```

Sets the easing of the scroll animation. Values are from Robert Penner's [easing equations](http://www.robertpenner.com/easing/).

### duration

**Type:** Number

``` js
duration: 1000
```

The duration of the animation.

### highlightNav

**Type:** Boolean

``` js
highlightNav: false
```

When set to true the active link will be assigned an 'active' class and this class will be removed on all other links that are set in the _links_ option below.

### links

**Type:** String

``` js
links: '[data-fx="conveyor"]'
```

The selector for the links which trigger the scrolling animation.

### milliseconds

**Type:** Number

``` js
milliseconds: 10
```

The number of milliseconds before the timer is repeated.



### offset

**Type:** Number

``` js
offset: 0
```

Usually the height of a fixed navigation element. You can pass in the offsetHeight of a DOM element like so:

``` js
var conveyor = new Conveyor({
    offset: document.getElementById('fixedNav').offsetHeight
});
```

## Demo
[http://jonchretien.github.com/conveyor/](http://jonchretien.github.com/conveyor/)


## Browser Support

At the time of this writing Conveyor has been tested in the following browsers:

- Apple Safari 6.0.3
- Google Chome 25.0.1364.172
- Mozilla Firefox 19.0.2

## Resources &amp; Thank You's

- Robert Penner's [easing equations](http://www.robertpenner.com/easing/)
- Daniel Høier Øhrgaard's [animation advice](https://github.com/Flambino)

## License

Conveyor is released under the [MIT License](http://mit-license.org).