module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/api/competitions', function (req, res) {
        request({
            method: 'GET',
            url: 'http://api.football-data.org/v2/competitions',
            json: true,
            headers: {
                'X-Auth-Token': '041b645e8f1c477fb0630e4b1fed932e',
                'X-Response-Control': 'full'
            }
        }, function (error, response, body) {

            res.json(body);
        });

    });


}