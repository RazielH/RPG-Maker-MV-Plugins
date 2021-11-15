//=============================================================================
/*:
 * @plugindesc (v.1.01) This plugin adds some core functionality and utility
 * methods
 *
 * @author RazielH
 *
 * @help
 * ============================================================================
 *   INTRODUCTION
 * ============================================================================
 *
 * This plugin will add some core functionality and utility methods for ease of
 * use and less coding/scripting in the game engine.
 * Also this core plugin is used widely in almost all HD plugins, so ensure to
 * have this plugin added to your project if any other HD plugins are used for
 * full compatibility.
 *
 * ============================================================================
 *  PARAMETERS
 * ============================================================================
 *
 * N/A
 *
 * ============================================================================
 *  PLUGIN CALLS
 * ============================================================================
 *
 * N/A
 *
 * ============================================================================
 *  UTILITY METHODS
 * ============================================================================
 *
 * --------------------------
 * |         sleep          |
 * --------------------------
 * DESCRIPTION
 *    Method returns a promise that will be completed after the time provided
 *    in milliseconds.
 *    This can be particularly useful if you want to delay some actions or
 *    event calls for some set time.
 *
 * USAGE
 *    HD.Core.sleep(1000)
 *      .then(() => {
 *          // your code here to be executed after 1 second (1000 ms)
 *      });
 *
 * --------------------------
 * |     sleepSingleton     |
 * --------------------------
 * DESCRIPTION
 *    Method returns a promise that will be completed after the time provided
 *    in milliseconds.
 *
 *    This is the same as the sleep method except that it will take a key to
 *    only run one instance of the sleep timer at once for that key value.
 *
 *    If this method is invoked again with the same key while a previous sleep
 *    is in progress, that previous sleep will be cancelled and the new sleep
 *    timer will start.
 *
 * USAGE
 *    HD.Core.sleepSingleton("key_1", 10000)
 *      .then(() => {
 *          // your code here to be executed after 10 seconds (10000 ms)
 *          // however because another call is being made using the same
 *          // key ("key_1") this call here will be cancelled and will
 *          // never get executed.
 *      });
 *    // another call will cancel the previous one
 *    HD.Core.sleepSingleton("key_1", 5000)
 *      .then(() => {
 *          // your code here to be executed after 5 seconds (5000 ms)
 *      });
 *
 *    // a different key will not affect the others
 *    HD.Core.sleepSingleton("key_2", 1000)
 *      .then(() => {
 *          // your code here to be executed after 1 seconds (1000 ms)
 *      });
 *
 *  * --------------------------
 * |     sleepSingleton     |
 * --------------------------
 * DESCRIPTION
 *    Method recursively parses all plugin parameters into a json object.
 *
 * USAGE
 *    HD.Core.parameters =
 *          HD.Core.parseParameters(PluginManager.parameters('HD_Core')) || {};
 *
 * ============================================================================
 *  RPG CORE EXTENSIONS
 * ============================================================================
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++                     Game_Variables                     ++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * --------------------------
 * |      valueByName       |
 * --------------------------
 * DESCRIPTION
 *    This method will retrieve a variable value by it's name, instead of it's
 *    id (Which is normally accessible by $gameVariables.value(event_id))
 *
 * USAGE
 *    var valueByName = $gameVariables.valueByName('First Variable');
 *
 * --------------------------
 * |     setValueByName     |
 * --------------------------
 * DESCRIPTION
 *    This method will set the value of a variable by it's name instead of it's
 *    id (Which is normally set by $gameVariables.setValue(event_id))
 *
 * USAGE
 *    $gameVariables.setValueByName('First Variable', <ANY OBJECT>);
 *    $gameVariables.setValueByName('First Variable', "string");
 *    $gameVariables.setValueByName('First Variable', {"array": [1, 2, 20]});
 *
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++                     Game_Switches                      ++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * --------------------------
 * |      valueByName       |
 * --------------------------
 * DESCRIPTION
 *    This method will retrieve a switch value by it's name, instead of it's
 *    id (Which is normally accessible by $gameSwitches.value(event_id))
 *
 * USAGE
 *    var valueByName = $gameSwitches.valueByName('First Variable');
 *
 * --------------------------
 * |     setValueByName     |
 * --------------------------
 * DESCRIPTION
 *    This method will set the value of a switch by it's name instead of it's
 *    id (Which is normally set by $gameSwitches.setValue(event_id))
 *
 * USAGE
 *    $gameSwitches.setValueByName('First Variable', <ANY OBJECT>);
 *    $gameSwitches.setValueByName('First Variable', "string");
 *    $gameSwitches.setValueByName('First Variable', {"array": [1, 2, 20]});
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++                       Game_Event                       ++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * --------------------------
 * |     isInsideScreen     |
 * --------------------------
 * DESCRIPTION
 *    This method checks whether the event is located inside of the game screen
 *
 * USAGE
 *    var isEventInsideScreen = $gameMap.event(10).isInsideScreen();
 *
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Method to parse plugin parameters
 * - Added documentation
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * MIT License and Terms of Use
 * ============================================================================
 *
 * MIT License for the remaining code of the Plugin
 *
 * Copyright 2021 RazielH
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

var HD = HD || {};
HD.Core = HD.Core || {
    name: "HD_Core"
};

var Imported = Imported || {};
Imported.HD_Utils = true;

(function ($) {

    /**
     * Method returns a promise that will be completed after the time provided in milliseconds
     *
     * @param ms time in millis to wait
     * @returns {Promise<unknown>} promise
     */
    $.sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sleepSingletonTimeouts = {};
    /**
     * Method returns a promise that will be completed after the time provided in milliseconds.
     *
     * This is the same as the sleep method except that it will take a key to only run one
     * instance of the sleep timer at once for that key value.
     *
     * If this method is invoked again with the same key while a previous sleep is in progress,
     * that previous sleep will be cancelled and the new sleep timer will start.
     *
     * @param key (string) a unique key to be used for tracing the timeout id
     * @param ms  (number) time in millis to wait
     * @returns {Promise<unknown>} promise
     */
    $.sleepSingleton = function (key, ms) {
        if (sleepSingletonTimeouts[key]) {
            clearTimeout(sleepSingletonTimeouts[key]);
            sleepSingletonTimeouts[key] = undefined;
        }
        return new Promise(resolve => sleepSingletonTimeouts[key] = setTimeout(resolve, ms));
    }

    /**
     * Recursively parses all parameters into a json object.
     *
     * Usage:
     * <pre>
     *   var parameters = HD.Core.parseParameters(PluginManager.parameters('HD_Core')) || {};
     * </pre>
     *
     * @param parameters the input parameters of a plugin
     * @returns {*}
     */
    $.parseParameters = function (parameters) {
        function parse(string) {
            try {
                return JSON.parse(string, (key, value) => {
                    try {
                        return parse(value);
                    } catch (e) {
                        return value;
                    }
                });
            } catch (e) {
                return string;
            }
        }

        return parse(JSON.stringify(parameters));
    }

    // -----------------------------------------
    //        Game_Variable Extensions
    // -----------------------------------------
    /**
     * Retrieves a variable value by it's name, instead of it's id if found.
     * (Which is normally accessible by $gameVariables.value(event_id))
     *
     * @param name {string} the game variable name
     * @returns {*|undefined} the value of the variable if found, otherwise undefined
     */
    Game_Variables.prototype.valueByName = function (name) {
        if ($dataSystem && $dataSystem.variables) {
            const index = $dataSystem.variables.indexOf(name);
            if (index !== -1 && index !== 0) {
                return $gameVariables.value(index);
            }
        }
    };

    /**
     * Set the value of a game variable by it's name instead of it's id if found.
     * (Which is normally set by $gameVariables.setValue(event_id))
     *
     * @param name {string} the game variable name
     * @param value {*} the new value
     */
    Game_Variables.prototype.setValueByName = function (name, value) {
        if (!!$dataSystem && !!$dataSystem.variables) {
            const index = $dataSystem.variables.indexOf(name);
            if (index !== -1 && index !== 0) {
                $gameVariables.setValue(index, value);
            }
        }
    };

    // -----------------------------------------
    //        Game_Switches Extensions
    // -----------------------------------------
    /**
     * Retrieves a switch value by it's name, instead of it's id if found.
     * (Which is normally accessible by $gameSwitches.value(event_id))
     *
     * @param name {string} the game switch name
     * @returns {*|undefined} the value of the variable if found, otherwise undefined
     */
    Game_Switches.prototype.valueByName = function (name) {
        if (!!$dataSystem && !!$dataSystem.switches) {
            const index = $dataSystem.switches.indexOf(name);
            if (index !== -1 && index !== 0) {
                return $gameSwitches.value(index);
            }
        }
    };

    /**
     * Set the value of a switch by it's name instead of it's id if found.
     * (Which is normally set by $gameSwitches.setValue(event_id))
     *
     * @param name {string} the game switch name
     * @param value {*} the new value
     */
    Game_Switches.prototype.setValueByName = function (name, value) {
        if (!!$dataSystem && !!$dataSystem.switches) {
            const index = $dataSystem.switches.indexOf(name);
            if (index !== -1 && index !== 0) {
                $gameSwitches.setValue(index, value);
            }
        }
    };

    // -----------------------------------------
    //        Game_Event Extensions
    // -----------------------------------------
    /**
     * Checks whether the event is located inside of the game screen or not.
     *
     * @returns {boolean}
     */
    Game_Event.prototype.isInsideScreen = function () {
        let screen = {
            x1: $gameMap.displayX(),
            y1: $gameMap.displayY(),
            x2: $gameMap.displayX() + $gameMap.screenTileX() - 1,
            y2: $gameMap.displayY() + $gameMap.screenTileY() - 1
        };
        return screen.x1 <= this.x && this.x <= screen.x2
          && screen.y1 <= this.y && this.y <= screen.y2;
    }

})(HD.Core)