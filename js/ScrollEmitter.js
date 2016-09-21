import Emitter from './Emitter.js';

class ScrollEmitter extends Emitter {
    constructor() {
        super();
        this._onScroll = this._onScroll.bind( this );
        this._bindScrollListener();
    }

    _onScroll() {
        this.trigger( 'UPDATE', window.scrollY );
    }

    _bindScrollListener() {
        window.addEventListener( 'scroll', this._onScroll, false );
    }
};

export default ScrollEmitter;
