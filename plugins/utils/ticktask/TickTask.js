import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TickTask {
    constructor(parent, config) {
        this.parent = parent;
        this._isRunning = false;
        this.isPaused = false;
        this.tickingState = false;
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        this.setTickingMode(GetValue(config, 'tickingMode', 1));
    }

    // override
    boot() {
        if ((this.tickingMode === 2) && (!this.tickingState)) {
            this.startTicking();
        }
    }

    // override
    shutdown() {
        this.destroyEventEmitter();
        if (this.tickingState) {
            this.stopTicking();
        }
    }

    setTickingMode(mode) {
        if (typeof (mode) === 'string') {
            mode = TICKINGMODE[mode];
        }
        this.tickingMode = mode;
    }

    // override
    startTicking() {
        this.tickingState = true;
    }

    // override
    stopTicking() {
        this.tickingState = false;
    }

    get isRunning() {
        return this._isRunning;
    }

    set isRunning(value) {
        if (this._isRunning === value) {
            return;
        }

        this._isRunning = value;
        if ((this.tickingMode === 1) && (value != this.tickingState)) {
            if (value) {
                this.startTicking();
            } else {
                this.stopTicking();
            }
        }
    }

    start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
    }

    pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
            this.isPaused = true;
            this.isRunning = false;
        }
        return this;
    }

    resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
            this.isRunning = true;
        }
        return this;
    }

    stop() {
        this.isPaused = false;
        this.isRunning = false;        
        return this;
    }

    complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
    }
}

Object.assign(
    TickTask.prototype,
    EventEmitterMethods
);

const TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
}

export default TickTask;