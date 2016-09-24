import Parallax from './Parallax.js';
import randomNumBetween from './randomNumBetween.js';

const main = ( () => {
    return {
        hero: {
            init: () => {
                const HERO = document.getElementById( 'header' );
                const LINES = [].slice.apply( document.querySelectorAll( '.hero__line' ) );

                HERO.classList.add( 'will--init' );

                // while( LINES.length ) {
                    // const RAND = Math.floor( randomNumBetween( 0 ).and( LINES.length ) );
                    // const LINE = LINES.splice( RAND, 1 );

                    // LINE.classList.add( 'will--appear' );
                    //
                    // setTimeout( () => {
                    //     LINE.classList.add( 'did--appear' );
                    // }, 250 );
                // }

                HERO.classList.add( 'did--init' );
            },

            parallax: () => {
                const SLOW_TO = -300;
                const MEDIUM_TO = -600;
                const FAST_TO = -900;
                const XXSLOW_TO = -100;
                const XXMEDIUM_TO = -150;
                const XXFAST_TO = -200;
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

                var slow_val = 0;
                var medium_val = 0;
                var fast_val = 0;
                var xxslow_val = 0;
                var xxmedium_val = 0;
                var xxlarge_val = 0;
                var headline_val = 0;

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

                var multiplier;

                const header = document.getElementById( 'header' );
                const parallax = new Parallax({
                    start: 0,
                    end: header.getBoundingClientRect().bottom,
                    resolver: ( progress ) => {
                        multiplier = ease( progress );
                        slow_val = ( SLOW_TO / 1 ) * multiplier;
                        medium_val = ( MEDIUM_TO / 1 ) * multiplier;
                        fast_val = ( FAST_TO / 1 ) * multiplier;
                        xxslow_val = ( XXSLOW_TO / 1 ) * multiplier;
                        xxmedium_val = ( XXMEDIUM_TO / 1 ) * multiplier;
                        xxlarge_val = ( XXFAST_TO / 1 ) * multiplier;
                        headline_val = ( HEADLINE_TO / 1 ) * multiplier;

                        updateItems( slow_val, medium_val, fast_val, xxslow_val, xxmedium_val, xxlarge_val );
                        headlineNode.update( headline_val );
                    }
                });
            }
        },

        init: () => {
            document.documentElement.classList.remove( 'no-js' );
            main.hero.init();
            main.hero.parallax();
        }
    }
})();

main.init();
