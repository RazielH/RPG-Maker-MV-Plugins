var HD = HD || {};
HD.Test = HD.Test || {};

(function ($) {

  $.checkBoulder = function (eventId, color, id) {
    const event = $gameMap.event(eventId);
    let boulderMaze = $gameVariables.valueByName('boulderMaze');
    if (!boulderMaze) {
      $gameVariables.setValueByName('boulderMaze', []);
    }
    let allEvents = $gameMap.eventsXy(event.x, event.y);
    if (allEvents.length > 1) {
      boulderMaze[id] = allEvents
        .filter(e => e._eventId !== event._eventId)
        .filter(e => $dataMap.events[e._eventId])
        .filter(e => $dataMap.events[e._eventId].meta)
        .filter(e => $dataMap.events[e._eventId].meta['hd'])
        .some(e => $dataMap.events[e._eventId].meta['hd'].trim() === color);
      return;
    }
    boulderMaze[id] = false;
  };

  $.isBoulderMazeComplete = function () {
    let boulderMaze = $gameVariables.valueByName('boulderMaze');
    return boulderMaze && boulderMaze.length === 6 && boulderMaze.every(a => !!a);
  }

})(HD.Test);