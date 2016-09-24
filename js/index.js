import Parallax from './Parallax.js';

const main = ( () => {
    return {
        initHeroParallax: () => {
            const SLOW_FROM = 0;
            const SLOW_TO = -300;
            const MEDIUM_FROM = 0;
            const MEDIUM_TO = -600;
            const FAST_FROM = 0;
            const FAST_TO = -900;
            const XXSLOW_FROM = 0;
            const XXSLOW_TO = -100;
            const XXMEDIUM_FROM = 0;
            const XXMEDIUM_TO = -150;
            const XXFAST_FROM = 0;
            const XXFAST_TO = -200;
            const HEADLINE_FROM = 0;
            const HEADLINE_TO = -75;

            const slowNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=slow]' ) );
            const mediumNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=medium]' ) );
            const fastNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=fast]' ) );
            const xxslowNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=xxfast]' ) );
            const xxmediumNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=xxmedium]' ) );
            const xxfastNodes = [].slice.apply( document.querySelectorAll( '[data-parallax-speed=xxlarge]' ) );
            const slow = [];
            const medium = [];
            const fast = [];
            const xxslow = [];
            const xxmedium = [];
            const xxfast = [];

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

            xxslowNodes.map( ( node ) => {
                xxslow.push( new ParallaxItem( node ) );
            });

            xxmediumNodes.map( ( node ) => {
                xxmedium.push( new ParallaxItem( node ) );
            });

            xxfastNodes.map( ( node ) => {
                xxfast.push( new ParallaxItem( node ) );
            });

            const headlineNode = new ParallaxItem( document.getElementById( 'hero-headline' ) );

            const updateItems = ( slowProg, mediumProg, fastProg, xxslowProg, xxmediumProg, xxfastProg ) => {
                slow.map( ( item ) => {
                    item.update( slowProg );
                });

                medium.map( ( item ) => {
                    item.update( mediumProg );
                });

                fast.map( ( item ) => {
                    item.update( fastProg );
                });

                xxslow.map( ( item ) => {
                    item.update( xxslowProg );
                });

                xxmedium.map( ( item ) => {
                    item.update( xxmediumProg );
                });

                xxfast.map( ( item ) => {
                    item.update( xxfastProg );
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
                    let xxslow_val = ( XXSLOW_FROM + ( ( XXSLOW_TO - XXSLOW_FROM ) / 1 ) * ease( progress ) );
                    let xxmedium_val = ( XXMEDIUM_FROM + ( ( XXMEDIUM_TO - XXMEDIUM_FROM ) / 1 ) * ease( progress ) );
                    let xxlarge_val = ( XXFAST_FROM + ( ( XXFAST_TO - XXFAST_FROM ) / 1 ) * ease( progress ) );
                    let headline_val = ( HEADLINE_FROM + ( ( HEADLINE_TO - HEADLINE_FROM ) / 1 ) * ease( progress ) );
                    updateItems( slow_val, medium_val, fast_val, xxslow_val, xxmedium_val, xxlarge_val );
                    headlineNode.update( headline_val );
                }
            });
        },

        init: () => {
            main.initHeroParallax();
        }
    }
})();

main.init();
