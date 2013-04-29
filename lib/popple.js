
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
                        var options = $el.modal('options');
                        if(options.bgClose)
                            $el.modal('hide');
                    }
                });
        
        //add styles to the head
        var styles = (function(){ var a='popple-bounce-push-animation',b='popple-bounce-pop-animation',c='popple-sleep-animation',d='-webkit-animation-name',e='popple-wake-animation',f='animation-fill-mode',g='-moz-animation-name',h='-webkit-transform',i='-webkit-keyframes',j='-o-animation-name',k='-moz-keyframes',l='-moz-transform',m='animation-name',n='popple-bounce',o='popple-bg-out',p='popple-bg-in',q='-o-keyframes',r='-o-transform',s='translateY',t='keyframes',u='transform',v='popple-bg',w='position',x='forwards',y='opacity',z='-300px'; return ['@',t,' ',a,'{0%{',u,':',s,'(',z,');',y,':0}60%{',u,':',s,'(20px)}100%{',u,':',s,'(0);',y,':1}}@',i,' ',a,'{0%{',h,':',s,'(',z,');',y,':0}60%{',h,':',s,'(20px)}100%{',h,':',s,'(0);',y,':1}}@',k,' ',a,'{0%{',l,':',s,'(',z,');',y,':0}60%{',l,':',s,'(20px)}100%{',l,':',s,'(0);',y,':1}}@',q,' ',a,'{0%{',r,':',s,'(',z,');',y,':0}60%{',r,':',s,'(20px)}100%{',r,':',s,'(0);',y,':1}}.',n,'.push{',m,':',a,';',d,':',a,';',g,':',a,';',j,':',a,'}@',t,' ',b,'{0%{',u,':',s,'(0);',y,':1}40%{',u,':',s,'(20px)}100%{',u,':',s,'(',z,');',y,':0}}@',i,' ',b,'{0%{',h,':',s,'(0);',y,':1}40%{',h,':',s,'(20px)}100%{',h,':',s,'(',z,');',y,':0}}@',k,' ',b,'{0%{',l,':',s,'(0);',y,':1}40%{',l,':',s,'(20px)}100%{',l,':',s,'(',z,');',y,':0}}@',q,' ',b,'{0%{',r,':',s,'(0);',y,':1}40%{',r,':',s,'(20px)}100%{',r,':',s,'(',z,');',y,':0}}.',n,'.pop{',m,':',b,';',d,':',b,';',g,':',b,';',j,':',b,'}@',t,' ',e,'{0%{',u,':',s,'(100px);',y,':0}100%{',u,':',s,'(0);',y,':1}}@',i,' ',e,'{0%{',h,':',s,'(100px);',y,':0}100%{',h,':',s,'(0);',y,':1}}@',k,' ',e,'{0%{',l,':',s,'(100px);',y,':0}100%{',l,':',s,'(0);',y,':1}}@',q,' ',e,'{0%{',r,':',s,'(100px);',y,':0}100%{',r,':',s,'(0);',y,':1}}.popple-modal.wake{',m,':',e,';',d,':',e,';',g,':',e,';',j,':',e,'}@',t,' ',c,'{0%{',u,':',s,'(0);',y,':1}100%{',u,':',s,'(100px);',y,':0}}@',i,' ',c,'{0%{',h,':',s,'(0);',y,':1}100%{',h,':',s,'(100px);',y,':0}}@',k,' ',c,'{0%{',l,':',s,'(0);',y,':1}100%{',l,':',s,'(100px);',y,':0}}@',q,' ',c,'{0%{',r,':',s,'(0);',y,':1}100%{',r,':',s,'(100px);',y,':0}}.popple-modal.sleep{',m,':',c,';',d,':',c,';',g,':',c,';',j,':',c,'}@',t,' ',p,'{0%{',y,':0}100%{',y,':1}}@',i,' ',p,'{0%{',y,':0}100%{',y,':1}}@',k,' ',p,'{0%{',y,':0}100%{',y,':1}}@',q,' ',p,'{0%{',y,':0}100%{',y,':1}}.',v,'.in{',m,':',p,';',d,':',p,';',g,':',p,';',j,':',p,'}@',t,' ',o,'{0%{',y,':1}100%{',y,':0}}@',i,' ',o,'{0%{',y,':1}100%{',y,':0}}@',k,' ',o,'{0%{',y,':1}100%{',y,':0}}@',q,' ',o,'{0%{',y,':1}100%{',y,':0}}.',v,'.out{',m,':',o,';',d,':',o,';',g,':',o,';',j,':',o,'}.',v,'-diagonal{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIUlEQVQIW2NkQAL///83ZoTxwRxGxrNgARgHxGZE5oAEAOz3DzVasxQ9AAAAAElFTkSuQmCC)}.',v,'{background-color:rgba(0,0,0,.92);width:100%;height:100%;',w,':fixed;top:0;left:0;z-index:1000;',f,':',x,';-webkit-',f,':',x,';-moz-',f,':',x,';-o-',f,':',x,'}.popple-modal{background-color:#fff;',w,':relative;top:100px;border-radius:3px;padding:20px;',w,':fixed;z-index:1001;display:none;box-shadow:0 0 15px rgba(0,0,0,.3);overflow:hidden;',f,':',x,';-webkit-',f,':',x,';-moz-',f,':',x,';-o-',f,':',x,'}.popple-closer-x{',w,':absolute;top:7px;right:14px;color:#000;font-size:19px;line-height:19px;cursor:pointer;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;',y,':.18;text-shadow:0 1px 0 #fff;font-weight:bold}.popple-closer-x:hover{',y,':.12}'].join(''); })();
        if (styles.length === 7){
            $('head').append('<link href="popple.css" rel="stylesheet" type="text/css" />');
        }else{
            $('head').append(['<style type="text/css">',styles,'</style>'].join(''));
        }
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
            .on('click', '.popple-pop', function(){ me.pop(); })
            .on('click', '.popple-pop-all', $.popple.popAll);
        
        if (me.options.closer){
            $el.append("<div class='popple-pop popple-closer-x'>x</div>");
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
            if (me.options.animation === true){
                $el.addClass($.popple.defaults.animation);
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

    var old = $.fn.modal;
    $.fn.modal = function (options) {
        return $.popple.push(this, options);
    };
    
    
    /* NO CONFLICT MODE
     * ================ */

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return $.fn.modal;
    };


    /* [ESC] KEY
     * ========= */
     
    $doc.keyup(function (e) {
        if (e.keyCode === 27){ //esc
            var $el = $.popple.active();
            if ($el && $el.modal('options').escClose){
                $el.modal('pop');
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
          
        $el.modal();
        
        //good idea bootstrap
        $el.one('pop', function(){
            $this.focus();
        });
    });
    

})(jQuery, window, document);
