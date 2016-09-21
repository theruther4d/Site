import Emitter from './Emitter.js';

class Clock extends Emitter {
    constructor() {
        super();

        this.running = false;
        this._ticking = false;
        this._startTime;
        this._draw = this._draw.bind( this );
    }

    _draw( timeStamp ) {
        this._ticking = false;

        this.trigger( 'UPDATE' );
        this.trigger( 'DRAW', timeStamp );

        if( this._events.length ) {
            this._raf = requestAnimationFrame( this._draw );
        } else {
            this.stop();
        }
    }

    _requestTick() {
        if( !this._ticking ) {
            this._raf = requestAnimationFrame( this._draw );
        }

        this._ticking = true;
    }

    start() {
        this.running = true;
        this._requestTick();
    }

    stop() {
        this.running = false;
        cancelAnimationFrame( this._raf );
    }
};

export default Clock;
