/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";
    //brackets Modules
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager  = brackets.getModule("editor/EditorManager"),        
        AppInit        = brackets.getModule("utils/AppInit"),        
        //localization
        locale         = brackets.getLocale(),
        Dialog;


    // Function to run when the menu item is clicked
    function handleHelloWorld() {
        var editor  = EditorManager.getActiveEditor(),
            lineToGoTo = 0; 
        if(editor){
            Dialog.showModalDialogUsingTemplate($("<h4>test</h4>"));
            lineToGoTo =  parseInt(prompt('Go To', lineToGoTo));
            if(editor.getCursorPos().line != lineToGoTo){
                console.log('Not on ' + lineToGoTo + ' line - taking it there!!!');
                editor.setCursorPos( (lineToGoTo - 1), 0, true, true);
            }
            console.log(editor.getCursorPos());
            return;            
        }
    }

    AppInit.appReady(function () {
        Dialog         = brackets.getModule("widgets/Dialog");
        // First, register a command - a UI-less object associating an id to a handler
        var MY_COMMAND_ID = "mzografski.testExt.gotoline";   // package-style naming to avoid collisions
        CommandManager.register("Go to line...", MY_COMMAND_ID, handleHelloWorld);

        // Then create a menu item bound to the command
        // The label of the menu item is the name we gave the command (see above)
        var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
        menu.addMenuItem(MY_COMMAND_ID);

        // We could also add a key binding at the same time:
        menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
        // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    });
});