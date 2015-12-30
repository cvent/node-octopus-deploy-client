//
// Author:: Brent Montague (<bmontague@cvent.com>)
//
// Copyright:: Copyright (c) 2015 Cvent, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict';

var should = require('should'),
    nock = require('nock'),
    helper = require('./test_helper.js'),
    OctopusClient = require('../');

describe('Lifecycles Api', function(){
  var mock = nock('http://octopus'),
    client = OctopusClient.Create({
      endpoint: "http://octopus",
      apiKey: "apiKey"
    });

  it('should be able to get all lifecycles', function(done){
      mock.get('/api/lifecycles/all')
      .reply(200, [{ Id: "Lifecycles-1", Name: "Lifecycle" }]);

    client.resources.lifecycles.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('Lifecycles-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new lifecycle', function(done){
      mock.post('/api/lifecycles')
      .reply(201, { Id: "Lifecycles-1", Name: "Lifecycle" });

    client.resources.lifecycles.post({name: "Lifecycle"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Lifecycles-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to update a single lifecycle', function(done){
      mock.put('/api/lifecycles/Lifecycles-1')
      .reply(200, { Id: "Lifecycles-1", Name: "Lifecycle" });

    client.resources.lifecycles.id("Lifecycles-1").put({name: "Test Lifecycle"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Lifecycles-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single lifecycle', function(done){
      mock.get('/api/lifecycles/Lifecycles-1')
      .reply(200, { Id: "Lifecycles-1", Name: "Env" });

    client.resources.lifecycles.id("Lifecycles-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Lifecycles-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
