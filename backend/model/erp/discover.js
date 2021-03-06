var dbFacade = require('../../DB/DBFacade');

exports.getDiscoverRequestWaiting = function (_data, _callback) {
    dbFacade.getDiscoverRequestWaiting(_data, function (_results) {
        var res = {}
        res.result = 1;
        res.list = _results;


        var idxs = []

        for (var i = 0; i < _results.length; i++) //Idx 뽑아내기
            if (_results[i].read_state == 0)
                idxs.push(_results[i].idx);
        if (idxs.length != 0)
            dbFacade.updatDiscoverRequestNotRead(idxs, function () {
                _callback(res);
            })
        else
            _callback(res);
    });
};

exports.getDiscoverRequestRecord = function (_data, _callback) {
    dbFacade.getDiscoverRequestRecord(_data, function (_results) {
        var res = {};
        res.result = 1;
        res.list = _results;
        _callback(res);
    });
}

exports.permitDiscoverRequest = function (_data, _callback) {
    dbFacade.permitDiscoverRequest(_data, function (_results) {
        var res = {};
        res.result = 1;
        dbFacade.updateDiscoverShelter(_data, function () {
            _callback(res);
        });
    });
}

exports.rejectDiscoverRequest = function (_data, _callback, _testCallback) {
    var matching = require('../discover/matching');

    dbFacade.rejectDiscoverRequest(_data, function (_results) {
        var res = {};
        res.result = 1;
        _callback(res);

        // Discover 데이터 가져옴.
        dbFacade.getDiscoverFromDiscoverRequest(_data, function (_results) {
            //다시 매칭
            matching.matching(
                {
                    discover_idx: _results[0].idx,
                    longitude: _results[0].longitude,
                    latitude: _results[0].latitude
                },
                function (_results) {
                    if (typeof _testCallback == "function")
                        _testCallback(_results);
                }
            )
        });
    });
}