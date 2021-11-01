//=============================================================================
/*:
 * @plugindesc (v.1.0) This plugin allows you to keep a log/record of all the
 * game conversations
 *
 * @author RazielH
 *
 * @text Conversation Log Variable
 * @param logVariable
 * @desc The variable used for storing the conversation log in
 * @type variable
 *
 * @help
 * ============================================================================
 *   INTRODUCTION
 * ============================================================================
 *
 * This plugin will help you in maintaining a status of all your conversations.
 * To help with knowing if a particular conversation has happened or not to be
 * able to hide or show that choice of conversation or make required actions
 * in regards to that.
 *
 * ============================================================================
 *  PARAMETERS
 * ============================================================================
 *
 * <Conversation Log Variable>
 * This would be the variable (id) to hold the conversation statuses
 *
 * ============================================================================
 *  PLUGIN CALLS
 * ============================================================================
 *
 * Plugin Command:
 *    CONVERSATION
 *
 * Action Parameter (1) (case insensitive):
 *       START: Starts a conversation category. usage is optional as it can be
 *              very useful to reduce the amount of paths written in the event
 *              pages and make the conversations and the log switching more
 *              readable.
 *              This command should be used before any other command/script
 *              for that category.
 *         END: Ends the conversation category. usage mandatory when START is
 *              used.
 *              This command must be the last command of your conversation 
 *              category or else other conversation categories will start 
 *              building inside of this conversation.
 *        DONE: Marks the conversation as done/complete (true)
 *              If START/END are used omit the conversation category from 
 *              the <Path Parameters>
 *       RESET: Resets the conversation status to incomplete (false)
 *              If START/END are used omit the conversation category from 
 *              the <Path Parameters>
 *   RESET_ALL: Resets all conversations statuses to incomplete (false)
 *
 * Path Parameters (2..) (case insensitive)
 *    A list of parameters that defines the path or sub categories of the
 *    conversation object.
 *    e.g. HotelReceptionist FirstNight Weather
 *
 *    Make sure you don't have spaces in each parameter. So if in case of
 *    <HotelReceptionist> if write <Hotel Receptionist> this becomes two
 *    separate paths as follows: {"Hotel": {"Receptionist"}}.
 *    You won't be able to achieve anything like so:
 *    {"Hotel Receptionist": ...}
 *    So don't add space to your path parameters.
 *
 *    Any number of "path parameters" can be used - use your imagination and
 *    make it fit your needs.
 *
 * Example Plugin Calls:
 *
 * When using relative path (by using 'START' and 'END'):
 *
 *        CONVERSATION START HotelReceptionist FirstNight
 *        CONVERSATION DONE Weather
 *        CONVERSATION RESET Weather
 *        CONVERSATION END
 *
 * When not using relative paths:
 *
 *        CONVERSATION DONE HotelReceptionist FirstNight Weather
 *        CONVERSATION RESET HotelReceptionist FirstNight Weather
 *        CONVERSATION RESET_ALL
 *
 *
 * You can also reset a whole conversation category:
 *
 *        CONVERSATION RESET HotelReceptionist FirstNight
 *
 * ============================================================================
 *  SCRIPT CALLS
 * ============================================================================
 *
 * Example Script Calls:
 *
 * When using relative path (by using 'START' and 'END'):
 *
 *   HD.ConversationLog.start("HotelReceptionist", "FirstNight");
 *   HD.ConversationLog.done("Weather");
 *   HD.ConversationLog.isDone("Weather");
 *   HD.ConversationLog.reset("Weather");
 *   HD.ConversationLog.end();
 *
 *
 * When not using relative paths:
 *
 *   HD.ConversationLog.done("HotelReceptionist", "FirstNight", "Weather");
 *   HD.ConversationLog.isDone("HotelReceptionist", "FirstNight", "Weather");
 *   HD.ConversationLog.reset("HotelReceptionist", "FirstNight", "Weather");
 *   HD.ConversationLog.resetAll();
 *
 *
 * You can also reset a whole conversation category:
 *
 *   HD.ConversationLog.reset("HotelReceptionist", "FirstNight");
 *
 * ============================================================================
 * Changelog
 * ============================================================================
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

var Imported = Imported || {};
Imported.HD_ConversationLog = true;
var HD = HD || {};

(function () {

  // ============================
  // PLUGIN MANAGEMENT
  // ============================
  const $ = HD.ConversationLog = HD.ConversationLog || new HD_ConversationLog(Number(PluginManager.parameters('HD_ConversationLog')["logVariable"]));

  if (!HD.pluginCommand) {

    /**
     * HD Plugin Command Type used for all HD plugin command calls
     * @constructor
     */
    function HD_PluginCommand() {
    }

    HD.pluginCommand = new HD_PluginCommand()
    let Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
      if (HD.pluginCommand[command]) {
        HD.pluginCommand[command](args);
        return;
      }
      Game_Interpreter_pluginCommand.call(this, command, args);
    };
  }

  /**
   * Conversation Log plugin command
   * @param args plugin command arguments
   */
  HD_PluginCommand.prototype.CONVERSATION = function (args) {
    if (!args) return;
    if (args.length > 1) {
      switch (args[0].toUpperCase()) {
        case "DONE":
          $.done.apply($, args.slice(1));
          break;
        case "RESET":
          $.reset.apply($, args.slice(1));
          break;
        case "RESET_ALL":
          $.resetAll.apply($);
          break;
      }
    }
  };

  // ============================
  // CONVERSATION LOG
  // ============================
  /**
   * HD Conversation Log Type
   * @param variableId {number} the id of the variable to store the log object
   * @constructor
   */
  function HD_ConversationLog(variableId) {
    this.variableId = variableId;
  }

  /**
   * finds the specified path from the provided {@code paths} parameter
   * from the {@code base} object.
   *
   * if {@code isBuild = true} it will always build the respective path
   * and return the final constructed path object.
   *
   * @param base    {{}} the base object to find the path from
   * @param paths   an array of paths
   * @param isBuild {boolean} to construct path if not exists
   * @returns {{}|undefined} the path or undefined if path could not be found
   *
   * @private
   */
  const _findPathWithBase = function (base, isBuild = false, ...paths) {
    if (!paths || paths.length === 0) return;

    let p = base;
    for (let path of paths) {
      path = "" + path; // make sure it's a string
      if (!p[path]) {
        if (isBuild) p[path] = {};
        else return;
      }
      p = p[path];
    }
    return p;
  }

  /**
   * finds the specified path from the provided {@code paths} parameter
   * from the {@code base} object of the conversation (if set uses that
   * as base, if not set, it will use the base log object}.
   *
   * if {@code isBuild = true} it will always build the respective path
   * and return the final constructed path object.
   *
   * @param paths
   * @param paths             an array of paths
   * @param isBuild {boolean} to construct path if not exists
   * @returns {{}|undefined} the path or undefined if path could not be found
   *
   * @private
   */
  const _findPath = function (isBuild = false, ...paths) {
    return _findPathWithBase(this.getBase(), isBuild, paths);
  }

  /**
   * returns the base path/object of the conversation if exists,
   * otherwise will return the full conversation log as the base.
   *
   * @returns {{}}
   */
  HD_ConversationLog.prototype.getBase = function () {
    return this.base || this.getLog();
  }

  /**
   * returns the conversation log objet.
   *
   * if first time and log object is not defined yet, it will
   * initializes the conversation log and set the variable
   * value from the provided variable id to an empty object
   * (the conversation log object)
   *
   * @returns {{}} the log object
   */
  HD_ConversationLog.prototype.getLog = function () {
    if (!this.log) {
      this.log = {};
      $gameVariables.setValue(this.variableId, this.log);
    }
    return this.log;
  }

  /**
   * Creates a starting point for a conversation log so script/plugin
   * calls are shorter.
   * Need to end the conversation after completed with a batch or related
   * messages.
   *
   * @param paths the paths to the base of the conversation
   * @see HD_ConversationLog#end
   */
  HD_ConversationLog.prototype.start = function (...paths) {
    this.base = _findPathWithBase.apply(this, [this.getLog(), true, paths]);
  }

  /**
   * Ends an already started conversation, by clearing the {@code base}
   * conversation variable
   */
  HD_ConversationLog.prototype.end = function () {
    this.base = null;
  }

  /**
   * returns true/false for the particular conversation
   *
   * @param paths the paths to the conversation
   * @returns {boolean} is conversation done?
   */
  HD_ConversationLog.prototype.isDone = function (...paths) {
    let path = _findPath.apply(this, [false, paths]);
    return !!path && !!path.completed;
  }

  /**
   * marks the particular conversation as completed (true)
   *
   * @param paths the paths to the conversation
   */
  HD_ConversationLog.prototype.done = function (...paths) {
    let path = _findPath.apply(this, [true, paths]);
    if (path) path.completed = true;
  }

  /**
   * resets the completed status of the particular conversation to false
   *
   * @param paths the paths to the conversation
   */
  HD_ConversationLog.prototype.reset = function (...paths) {
    let path = _findPath.apply(this, [false, paths]);
    if (path) {
      for (const property in path) {
        delete path[property];
      }
    }
  }

  /**
   * resets the completed status of all the conversation to false
   */
  HD_ConversationLog.prototype.resetAll = function () {
    if (this.log) {
      this.log = {};
    }
  }
})()