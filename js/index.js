import Parallax from './Parallax.js';

const main = ( () => {
    return {
        init: () => {
            const BOZO_FROM = 0;
            const BOZO_TO = -1000;
            const BINGO_FROM = 0;
            const BINGO_TO = -4000;
            let bingoVal;
            let bozoVal;
            let bongoVal;
            let dingoVal;
            const bozoEl = document.getElementById( 'bozo' );
            const bongoEl = document.getElementById( 'bongo' );
            const bingoEl = document.getElementById( 'bingo' );
            const dingoEl = document.getElementById( 'dingo' );
            let bozoStyle = bozoEl.style;
            let bongoStyle = bongoEl.style;
            let bingoStyle = bingoEl.style;
            let dingoStyle = dingoEl.style;

            const ease = ( t ) => {
                return t<.5 ? 2*t*t : -1+(4-2*t)*t
            }

            const bozo = new Parallax({
                el: document.getElementById( 'bozo' ),
                resolver: ( el, progress ) => {
                    bozoVal = ( BOZO_FROM + ( ( BOZO_TO - BOZO_FROM ) / 1 ) * ease( progress ) );
                    bozoStyle.transform = `translate3d( 0, ${ bozoVal.toFixed( 2 ) }px, 0 )`;
                }
            });

            const bongo = new Parallax({
                el: document.getElementById( 'bongo' ),
                resolver: ( el, progress ) => {
                    bongoVal = ( BOZO_FROM + ( ( BOZO_TO - BOZO_FROM ) / 1 ) * ease( progress ) );
                    bongoStyle.transform = `translate3d( 0, ${ bongoVal.toFixed( 2 ) }px, 0 )`;
                }
            });

            const bingo = new Parallax({
                el: document.getElementById( 'bingo' ),
                resolver: ( el, progress ) => {
                    bingoVal = ( BINGO_FROM + ( ( BINGO_TO - BINGO_FROM ) / 1 ) * ease( progress ) );
                    bingoStyle.transform = `translate3d( 0, ${ bingoVal.toFixed( 2 ) }px, 0 )`;
                }
            });

            const dingo = new Parallax({
                el: document.getElementById( 'dingo' ),
                resolver: ( el, progress ) => {
                    dingoVal = ( BINGO_FROM + ( ( BINGO_TO - BINGO_FROM ) / 1 ) * ease( progress ) );
                    dingoStyle.transform = `translate3d( 0, ${ dingoVal.toFixed( 2 ) }px, 0 )`;
                }
            });
        }
    }
})();

main.init();
