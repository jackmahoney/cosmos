(function($){

    $(document).ready(load);

    function load(){
        var Egg = {
                currentMode: 0,
                isLocked: false,
                css: 'body{cursor:none;}'
            },
            $window = $(window),
            $body = $('body');

        var Mode = function(name, voltages){
            this.name = name;
            this.voltages = voltages || [0];
        };
        Mode.prototype.setActive = function(){
            Egg.subject.attr('class','');
            Egg.subject.addClass(this.name);
            setVoltages(this.voltages);
        };

        function createModes(){
            Egg.modes = [
                new Mode('normal',[0,20,13,57]),
                new Mode('shift-red',[57,29,54,17]),
                new Mode('invert',[23,2,34,71]),
                new Mode('grey',[30,47,89,24]),
                new Mode('predator',[85,37,19,38])
            ];
        }

        //init
        (function(){
            wrapContent();
            insertHTML();
            injectStyles();
            createModes();
            attachMouse();
            attachKeys();
        })();

        function attachKeys(){
            $window.bind('keydown keypress',function(e){
                if(e.which == 40 || e.which == 38){
                    setMode(e.which == 38 ? -1 : 1);
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }

        function wrapContent(){
            $body.html('<div id="magnifier-subject">'+$body.html()+'</div>');
            Egg.subject = $('#magnifier-subject');
        }

        function resize(){
            var css = {
                width:$window.width(),
                height:$window.height()
            };
            Egg.eggWrapper.css(css);
            Egg.subject.css(css);

        }

        function insertHTML(){
            Egg.eggWrapper = $($('#magnifier-template').html()).appendTo($body);
            Egg.magnifier = $("#magnifier",Egg.eggWrapper);
            Egg.slides = $('.slides',Egg.magnifier);
            Egg.dimens = {w:Egg.magnifier.width(),h:Egg.magnifier.height()};
            Egg.voltmeters = $('.needle-house',Egg.eggWrapper);

            $window.resize(resize);
            resize();
        }

        function setVoltages(volts){
            Egg.voltmeters.each(function(i,v){
                var setting = -45 + volts[i] / 100 * 90;
                $(v).css('-webkit-transform','rotateZ('+setting+'deg)');
            });
        }

        function injectStyles(){
            Egg.styleElement = $('<style type="text/css">'+Egg.css+'</style>').appendTo($body);
        }

        function attachMouse(){
            $window.mousemove(function(e){
                Egg.magnifier.css({
                    top: e.pageY - Egg.dimens.h / 2,
                    left: e.pageX - Egg.dimens.w / 2
                });
            });
        }

        function setMode(d){

            if(Egg.isLocked) return;

            Egg.isLocked = true;

            var i;
            if(arguments.length == 0 || d > 0){
                i = Egg.currentMode + 1 < Egg.modes.length ? Egg.currentMode + 1 : 0;
            }
            else{
                i = Egg.currentMode > 0 ? Egg.currentMode - 1 : Egg.modes.length -1;
            }
            Egg.slides.addClass('rotate');
            Egg.slides.one('webkitAnimationEnd',function(){
                Egg.modes[i].setActive();
                Egg.slides.removeClass('rotate');
                Egg.isLocked = false;
            })
            Egg.currentMode = i;
        }

    }

})(jQuery);