
function setTileCollision(mapLayer, idxOrArray, dirs) {

    var mFunc; // tile index matching function
    if (idxOrArray.length) {
        // if idxOrArray is an array, use a function with a loop
        mFunc = function (inp) {
            for (var i = 0; i < idxOrArray.length; i++) {
                if (idxOrArray[i] === inp) {
                    return true;
                }
            }
            return false;
        };
    } else {
        // if idxOrArray is a single number, use a simple function
        mFunc = function (inp) {
            return inp === idxOrArray;
        };
    }

    // get the 2-dimensional tiles array for this layer
    var d = mapLayer.map.layers[mapLayer.index].data;

    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].length; j++) {
            var t = d[i][j];
            if (mFunc(t.index)) {

                t.collideUp = dirs.top;
                t.collideDown = dirs.bottom;
                t.collideLeft = dirs.left;
                t.collideRight = dirs.right;

                t.faceTop = dirs.top;
                t.faceBottom = dirs.bottom;
                t.faceLeft = dirs.left;
                t.faceRight = dirs.right;

            }
        }
    }

}

init_collisions = function(map, layer) {
    map.setCollisionByIndex(2);
    setTileCollision(layer, [3], {
        top: true,
        bottom: false,
        left: false,
        right: false
    });
    setTileCollision(layer, [4], {
        top: false,
        bottom: true,
        left: false,
        right: false
    });
    /*
    map.setCollisionBetween(12, 13);
    map.setCollisionBetween(22, 23);
    map.setCollisionBetween(32, 33);
    map.setCollisionBetween(41, 42);
    map.setCollisionBetween(51, 52);
    map.setCollisionByIndex(15);
    map.setCollisionByIndex(19);
    map.setCollisionByIndex(53);
    map.setCollisionByIndex(64);
    map.setCollisionByIndex(43);
    map.setCollisionByIndex(54);
    map.setCollisionByIndex(62);

    setTileCollision(layer, [16, 17, 18, 27, 29], {
        top: true,
        bottom: false,
        left: false,
        right: false
    });
    setTileCollision(layer, [56, 57, 58], {
        top: false,
        bottom: true,
        left: false,
        right: false
    });*/
};
