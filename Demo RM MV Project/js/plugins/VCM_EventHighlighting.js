//-----------------------------------------------------------------------------
// VCM Plugins - VCM_EventHighlighting
//-----------------------------------------------------------------------------

/*:
@plugindesc Allows the player to highlight events with a keypress. Conditions, color and key of the highlight are configurable. Events may have individual highlights.
@author VCM Plugins


@param 1 - Highlighting Settings

@param Event Highlight
@parent 1 - Highlighting Settings
@type boolean
@on Yes
@off No
@desc When starting or loading games, events will be highlighted?
Default: false
@default false

@param Event Highlighting Key
@parent 1 - Highlighting Settings
@desc What will be Event Highlighting key?
Default: H
@default H

@param Event Highlighting Duration
@parent 1 - Highlighting Settings
@desc Duration for highlighting to stay on in seconds
Default: 5 (0 to disable)
@default 5
@type number
@min 0

@param Event Highlighting Type
@parent 1 - Highlighting Settings
@desc What will be the type of the event highlighting?
Default: Color Blend Overlay
@default Color Blend Overlay
@type select
@option Color Blend Overlay
@option Event Overlay

@param Color Blend Overlay Settings
@desc Only available when "Color Blend Overlay" is selected as "Event Highlighting Type"

@param Event Highlight Color
@parent Color Blend Overlay Settings
@desc What will be the color of the event highlight?
Default: [255, 255, 255, 155]
@default [255, 255, 255, 155]

@param Event Overlay Settings
@desc Only available with "Event Overlay" is selected as "Event Highlighting Type"

@param Highlighting Event Map Id
@parent Event Overlay Settings
@desc ID of the highlighting event.
@type number

@param Highlighting Event Id
@parent Event Overlay Settings
@desc MAP ID of the highlighting event.
@type number

@param 2 - Highlighting Conditions

@param Highlight Blank Events
@parent 2 - Highlighting Conditions
@type boolean
@on Yes
@off No
@desc Events whose current page is blank may be highlighted?
Default: false
@default false

@param Highlight Action Button Events
@parent 2 - Highlighting Conditions
@type boolean
@on Yes
@off No
@desc Events whose trigger is 'Action Button' may be highlighted?
Default: true
@default true

@param Highlight Player Touch Events
@parent 2 - Highlighting Conditions
@type boolean
@on Yes
@off No
@desc Events whose trigger is 'Player Touch' may be highlighted?
Default: true
@default true

@param Highlight Event Touch Events
@parent 2 - Highlighting Conditions
@type boolean
@on Yes
@off No
@desc Events whose trigger is 'Event Touch' may be highlighted?
Default: true
@default true

@param Highlight Autorun Events
@parent 2 - Highlighting Conditions
@type boolean
@on Yes
@off No
@desc Events whose trigger is 'Autorun' may be highlighted?
Default: false
@default false

@param Highlight Parallel Events
@parent 2 - Highlighting Conditions
@type boolean
@on Yes
@off No
@desc Events whose trigger is 'Parallel' may be highlighted?
Default: false
@default false


@help
-----------------------------------------------------------------------------
Introduction
-----------------------------------------------------------------------------

Version -> 1.01

This plugin was tested only on RPG Maker MV Version 1.6.2.
I cannot guarantee it works on lower versions.

Terms of Use:
 - Available for commercial and non-commercial use
 - You may freely edit the code
 - You are not allowed to redistribute this plugin. Instead,
 provide a link(https://vcm-plugins.itch.io/vcm-eventhighlighting)
 - Do not claim this plugin as your own
 - Credit is not required. However, if you want to, credit me as 'VCM Plugins'

This plugin allows the player to highlight events with a keypress.
Conditions, color and key of the highlight are configurable.
Through script calls, events may have individual highlights.
Does not highlight events without image.

This documentation contains the following subheaders:
Introduction
Parameters Explanation
Script Calls
Compatibility
Versions


-----------------------------------------------------------------------------
Parameters Explanation
-----------------------------------------------------------------------------

Event Highlight
This parameter defines whether events that match the other parameters
conditions will be highlighted upon starting a new game or loading a
saved one.

Event Highlight Color
This parameter defines the default color of event highlighting. The value
should be an array with 4 numbers, like [255, 255, 255, 155]. First number
is red tone, second, green tone, third, blue tone and last, opacity. Higher
value have higher effects. All numbers, if lower than 0, are converted to 0.
Similarly, if any of them are higher than 255, the actual number will be 255.
Value that isn't an array with 4 numbers may throw errors.

Event Highlighting Key
This parameter specifies the key to be pressed in order to enable/disable the
default event highlighting. Case-insensitive. If you want to remove this
feature, use values that require more than one keypress to execute,
or no value at all.

Highlight Blank Events
This parameter specifies whether events whose current page has blank Contents
may be highlighted by default. This condition is checked before all others.

Highlight Action Button Events
This parameter defines if events whose current page's trigger is
'Action Button' may be highlighted by default.

Highlight Player Touch Events
This parameter defines if events whose current page's trigger is
'Player Touch' may be highlighted by default.

Highlight Event Touch Events
This parameter defines if events whose current page's trigger is
'Event Touch' may be highlighted by default.

Highlight Autorun Events
This parameter defines if events whose current page's trigger is 'Autorun'
may be highlighted by default.

Highlight Parallel Events
This parameter defines if events whose current page's trigger is 'Parallel'
may be highlighted by default.


-----------------------------------------------------------------------------
Script Calls
-----------------------------------------------------------------------------

This plugin adds new local variables to events that may be changed with
script calls. Those change event highlighting for specific events and carry
over to new pages. Since events aren't saved by default(just page conditions),
you must apply those changes whenever the event's map is loaded. The syntax
may change depending on where you are using the script calls.

Examples:

Change current event's highlighting:
$gameMap.event(this._eventId)._setHighlight = true; -> Always highlighted
$gameMap.event(this._eventId)._setHighlight = false; -> Never highlighted
$gameMap.event(this._eventId)._setHighlight = null; -> Default highlighting
$gameMap.event(this._eventId)._setHighlightColor = [100, 100, 30, 200]; -> Highlight color defined
$gameMap.event(this._eventId)._setHighlightColor = null; -> Default highlight color

Change current event's highlighting on 'Set Movement Route'
(Frequency 5 recommended):
this._setHighlight = true; -> Always highlighted
this._setHighlight = false; -> Never highlighted
this._setHighlight = null; -> Default highlighting
this._setHighlightColor = [60, 0, 255, 80]; -> Highlight color defined
this._setHighlightColor = null; -> Default highlight color

Change a specific event's highlighting:
$gameMap.event(id)._setHighlight = true; -> Always highlighted
$gameMap.event(id)._setHighlight = false; -> Never highlighted
$gameMap.event(id)._setHighlight = null; -> Default highlighting
$gameMap.event(id)._setHighlightColor = [255, 0, 0, 255]; -> Highlight color defined
$gameMap.event(id)._setHighlightColor = null; -> Default highlight color

id to be replaced with id of event to be changed:
$gameMap.event(3)._setHighlight = true; -> Always highlighted
$gameMap.event(3)._setHighlight = false; -> Never highlighted
$gameMap.event(3)._setHighlight = null; -> Default highlighting
$gameMap.event(3)._setHighlightColor = [255, 255, 0, 55]; -> Highlight color defined
$gameMap.event(3)._setHighlightColor = null; -> Default highlight color
$gameMap.event(27)._setHighlight = true; -> Always highlighted
$gameMap.event(38)._setHighlight = false; -> Never highlighted
$gameMap.event(56)._setHighlight = null; -> Default highlighting
$gameMap.event(9)._setHighlightColor = [10, 10, 10, 40]; -> Highlight color defined
$gameMap.event(44)._setHighlightColor = null; -> Default highlight color


-----------------------------------------------------------------------------
Compatibility
-----------------------------------------------------------------------------

Plugin Manager line-up for maximum compatibility:
VCM_HelpWindow
VCM_PreviousTurn
VCM_BattleSave
VCM_Quicksave
VCM_MovementSpeeds
VCM_StateDescription
VCM_TermDescription
VCM_BattleMainMenu
VCM_EventHighlighting
VCM_SkillBar
VCM_MirroredSpriteset
VCM_ActionPoints
VCM_ActionOrder
VCM_EnemyGauges
VCM_MultipleGauges
VCM_ElementAffinity
VCM_AutoBattle
VCM_EnemyInfo
VCM_NumberBattlers
VCM_NoBattleLog

This plugin uses the current code of the following functions:
SceneManager.onKeyDown
Scene_Title.prototype.initialize
Game_System.prototype.onAfterLoad
Game_Event.prototype.initialize
Game_Event.prototype.update
Sprite_Character.prototype.update

This means that this plugin will use any changes to those functions
made by plugins above it in the Plugin Manager, which may, or may not
be compatible.

-----------------------------------------------------------------------------
Dependencies
-----------------------------------------------------------------------------
OrangeCustomEvents

-----------------------------------------------------------------------------
Versions
-----------------------------------------------------------------------------

Version -> 1.00
Released Plugin.

Version -> 1.01
Updated documentation.
*/

"use strict";

var Imported = Imported || {};
Imported.VCM_EventHighlighting = true;

function VCMConvert(parameters) {
  function VCMParse(string) {
    try {
      return JSON.parse(string, (key, value) => {
        try {
          return VCMParse(value);
        } catch (e) {
          return value;
        }
      });
    } catch (e) {
      return string;
    }
  }

  return VCMParse(JSON.stringify(parameters));
}

var VCM = VCM || {};
VCM.EventHighlighting = VCM.EventHighlighting || {};
VCM.EventHighlighting = VCMConvert(PluginManager.parameters('VCM_EventHighlighting')) || {};
VCM.EventHighlightingAlias = VCM.EventHighlightingAlias || {};

VCM.EventHighlighting['Event Highlighting Key'] = VCM.EventHighlighting['Event Highlighting Key'].toString().toUpperCase();


//-----------------------------------------------------------------------------
// SceneManager
//
// The static class that manages scene transitions.

VCM.EventHighlightingAlias.SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function (event) {
  if (this._scene instanceof Scene_Map && $gamePlayer.canMove()) {
    if (event.key.toUpperCase() === VCM.EventHighlighting['Event Highlighting Key']) {
      VCM.EventHighlighting.Highlight = !VCM.EventHighlighting.Highlight;

      // event highlighting duration to turn off after so many seconds automatically
      let duration = Number(VCM.EventHighlighting['Event Highlighting Duration']);
      if (VCM.EventHighlighting.Highlight && duration > 0) {
        HD.Utils.sleepSingleton("VCM_EventHighlighting", duration * 1000)
          .then(() => VCM.EventHighlighting.Highlight = false);
      }
    }
  }
  VCM.EventHighlightingAlias.SceneManager_onKeyDown.call(this, event);
};

//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

VCM.EventHighlightingAlias.Scene_Title_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function () {
  VCM.EventHighlightingAlias.Scene_Title_initialize.call(this);
  VCM.EventHighlighting.Highlight = VCM.EventHighlighting['Event Highlight'];
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

VCM.EventHighlightingAlias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function () {
  VCM.EventHighlightingAlias.Game_System_onAfterLoad.call(this);
  VCM.EventHighlighting.Highlight = VCM.EventHighlighting['Event Highlight'];
};

//-----------------------------------------------------------------------------
// Game_Event
//
// The game object class for an event. It contains functionality for event page
// switching and running parallel process events.

VCM.EventHighlightingAlias.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function (mapId, eventId) {
  VCM.EventHighlightingAlias.Game_Event_initialize.call(this, mapId, eventId);
  ///
  this._highlight = VCM.EventHighlighting.Highlight;
  this._setHighlight = null;
  this._setHighlightColor = null;
  this._highligtEventId = null;
  this._highlightInitializing = false;
  ///
};

VCM.EventHighlightingAlias.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
  VCM.EventHighlightingAlias.Game_Event_update.call(this);
  ///
  if (this._setHighlight !== null && this._highlight !== this._setHighlight) {
    this._highlight = this._setHighlight;
  } else if (this._setHighlight === null) {
    if (this._highlight !== VCM.EventHighlighting.Highlight) {
      this._highlight = VCM.EventHighlighting.Highlight;
    }
    if (!(VCM.EventHighlighting.Highlight
      && (VCM.EventHighlighting['Highlight Blank Events'] || this.page() && this.page().list.length > 1)
      && ((this._trigger === 0 && VCM.EventHighlighting['Highlight Action Button Events'])
        || (this._trigger === 1 && VCM.EventHighlighting['Highlight Player Touch Events'])
        || (this._trigger === 2 && VCM.EventHighlighting['Highlight Event Touch Events'])
        || (this._trigger === 3 && VCM.EventHighlighting['Highlight Autorun Events'])
        || (this._trigger === 4 && VCM.EventHighlighting['Highlight Parallel Events'])))) {
      this._highlight = false;
    }
  }

  // If "Event Overlay"
  if (VCM.EventHighlighting['Event Highlighting Type'] === "Event Overlay" && !this._highlightInitializing) {
    if (!this._highligtEventId && this._highlight && this.isInsideScreen()) { // create highlighting event
      this._highlightInitializing = true;
      const templateEventMapId = VCM.EventHighlighting['Highlighting Event Map Id'],
        templateEventId = VCM.EventHighlighting['Highlighting Event Id'],
        event = this;
      $gameMap.copyEventFrom(templateEventMapId, templateEventId, this.x, this.y, true, undefined,
        (newEvent) => {
          event._highligtEventId = newEvent._eventId;
          event._highlightInitializing = false;
        });
    } else if (!this._highlight && this._highligtEventId) { // delete highlighting event
      $gameSystem.removeCustomEvent(this._mapId, this._highligtEventId);
      $gameMap.eraseEvent(this._highligtEventId);
      delete $gameMap._events[this._highligtEventId]
      this._highligtEventId = null;
    }
  }
};
//-----------------------------------------------------------------------------
// Sprite_Character
//
// The sprite for displaying a character.

VCM.EventHighlightingAlias.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function () {
  VCM.EventHighlightingAlias.Sprite_Character_update.call(this);
  ///

  let event = this._character;
  if (event._eventId) {
    if (VCM.EventHighlighting['Event Highlighting Type'] === "Color Blend Overlay") {
      if (event._highlight && event._setHighlightColor !== null && !this._blendColor.equals(event._setHighlightColor)) {
        // change highlight color
        this.setBlendColor(event._setHighlightColor);
      } else if (event._highlight && event._setHighlightColor === null && !this._blendColor.equals(VCM.EventHighlighting['Event Highlight Color'])) {
        // highlight event
        this.setBlendColor(VCM.EventHighlighting['Event Highlight Color']);
      } else if (!event._highlight && !this._blendColor.equals([0, 0, 0, 0])) {
        // remove highlight
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
  }
  ///
};