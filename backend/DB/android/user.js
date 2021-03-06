
var poolAdapter = require('../poolAdapter'); // 데이터베이스 풀 어뎁터.

exports.login = function (_data, _callback) {
    var sql = "SELECT * FROM user WHERE id=? AND pw=?"
    poolAdapter.execute(sql, [_data.id, _data.pw], function (_res) {
        _callback(_res);
    })
}

exports.checkDupID = function (_data, _callback) {
    var sql = "SELECT * FROM user WHERE id=?";
    poolAdapter.execute(sql, [_data.id], function (_res) {
        _callback(_res);
    });
};

exports.registration = function (_data, _callback) {
    var sql = "INSERT INTO user(id,pw,nickname,phone_number,email) VALUES(?,?,?,?,?)";
    poolAdapter.execute(sql, [
        _data.id,
        _data.pw,
        _data.nickname,
        _data.pnum,
        _data.email
    ], function (_result) {
        console.log(_result);
        _callback();
    });
}

exports.setToken = function (_data, _callback) {
    var sql = "UPDATE user SET token = ? ";
    var where = "WHERE idx=?";

    poolAdapter.execute(sql + where, [_data.token,_data.idx ], function (_results) {
        _callback();
    });
}

exports.deleteToken = function (_data, _callback) {
    var sql = "UPDATE user SET token=NULL ";
    var where = "WHERE idx=?";

    poolAdapter.execute(sql + where, [_data.idx], function (_results) {
        _callback();
    });
}