/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";
    //brackets Modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager  = brackets.getModule("editor/EditorManager"),        
        Dialogs         = brackets.getModule("widgets/Dialogs"),
        DefaultDialogs  = brackets.getModule("widgets/DefaultDialogs"),
        AppInit        = brackets.getModule("utils/AppInit"),       
        //localization
        locale         = brackets.getLocale(),
        myModal     = require("text!htmlModals/goToLineModal.html");


    // Function to run when the menu item is clicked
    function handleHelloWorld() {
        var editor  = EditorManager.getActiveEditor(),
            currentLine = editor.getCursorPos().line,            
            lineToGoTo = 0; 
        if(editor){

            var template = Mustache.render(myModal, {"currentLine" : (currentLine + 1)}),
                dialog = Dialogs.showModalDialogUsingTemplate(template),
                $dialog = dialog.getElement();                
            $dialog.on('click','#goToLine',function (){
                var totalLines = editor.lineCount();
                var lineToGoTo = parseInt($dialog.find('#inputLineNumber').val());
                
                if(lineToGoTo <= totalLines && currentLine != lineToGoTo){
                    console.log(lineToGoTo);
                    dialog.close();
                    editor.setCursorPos(lineToGoTo, 1, true);
                }
                
            });
        }         
    }

    AppInit.appReady(function () {
        
        //register a command
        var MY_COMMAND_ID = "mzografski.testExt.gotoline";   // package-style naming to avoid collisions
        CommandManager.register("Go to line...", MY_COMMAND_ID, handleHelloWorld);

        //create a menu item bound to the command        
        var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
        menu.addMenuItem(MY_COMMAND_ID);

        //key binding - if needed
        //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
        // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    });
});