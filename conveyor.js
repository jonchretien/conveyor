/**
 * Conveyor v1.1.0
 * Conveyor animates HTML anchor navigation without any library dependencies.
 *
 * @license Released under the MIT license.
 * @copyright 2013 Jon Chretien
 */

(function() {

  'use strict';

  /**
   * Creates constructor function.
   *
   * @param {Object} [options] - Optional options object passed in by constructor.
   * @constructor
   */
  function Conveyor(options) {
    // stop if browser doesn't meet necessary requirements
    if ( !document.querySelectorAll && !document.documentElement.classList ) {
      return;
    }

    this.mergeConfigOptions(options);
    this.init();
  }


  /**
   * Default configuration (can be overwritten by optional options object)
   */
  Conveyor.defaults = {
    animationEasing: 'easeInOutCubic',
    duration: 1000,
    highlightNav: false,
    links: '[data-fx="conveyor"]',
    milliseconds: 10,
    offset: 0
  };


  /**
   * Easing functions adapted from Robert Penner's easing equations
   * http://www.robertpenner.com/easing/
   */
  Conveyor.animationOptions = {
    linear: function (t) {
      return t;
    },
    easeInQuad: function (t) {
      return t*t;
    },
    easeOutQuad: function (t) {
      return -1 *t*(t-2);
    },
    easeInOutQuad: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t;
      return -1/2 * ((--t)*(t-2) - 1);
    },
    easeInCubic: function (t) {
      return t*t*t;
    },
    easeOutCubic: function (t) {
      return 1*((t=t/1-1)*t*t + 1);
    },
    easeInOutCubic: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t*t;
      return 1/2*((t-=2)*t*t + 2);
    },
    easeInQuart: function (t) {
      return t*t*t*t;
    },
    easeOutQuart: function (t) {
      return -1 * ((t=t/1-1)*t*t*t - 1);
    },
    easeInOutQuart: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t*t*t;
      return -1/2 * ((t-=2)*t*t*t - 2);
    },
    easeInQuint: function (t) {
      return 1*(t/=1)*t*t*t*t;
    },
    easeOutQuint: function (t) {
      return 1*((t=t/1-1)*t*t*t*t + 1);
    },
    easeInOutQuint: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
      return 1/2*((t-=2)*t*t*t*t + 2);
    },
    easeInSine: function (t) {
      return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
    },
    easeOutSine: function (t) {
      return 1 * Math.sin(t/1 * (Math.PI/2));
    },
    easeInOutSine: function (t) {
      return -1/2 * (Math.cos(Math.PI*t/1) - 1);
    },
    easeInExpo: function (t) {
      return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
    },
    easeOutExpo: function (t) {
      return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
    },
    easeInOutExpo: function (t) {
      if (t==0) return 0;
      if (t==1) return 1;
      if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
      return 1/2 * (-Math.pow(2, -10 * --t) + 2);
    },
    easeInCirc: function (t) {
      if (t>=1) return t;
      return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
    },
    easeOutCirc: function (t) {
      return 1 * Math.sqrt(1 - (t=t/1-1)*t);
    },
    easeInOutCirc: function (t) {
      if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
      return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
    },
    easeInElastic: function (t) {
      var s=1.70158;var p=0;var a=1;
      if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
      if (a < Math.abs(1)) { a=1; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (1/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
    },
    easeOutElastic: function (t) {
      var s=1.70158;var p=0;var a=1;
      if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
      if (a < Math.abs(1)) { a=1; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (1/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
    },
    easeInOutElastic: function (t) {
      var s=1.70158;var p=0;var a=1;
      if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
      if (a < Math.abs(1)) { a=1; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (1/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
    },
    easeInBack: function (t) {
      var s = 1.70158;
      return 1*(t/=1)*t*((s+1)*t - s);
    },
    easeOutBack: function (t) {
      var s = 1.70158;
      return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
    },
    easeInOutBack: function (t) {
      var s = 1.70158;
      if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
      return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
    },
    easeInBounce: function (t) {
      return 1 - Conveyor.animationOptions.easeOutBounce (1-t);
    },
    easeOutBounce: function (t) {
      if ((t/=1) < (1/2.75)) {
        return 1*(7.5625*t*t);
      } else if (t < (2/2.75)) {
        return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
      } else if (t < (2.5/2.75)) {
        return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
      } else {
        return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
      }
    },
    easeInOutBounce: function (t) {
      if (t < 1/2) return Conveyor.animationOptions.easeInBounce (t*2) * .5;
      return Conveyor.animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
    }
  };


  /**
   * Merges optional config options with defaults.
   *
   * @param {Object} [options] - Optional options object passed in by constructor.
   */
  Conveyor.prototype.mergeConfigOptions = function(options) {
    this.options = {};

    for ( var prop in Conveyor.defaults ) {
      if ( Conveyor.defaults.hasOwnProperty(prop) ) {
        this.options[ prop ] = Conveyor.defaults[ prop ];
      }
    }

    for ( prop in options ) {
      if ( options.hasOwnProperty(prop) ) {
        this.options[ prop ] = options[ prop ];
      }
    }

    return this.options;
  };


  /**
   * Sets up variables.
   */
  Conveyor.prototype.init = function() {
    this.delta = null;
    this.pgYOffset = null;
    this.startTime = null;
    this.timer = null;
    this.factor = 0;

    // set options
    this.duration = this.options.duration;
    this.easing = Conveyor.animationOptions[this.options.animationEasing];
    this.highlightNav = this.options.highlightNav;
    this.milliseconds = this.options.milliseconds;
    this.navigationLinks = document.querySelectorAll(this.options.links);
    this.offset = this.options.offset;

    this.bindEventHandlers();
  };


  /**
   * Binds event handlers.
   */
  Conveyor.prototype.bindEventHandlers = function() {
    var self = this;
    [].forEach.call( this.navigationLinks, function(el) {
      el.addEventListener('click', self.setUpAnimationValues.bind(self), false);
    });
  };


  /**
   * Sets up offsets and startTime for animation.
   *
   * @param {Object} event - The event triggered.
   */
  Conveyor.prototype.setUpAnimationValues = function(event) {
    event.preventDefault();

    // Use hash from link to find DOM id.
    var hash = event.currentTarget.hash.substring(1),
        elOffsetTop = document.getElementById(hash).offsetTop;

    // the number of pixels that the document has already been scrolled vertically
    this.pgYOffset = window.pageYOffset;

    // Y-offset difference
    this.delta = elOffsetTop - ( window.pageYOffset + this.offset );

    // capture current time (in milliseconds)
    this.startTime = Date.now();

    // stop any running animations
    if ( this.timer ) {
      clearTimeout(this.timer);
    }

    if ( this.highlightNav ) {
      this.removeActiveClass();
      this.addActiveClass(event.currentTarget);
    }
    this.moveConveyor();
  };


  /**
   * Adds 'active' class.
   *
   * @param {Object} el - event.currentTarget.
   */
  Conveyor.prototype.addActiveClass = function(el) {
    el.classList.add('active');
  };


  /**
   * Removes 'active' class.
   */
  Conveyor.prototype.removeActiveClass = function() {
    [].forEach.call( this.navigationLinks, function(el) {
      el.classList.remove('active');
    });
  };


  /**
   * Calculates interpolation factor and triggers easing animation.
   * The factor should always be a number between 0 and 1.
   */
  Conveyor.prototype.moveConveyor = function() {
    var yPos;

    // calculate interpolation factor by comparing the start time
    // to the current time to see how far along the animation should be
    this.factor = ( Date.now() - this.startTime ) / this.duration;

    // stop animation & set factor to 1.0 if >= 1
    if ( this.factor >= 1 ) {
      clearTimeout(this.timer);
      this.factor = 1;
    } else {
      this.setTimer();
    }

    // run factor through easing equation before calculating yPos
    yPos = this.easing(this.factor) * this.delta + this.pgYOffset;
    window.scrollBy(0, yPos - window.pageYOffset);
  };


  /**
   * Sets up animation timer.
   */
  Conveyor.prototype.setTimer = function() {
    var self = this;
    this.timer = setTimeout(function() { self.moveConveyor(); }, this.milliseconds);
  };

  // add Conveyor to global namespace
  window.Conveyor = Conveyor;

})();
