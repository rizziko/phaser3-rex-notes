import Scale from './scale.js';

var PopUp = function (gameObject, duration, orientation, ease, scale, endScale) {
    defaultConfig.mode = 0;
    switch (orientation) {
        case 0:
        case 'x':
            defaultConfig.start = {
                x: 0
            };
            break;
        case 1:
        case 'y':
            defaultConfig.start = {
                y: 0
            };
            break;
        default:
            defaultConfig.start = 0;
            break;
    }
    defaultConfig.end = endScale ?? 1;
    defaultConfig.duration = duration;
    defaultConfig.ease = (ease === undefined) ? 'Cubic' : ease;

    if (scale === undefined) {
        scale = new Scale(gameObject, defaultConfig);
    } else {
        scale.resetFromJSON(defaultConfig);
    }
    scale.restart();

    return scale;
};

var defaultConfig = {}; // reuse this config

export default PopUp;
