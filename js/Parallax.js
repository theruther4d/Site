import Clock from './Clock.js';
import ScrollEmitter from './ScrollEmitter.js';

class Parallax {
    constructor( { el, resolver } ) {
        this.el = el;
        this._getDimensions();
        this._ticking = false;
        this._resolver = resolver;

        window.clock = window.clock || new Clock();
        window.scrollEmitter = window.scrollEmitter || new ScrollEmitter();

        this._onScroll = this._onScroll.bind( this );
        this._onUpdate = this._onUpdate.bind( this );
        this._onDraw = this._onDraw.bind( this );

        window.scrollEmitter.on( 'UPDATE', this._onScroll );
    }

    _getDimensions() {
        this.box = this.el.getBoundingClientRect();
        this.windowHeight = window.outerHeight || window.innerHeight;
        this._start = Math.max( this.box.top - this.windowHeight, 0 );
        this._end = this.box.bottom;
        this._from = 0;
        this._to = 1;
    }

    _onScroll( scroll ) {
        this._scroll = scroll;

        if( this._inView() ) {

            if( !window.clock.running ) {
                window.clock.start();
            }

            if( !this._ticking ) {
                window.clock.once( 'UPDATE', this._onUpdate );
                window.clock.once( 'DRAW', this._onDraw );

                this._ticking = true;
            }
        }
    }

    _onUpdate() {
        // Calculate the value of our transform:
        this.progress = ( this._from + ( ( this._to - this._from ) / ( this._end - this._start ) ) * ( this._scroll - this._start ) );
    }

    _onDraw( timeStamp ) {
        // Do the transform:
        this._resolver( this.el, this.progress );
        this._ticking = false;
    }

    _inView() {
        return ( this._scroll + this.windowHeight >= this.box.top ) && ( this._scroll <= this.box.bottom );
    }
};

export default Parallax;
