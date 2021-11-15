//=============================================================================
/*:
 * @plugindesc (v.1.0) This plugin allows for highlighting events during the 
 * game. Event highlighting is done via overlaying a copy of a hidden event 
 * to allow for any kind of customization.
 *
 * @author RazielH
 * 
 * ----------------------------------------------------------------------------
 * @param 1 - Highlighting Settings
 * 
 * @param highlightAtStartup
 * @text Event Highlight at Startup
 * @parent 1 - Highlighting Settings
 * @desc Whether to have the events highlighted at start/load of the game
 * @type boolean
 * @on Yes
 * @off No
 * Default: false
 * @default false
 *
 * @param shortcut
 * @text Event Highlighting Key
 * @parent 1 - Highlighting Settings
 * @desc Shortcut key to toggle the event highlighting (single character)
 * Default: H
 * @default H
 *
 * @param duration
 * @text Event Highlighting Duration
 * @parent 1 - Highlighting Settings
 * @desc Duration for highlighting to stay on in seconds
 * Default: 5 (0 to disable)
 * @default 5
 * @type number
 * @min 0
 *
 * ----------------------------------------------------------------------------
 * @param 2 - Event Overlay Settings
 *
 * @param mapId
 * @text Highlighting Event Map Id
 * @parent 2 - Event Overlay Settings
 * @desc ID of the highlighting event
 * @type number
 * @min 1
 *
 * @param eventId
 * @text Highlighting Event Id
 * @parent 2 - Event Overlay Settings
 * @desc Map ID of the highlighting event
 * @type number
 * @min 1
 *
 * ----------------------------------------------------------------------------
 * @param 3 - Highlighting Conditions
 *
 * @param isHighlightBlankEvents
 * @text Highlight Blank Events
 * @parent 3 - Highlighting Conditions
 * @desc Highlight events whose current page is blank
 * @type boolean
 * @on Yes
 * @off No
 * Default: false
 * @default false
 *
 * @param isHighlightActionButtonEvents
 * @text Highlight Action Button Events
 * @parent 3 - Highlighting Conditions
 * @desc Highlight events whose trigger is 'Action Button'
 * @type boolean
 * @on Yes
 * @off No
 * Default: true
 * @default true
 *
 * @param isHighlightPlayerTouchEvents
 * @text Highlight Player Touch Events
 * @parent 3 - Highlighting Conditions
 * @desc Highlight events whose trigger is 'Player Touch'
 * @type boolean
 * @on Yes
 * @off No
 * Default: true
 * @default true
 *
 * @param isHighlightEventTouchEvents
 * @text Highlight Event Touch Events
 * @parent 3 - Highlighting Conditions
 * @desc Highlight events whose trigger is 'Event Touch'
 * @type boolean
 * @on Yes
 * @off No
 * Default: true
 * @default true
 *
 * @param isHighlightAutorunEvents
 * @text Highlight Autorun Events
 * @parent 3 - Highlighting Conditions
 * @desc Highlight events whose trigger is 'Autorun'
 * @type boolean
 * @on Yes
 * @off No
 * Default: false
 * @default false
 *
 * @param isHighlightParallelEvents
 * @text Highlight Parallel Events
 * @parent 3 - Highlighting Conditions
 * @desc Highlight events whose trigger is 'Parallel'
 * @type boolean
 * @on Yes
 * @off No
 * Default: false
 * @default false
 * 
 * 
 * @help
 * ============================================================================
 *  INTRODUCTION
 * ============================================================================
 *
 * This plugin allows for highlighting the events during the game using a
 * shortcut key for a set period of time if needed. (Requires HD_Core plugin)
 *
 * Highlighting works by duplicating another event and overlaying it on top of
 * the respective events that need to be highlighted, therefore allowing for
 * any type of customization. (Requires OrangeCustomEvents plugin)
 *
 * Any type of event can be highlighted even if it doesn't have an image.
 *
 * Individual events may also be excluded from the highlighting process by
 * adding a custom tag in the note of that event.
 *
 * Only one type of highlighting event can be applied to all events.
 *
 * To preserve processing power, only events that are visible in the screen
 * will be highlighted. So if your overlay highlighting event has animations,
 * when player is moving around in the map you will notice the highlighting
 * events animations are not in sync.
 *
 * ============================================================================
 *  PARAMETERS
 * ============================================================================
 *
 * 1 - Highlighting Settings
 *
 * <Event Highlight at Startup>
 * This parameter defines whether events that match the other parameters
 * conditions will be highlighted upon starting a new game or loading a
 * saved one.
 *
 * <Event Highlighting Key>
 * (Case-insensitive) This parameter specifies the key to be pressed in order
 * to enable/disable the default event highlighting. If you want to remove
 * this feature use no value.
 *
 * <Event Highlighting Duration>
 * This parameter defines the duration which the highlighting of the events
 * should stay on in seconds. If set to any value greater than zero, the
 * event highlighting will automatically turn off after the set duration.
 * To turn off this feature use value: 0
 *
 * 2 - Event Overlay Settings
 *
 * <Highlighting Event Map Id>
 * This parameter defines the map id of where the highlighting event is created.
 *
 * <Highlighting Event Id>
 * This parameter defines the id of the highlighting event.
 *
 * 3 - Highlighting Conditions
 *
 * <Highlight Blank Events>
 * This parameter specifies whether events whose current page has blank Contents
 * may be highlighted by default. This condition is checked before all others.
 * 
 * <Highlight Action Button Events>
 * This parameter defines if events whose current page's trigger is
 * 'Action Button' may be highlighted by default.
 * 
 * <Highlight Player Touch Events>
 * This parameter defines if events whose current page's trigger is
 * 'Player Touch' may be highlighted by default.
 * 
 * <Highlight Event Touch Events>
 * This parameter defines if events whose current page's trigger is
 * 'Event Touch' may be highlighted by default.
 * 
 * <Highlight Autorun Events>
 * This parameter defines if events whose current page's trigger is 'Autorun'
 * may be highlighted by default.
 * 
 * <Highlight Parallel Events>
 * This parameter defines if events whose current page's trigger is 'Parallel'
 * may be highlighted by default.
 *
 * ============================================================================
 *  METADATA TAGS
 * ============================================================================
 *
 * Tag Id:
 *  <hd_eh>
 *
 * Description:
 *  This tag can be used on the events to manually/forcefully exclude them from
 *  the list of events that are eligible to be highlighted.
 *  This is mostly helpful that you want to hide some events from the player.
 *
 * Example:
 *  <hd_eh:disable>
 *
 *
 * ============================================================================
 *  SCRIPT CALLS
 * ============================================================================
 * 
 * This plugin adds new local variables to events that may be changed with
 * script calls. Those change event highlighting for specific events and carry
 * over to new pages. Since events aren't saved by default(just page conditions),
 * you must apply those changes whenever the event's map is loaded. The syntax
 * may change depending on where you are using the script calls.
 * 
 * Examples:
 * 
 * Change current event's highlighting:
 * $gameMap.event(this._eventId)._forceHighlight = true; -> Always highlighted
 * $gameMap.event(this._eventId)._forceHighlight = false; -> Never highlighted
 * $gameMap.event(this._eventId)._forceHighlight = null; -> Default highlighting
 * 
 * Change current event's highlighting on 'Set Movement Route'
 * (Frequency 5 recommended):
 * this._forceHighlight = true; -> Always highlighted
 * this._forceHighlight = false; -> Never highlighted
 * this._forceHighlight = null; -> Default highlighting
 * 
 * Change a specific event's highlighting:
 * $gameMap.event(id)._forceHighlight = true; -> Always highlighted
 * $gameMap.event(id)._forceHighlight = false; -> Never highlighted
 * $gameMap.event(id)._forceHighlight = null; -> Default highlighting
 * 
 * ============================================================================
 * Dependencies
 * ============================================================================
 * <HD - Core>
 *    Required for processing parameters and setting duration of highlights
 * 
 * <Orange - Custom Event> 
 *    By Hudell - www.hudell.com
 *    http://download.hudell.com/OrangeCustomEvents.js
 *    This dependency is required for duplicating the highlighting event
 *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * <HD Plugins / HD_EventHighlighting> 
 *    https://HD-plugins.itch.io/HD-eventhighlighting.
 *    For inspiring this work and having some of their code used in this project
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

"use strict";

var Imported = Imported || {};
Imported.HD_EventHighlighting = true;

var HD = HD || {};
HD.EventHighlighting = HD.EventHighlighting || {
  name: 'HD_EventHighlighting',
  metaTag: 'hd_eh'
};

(function ($, _) {

  // -----------------------------------------
  //               Public Methods
  // -----------------------------------------
  /**
   * Checks whether the provided {@code event} meets the conditions to be highlighted or not
   *
   * @param event {Game_Event} the game event object
   * @returns {boolean}
   */
  $.canHighlight = function (event) {
    return $.highlight
      && ($.parameters.isHighlightBlankEvents || event.page() && event.page().list.length > 1)
      && ((event._trigger === 0 && $.parameters.isHighlightActionButtonEvents)
        || (event._trigger === 1 && $.parameters.isHighlightPlayerTouchEvents)
        || (event._trigger === 2 && $.parameters.isHighlightEventTouchEvents)
        || (event._trigger === 3 && $.parameters.isHighlightAutorunEvents)
        || (event._trigger === 4 && $.parameters.isHighlightParallelEvents))
      && !(event.event().meta[$.metaTag] && event.event().meta[$.metaTag].toLowerCase() === 'disable');
  }

  // -----------------------------------------
  //              Private Methods
  // -----------------------------------------
  /**
   * Creates a clone of the highlight event on the provided game event
   *
   * @param event {Game_Event} the game event object
   */
  const createHighlightingEvent = function (event) {
    event._highlightInitializing = true;
    $gameMap.copyEventFrom($.parameters.mapId, $.parameters.eventId, event.x, event.y, true, undefined,
      (newEvent) => {
        event._highligtEventId = newEvent._eventId;
        event._highlightInitializing = false;
      });
  }

  /**
   * Deletes the cloned highlight event for the provided game event
   *
   * @param event {Game_Event} the game event object
   */
  const deleteHighlightingEvent = function (event) {
    $gameSystem.removeCustomEvent(event._mapId, event._highligtEventId);
    $gameMap.eraseEvent(event._highligtEventId);
    delete $gameMap._events[event._highligtEventId]
    event._highligtEventId = null;
  }

  // -----------------------------------------
  //                Parameters
  // -----------------------------------------
  $.parameters = _.parseParameters(PluginManager.parameters(HD.EventHighlighting.name)) || {};
  $.parameters.shortcut = $.parameters.shortcut ? $.parameters.shortcut.toString().toUpperCase() : null;
  $.parameters.duration = $.parameters.duration > 0 ? Number($.parameters.duration) : null;
  $.parameters.mapId = $.parameters.mapId > 0 ? Number($.parameters.mapId) : null;

  // -----------------------------------------
  //                Extensions
  // -----------------------------------------
  HD.EventHighlighting.alias = HD.EventHighlighting.alias || {};

  // -----------------------------------------
  //        SceneManager Extensions
  // -----------------------------------------
  // The static class that manages scene transitions
  // -----------------------------------------
  $.alias.SceneManager_onKeyDown = SceneManager.onKeyDown;
  SceneManager.onKeyDown = function (event) {
    if (this._scene instanceof Scene_Map && $gamePlayer.canMove()) {
      if (event.key.toUpperCase() === $.parameters.shortcut) {
        $.highlight = !$.highlight;

        // event highlighting duration to turn off after so many seconds automatically
        if ($.parameters.duration) {
          if ($.highlight && $.parameters.duration > 0) {
            _.sleepSingleton($.name, $.parameters.duration * 1000)
              .then(() => $.highlight = false);
          }
        }
      }
    }
    $.alias.SceneManager_onKeyDown.call(this, event);
  };

  // -----------------------------------------
  //        Scene_Title Extensions
  // -----------------------------------------
  // The scene class of the title screen
  // -----------------------------------------
  $.alias.Scene_Title_initialize = Scene_Title.prototype.initialize;
  Scene_Title.prototype.initialize = function () {
    $.alias.Scene_Title_initialize.call(this);
    $.highlight = $.parameters.highlightAtStartup;
  };

  // -----------------------------------------
  //        Game_System Extensions
  // -----------------------------------------
  // The game object class for the system data
  // -----------------------------------------
  $.alias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    $.alias.Game_System_onAfterLoad.call(this);
    $.highlight = $.parameters.highlightAtStartup;
  };

  // -----------------------------------------
  //          Game_Event Extensions
  // -----------------------------------------
  // The game object class for an event.
  // It contains functionality for event page
  // switching and running parallel process events.
  // -----------------------------------------
  $.alias.Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function (mapId, eventId) {
    $.alias.Game_Event_initialize.call(this, mapId, eventId);

    this._highlight = $.highlight;
    this._forceHighlight = null;
    this._highligtEventId = null;
    this._highlightInitializing = false;
  };

  $.alias.Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function () {
    $.alias.Game_Event_update.call(this);

    if (this._forceHighlight !== null && this._highlight !== this._forceHighlight) {
      this._highlight = this._forceHighlight;
    } else if (this._forceHighlight === null) {
      if (this._highlight !== $.highlight) {
        this._highlight = $.highlight;
      }
      if (!$.canHighlight(this)) {
        this._highlight = false;
      }
    }

    if (!this._highlightInitializing) {
      if (!this._highligtEventId && this._highlight && this.isInsideScreen()) {
        createHighlightingEvent(this);
      } else if (!this._highlight && this._highligtEventId) {
        deleteHighlightingEvent(this);
      }
    }
  };

})(HD.EventHighlighting, HD.Core)