class Emitter {
    constructor() {
        this._events = {};
    }

    _hasEvent( eventName ) {
        return eventName in this._events;
    }

    on( eventName, callBack ) {
        if( this._hasEvent( eventName ) ) {
            this._events[eventName].push( callBack );
        } else {
            this._events[eventName] = [ callBack ];
        }

        return this;
    }

    once( eventName, callBack ) {
        this.on( eventName, { cb: callBack } );
    }

    off( eventName, callBack ) {
        if( !this._hasEvent( eventName ) ) {
            return this;
        }

        const index = this._events[eventName].indexOf( callBack );

        if( index >= 0 ) {
            this._events[eventName].splice( index, 1 );
        }
    }

    trigger( eventName, data, onFinish = () => {} ) {
        if( !this._hasEvent( eventName ) ) {
            return;
        }

        this._events[eventName].map( ( callBack, idx ) => {
            if( typeof callBack === 'object' ) {
                callBack.cb( data );
                this._events[eventName].splice( idx, 1 );
            } else {
                callBack( data );
            }
        });

        onFinish();
    }
};

export default Emitter;
