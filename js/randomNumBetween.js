const randomNumBetween = ( start ) => {
    return {
        and: ( end ) => {
            return Math.random() * ( start - end ) + end;
        }
    };
};

export default randomNumBetween;
