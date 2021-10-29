var HD = HD || {};
HD.Utils = HD.Utils || {};

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
     * Method returns a promise that will be completed after the time provided in milliseconds
     *
     * @param key (string) a unique key to be used for tracing the timeout id
     * @param ms (number) time in millis to wait
     * @returns {Promise<unknown>} promise
     */
    $.sleepSingleton = function (key, ms) {
        if (sleepSingletonTimeouts[key]) {
            clearTimeout(sleepSingletonTimeouts[key]);
            sleepSingletonTimeouts[key] = undefined;
        }
        return new Promise(resolve => sleepSingletonTimeouts[key] = setTimeout(resolve, ms));
    }

    // async function asyncWaitLoop() {
    //     // Sleep in loop
    //     while (true) {
    //         await sleep(100);
    //         checkFlashlightState()
    //     }
    // }

})(HD.Utils)

Game_Variables.prototype.valueByName = function (variableName) {
    if ($dataSystem && $dataSystem.variables) {
        const index = $dataSystem.variables.indexOf(variableName);
        if (index !== -1 && index !== 0) {
            return $gameVariables.value(index);
        }
    }
};

Game_Variables.prototype.setValueByName = function (name, value) {
    if (!!$dataSystem && !!$dataSystem.variables) {
        const index = $dataSystem.variables.indexOf(name);
        if (index !== -1 && index !== 0) {
            $gameVariables.setValue(index, value);
        }
    }
};

Game_Switches.prototype.valueByName = function (name) {
    if (!!$dataSystem && !!$dataSystem.switches) {
        const index = $dataSystem.switches.indexOf(name);
        if (index !== -1 && index !== 0) {
            return $gameSwitches.value(index);
        }
    }
};

Game_Switches.prototype.setValueByName = function (name, value) {
    if (!!$dataSystem && !!$dataSystem.switches) {
        const index = $dataSystem.switches.indexOf(name);
        if (index !== -1 && index !== 0) {
            $gameSwitches.setValue(index, value);
        }
    }
};