(function($){
    //DEFINIMOS LA ENTRADA DEL CODIGO EN JQUERY
    $.fn.autocomplete = function(PARAMS){
        //ACCIONES DEFAULT
        var _DEFAULTS =  {
            onChange: function(e){},
            onKeyup: function(e){},
            onFocus: function(e){},
            onBlur: function(e){},
            dataAction: function(e,handler){},
            handler: function(data){},
            maxVisible: 5,
            css: {},
            content: null,
            cache: {},
            minLength: 1
        };
        return this.each(function() {
            //ESTRTCTURA DE SINCRONIZACION
            var SYNC_STRUCT = {
                _BUSY: false,
                _ALLOCATE: 1,
                _QUEUED: [],
                _DO: function(action){
                    var args = [];
                    for(i=1;i<arguments.length;i++){
                        args.push(arguments[i]);
                    }
                    SYNC_STRUCT._QUEUED.push({
                        handler: action,
                        arg: args
                    });
                    SYNC_STRUCT._UNQUEUED();
                },
                _UNQUEUED: function(){
                    if(SYNC_STRUCT._QUEUED.length > 0){
                        var action = SYNC_STRUCT._QUEUED[0];
                        SYNC_STRUCT._QUEUED.splice(0,1);
                        action.handler.apply(this,action.arg);
                    }
                    return;
                },
                _FREE: function(){
                    if(SYNC_STRUCT._BUSY) return;
                    SYNC_STRUCT._BUSY = !SYNC_STRUCT._BUSY;
                    if(SYNC_STRUCT._ALLOCATE > 0){
                        SYNC_STRUCT._ALLOCATE--;    
                        var action = SYNC_STRUCT._QUEUED.splice(0,1);
                    }
                    else{
                        return;
                    }
                    if(SYNC_STRUCT._QUEUED > 0){
                        SYNC_STRUCT._UNQUEUED();
                    }
                },
                _FFUNC: function(func){
                    var func_txt = func.toString();
                    var patt = new RegExp(/(\(.*\))/);
                    var args = patt.exec(func_txt)[0].replace(/(\(|\))/gi,"");
                    var args = (args !== "")? args+", SYNC":"SYNC";
                    func_txt = func_txt.replace(/function(.*){/gi, '');
                    func_txt = func_txt.replace(/}$/gi,'\nSYNC._FREE();');
                    return new Function(args,func_txt);
                }
            }
            //DEFINIMOS LAS VARIABLES LOCALES
            var _SELF = this;
            //SETTINGS
            var _SETTINGS = {};
            //DEFINIMOS EL CONSTRUCTOR
            var _CONSTRUCT = function(PARAMS){
                //REEMPLAZAMOS LOS DEFAULTS CON LOS SETTINGS
                _SETTINGS = $.extend({},_DEFAULTS,PARAMS);
                // TRANSFORMAMOS LAS FUNCIONES
                    _SETTINGS.onKeyup = SYNC_STRUCT._FFUNC(_SETTINGS.onKeyup);
                    _SETTINGS.onChange = SYNC_STRUCT._FFUNC(_SETTINGS.onChange);
                    _SETTINGS.onFocus = SYNC_STRUCT._FFUNC(_SETTINGS.onFocus);
                    _SETTINGS.onBlur = SYNC_STRUCT._FFUNC(_SETTINGS.onBlur);
                    _SETTINGS.dataAction = SYNC_STRUCT._FFUNC(_SETTINGS.dataAction);
                //ASIGNAMOS LOS HANDLER DE EVENTOS
                $(_SELF).on('change',function(e,free){
                    // _SETTINGS.onChange(e,free);
                });
                $(_SELF).on('keyup',function(e){
                    SYNC_STRUCT._DO(_SETTINGS.onKeyup,e,SYNC_STRUCT);
                    SYNC_STRUCT._DO(_SETTINGS.dataAction,e,PRIV.handler);
                });
                $(_SELF).on('focus',function(e,free){
                    // _SETTINGS.onFocus(e,free);
                });
                $(_SELF).on('blur',function(e,free){
                    // _SETTINGS.onBlur(e,free);
                });
            };
            //DEFINIMOS LOS METODOS PRIVADOS
            var PRIV = {
                handler: function(data,response){
                    PRIV.display(data,response,SYNC_STRUCT);
                },
                display: function(data,response,SYNC_STRUCT){
                    //CARGAMOS POSICICONES RELATIVAS AL ELEMENTO
                    var offset = $(_SELF).offset();
                    var width = $(_SELF).css('width').replace("px","");
                    var height = $(_SELF).css('height').replace("px","");
                    //CCREAMOS EL BOJETO CON LAS VARIABLES CSS
                    var auto_css = {
                        position: "absolute",
                        top: (offset.top + parseInt(height)),
                        left: (offset.left - 1),
                        background: "#FFF",
                        border: "1px solid #CCC",
                        width: parseInt(width),
                        height: "auto",
                        "z-index":9999
                    };
                    //CREAMOS EL ELEMENTO
                    var container = $("<div></div>",{
                        class: "autocomplete-handler" 
                    }).appendTo($('body')).css(auto_css);
                    // CREAMOS NUEVAS EXPRESIONES
                    $("<div>dede</div>").appendTo(container).css({
                        height: "20px",
                        padding: "5px 15px",
                        "white-space": "nowrap"
                    }).on('mouseenter',function(){
                        $(this).css({
                            background: "#EEE"
                        })
                    }).on('mouseleave',function(){
                        $(this).css({
                            background: "#FFF"
                        })
                    }).on('click',function(){

                    });
                    //LIBERAMOS EL SEGURO
                    SYNC_STRUCT._FREE();
                }
            }
            //DEFINIMOS METODOS PUBLICOS
            this.PUB = {

            }
            _CONSTRUCT(PARAMS);
        });
    }
}(jQuery));