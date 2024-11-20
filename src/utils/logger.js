module.exports = function logger(OBJ, MESSAGE) {
    console.log(
        `Object: ${OBJ.constructor.name} - Message: ${MESSAGE}`
    );
};