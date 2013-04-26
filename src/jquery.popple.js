
(function ($, window, document) {

    "use strict";

    var $win = $(window),
        $doc = $(document);
        
        
    /* INITIALIZATION 
     * ============== */

    var $bg = null;
    
    //initialize once the page loads
    $(function popple_init() {
        
        //get the body
        var $body = $('body');
        if($body.length === 0){
            $.error('Do not use popple until the DOM has loaded.');
        }
        
        //add the bg to the body
        $bg = $("<div></div>")
                .hide()
                .appendTo($body)
                .click(function(e){
                    e.preventDefault();

                    for(var i=$.popple.modals.length-1; i>=0; i--){
                        var $el = $.popple.modals[i];
                        var options = $el.popple('options');
                        if(options.bgClose)
                            $el.popple('hide');
                    }
                });
        
        //add our styles to the head
        var styles = '';
        $('head').append(['<style type="text/css">',styles,'</style>'].join(''));
    });
    
    
    /* STATIC METHODS
     * ============== */
     
    $.popple = {
        defaults: {
            bg:        'popple-bg popple-bg-diagonal',
            push:      true,
            duration:  400,
            animation: 'popple-bounce',
            closer:    true,
            bgClose:   true,
            escClose:  true
        },
        modals: [],
        active: function(){
            return $.popple.modals.length ? $.popple.modals[$.popple.modals.length-1] : null;
        },
        push: function ($els, options) {
            var returnVal = null;
            $els.each(function(){
                var $el = $(this),
                    modal = $el.data('modal');
            
                if (!modal){
                    $el.data('modal', modal = new Popple($el, options));
                }
                
                if (options === 'push'){
                     modal.push();
                }else if (options === 'pop'){
                     modal.pop();
                }else if (options === 'options'){
                    returnVal = modal.options;
                    return;
                }else if (modal.options.push){
                    modal.push();
                }
            });
            return returnVal || $els;
        },
        pop: function () {
            if ($.popple.modals.length === 0){
                return;
            }

            $.popple.modals[$.popple.modals.length - 1].data('modal').pop();
        },
        popAll: function () {
            for(var i=$.popple.modals.length-1; i>=0; i--){
                $.popple.modals[i].data('modal').pop();
            }
        }
    };
    

    /* THROTTLE WINDOW RESIZING
     * ======================== */

    var winWidth = $win.width();
    (function(){
        var isWaiting = null;
        
        $win.on('resize', function(){
            if (isWaiting){ return; }
            
            isWaiting = setTimeout(function(){
                isWaiting = false;
                
                winWidth = $win.width();
                
                for(var i=0; i<$.popple.modals.length; i++){
                    var $el = $.popple.modals[i];
                    $el.data('modal').center();
                }
            }, 50);
        });
    })();
    
    
    /* MAIN IMPLEMENTATION
     * =================== */
    
    var Popple = function(el, _options){

        var $el = $(el),
            me = this;
        
        //expose options
        me.options = $.extend({}, $.popple.defaults, typeof _options === 'object' && _options);

        $el.addClass('popple-modal')
            .on('click', '.popple-close', function(){ me.pop(); })
            .on('click', '.popple-close-all', $.popple.popAll);
        
        if (me.options.closer){
            $el.append("<div class='popple-close popple-close-x'>x</div>");
        }
          
        me.center = function () {
            $el.css('left', Math.floor((winWidth - $el.width()) / 2) + 'px');
        };
        
        me.push = function () {
            
            //send 'push' notification
            $el.trigger('push');
            
            //push it to our stack
            $.popple.modals.push($el);
            
            //center horizontally
            me.center();
            
            //update bg classes
            $bg.removeClass().addClass(me.options.bg);

            //set durations
            var dur = me.options.animation ? me.options.duration : 0;
            $el.add($bg).css({
                'animation-duration': dur+'ms',
                '-webkit-animation-duration': dur+'ms',
                '-moz-animation-duration': dur+'ms',
                '-o-animation-duration': dur+'ms',
                '-MS-animation-duration': dur+'ms'
            });
            
            //update the animation
            if(typeof me.lastAnimation === 'string' && me.lastAnimation.length > 0){
                $el.removeClass(me.lastAnimation);
                delete me.lastAnimation;
            }
            if(typeof me.options.animation === 'string' && me.options.animation.length > 0){
                $el.addClass(me.options.animation);
            }

            //animate in bg
            $bg.show().removeClass('out').addClass('in');
            
            //animate modal in
            $el.removeClass('push pop wake sleep').show().addClass('push');
            
            //send 'pushed' notification when done
            if(dur){
                setTimeout(function(){ $el.trigger('pushed'); }, dur);
            }else{
                $el.trigger('pushed');
            }

            //hide previous modal
            if($.popple.modals.length > 1){
                var $lastEl = $.popple.modals[$.popple.modals.length-2];
                $lastEl.removeClass('push pop wake sleep').addClass('sleep');
            }
        };
        
        me.pop = function () {
            //check if we're in the stack
            var index = $.inArray($el, $.popple.modals);
            if (index === -1){ return; }
            
            //send 'hide' notification
            $el.trigger('pop');

            //remove from stack
            $.popple.modals.splice(index, 1);
            
            //animate it out
            $el.removeClass('push pop wake sleep').addClass('pop');

            //send 'hidden' notification when done
            var dur = me.options.animation ? me.options.duration : 0;
            
            //show next or hide bg
            if ($.popple.modals.length > 0) {
                //show the next modal
                var $prev = $.popple.modals[$.popple.modals.length-1];
                $prev.removeClass('push pop wake sleep').addClass('wake');
            } else {
                //hide the bg if no more modals showing
                $bg.removeClass('in out').addClass('out');
                
                setTimeout(function(){ $bg.hide(); }, dur);
            }
            
            //send 'hidden' notification            
            setTimeout(function(){ 
                $el.hide().trigger('popped');
            }, dur);   
        };
    };


    /* JQUERY PLUGIN
     * ============= */

    var old = $.fn.popple;
    $.fn.popple = function (options) {
        return $.popple.push(this, options);
    };
    
    
    /* NO CONFLICT MODE
     * ================ */

    $.fn.popple.noConflict = function () {
        $.fn.popple = old;
        return $.fn.popple;
    };


    /* [ESC] KEY
     * ========= */
     
    $doc.keyup(function (e) {
        if (e.keyCode === 27){ //esc
            var $el = $.popple.active();
            if ($el && $el.popple('options').escClose){
                $el.popple('pop');
            }
        }
    });


    /* ATTRIBUTE BASED LAUNCH
     * ====================== */
     
    $doc.on('click', '[popple]', function(e){
        e.preventDefault();
        
        var $this = $(this),
            selector = $.trim($this.attr('popple')),
            $el = $(selector);
          
        $el.popple();
        
        //good idea bootstrap
        $el.one('pop', function(){
            $this.focus();
        });
    });
    

})(jQuery, window, document);
