import Parallax from './Parallax.js';

const main = ( () => {
    return {
        initHeroParallax: () => {
            const SLOW_FROM = 0;
            const SLOW_TO = -1000;
            const MEDIUM_FROM = 0;
            const MEDIUM_TO = -2000;
            const FAST_FROM = 0;
            const FAST_TO = -3000;

            let slow_val;
            let fast_val;
            let medium_val;

            const slowNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=slow]' ) );
            const mediumNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=medium]' ) );
            const fastNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=fast]' ) );
            const slow = [];
            const medium = [];
            const fast = [];

            class ParallaxItem {
                constructor( node ) {
                    this._node = node;
                    this._style = this._node.style;
                }

                update( val ) {
                    this._style.transform = `translate3d( 0, ${ val.toFixed( 2 ) }px, 0 )`
                }
            };

            slowNodes.map( ( node ) => {
                slow.push( new ParallaxItem( node ) );
            });

            mediumNodes.map( ( node ) => {
                medium.push( new ParallaxItem( node ) );
            });

            fastNodes.map( ( node ) => {
                fast.push( new ParallaxItem( node ) );
            });

            const updateItems = ( slowProg, mediumProg, fastProg ) => {
                slow.map( ( item ) => {
                    item.update( slowProg );
                });

                medium.map( ( item ) => {
                    item.update( mediumProg );
                });

                fast.map( ( item ) => {
                    item.update( fastProg );
                });
            };

            const ease = ( t ) => {
                return t < 0.5 ? ( 2 * t * t ) : ( -1 + ( 4 - 2 * t ) * t );
            }

            const header = document.getElementById( 'header' );
            const parallax = new Parallax({
                start: 0,
                end: header.getBoundingClientRect().bottom,
                resolver: ( progress ) => {
                    let slow_val = ( SLOW_FROM + ( ( SLOW_TO - SLOW_FROM ) / 1 ) * ease( progress ) );
                    let medium_val = ( MEDIUM_FROM + ( ( MEDIUM_TO - MEDIUM_FROM ) / 1 ) * ease( progress ) );
                    let fast_val = ( FAST_FROM + ( ( FAST_TO - FAST_FROM ) / 1 ) * ease( progress ) );
                    updateItems( slow_val, medium_val, fast_val );
                }
            });
        },

        init: () => {
            main.initHeroParallax();
        }
    }
})();

main.init();
