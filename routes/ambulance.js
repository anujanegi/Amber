var express = require('express');
var router = express.Router();
const request = require('request');

// hasura graphql endpoint
const GRAPHQL_ENDPOINT = "https://amber-test3.herokuapp.com/v1/graphql"

function response(res, query) {
  request({
  uri: GRAPHQL_ENDPOINT,
  method: "POST",
  body: query,
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10
  }, function(error, response, body) {
    if(error){
      res.send(JSON.stringify({"status":500, "error":error, "result":null}));
    }
    else {
      res.send(JSON.stringify({"status":200, "error":null, "result":body}));
      console.log(body);
    }
  });
}

router.get('/', function(req, res, next) {
  query = '{"query" : "{driver(order_by: {longitude: asc}) {name number_plate hospital_name latitude longitude mobile_number}}"}';
  response(res, query);
});

module.exports = router;
