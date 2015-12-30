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

describe('Environment Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get all environments', function(done){
    mock.get('/api/environments/all')
      .reply(200, [{ Id: "Environments-1", Name: "Env" }]);

    client.resources.environments.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('Environments-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new environment', function(done){
    mock.post('/api/environments')
      .reply(201, { Id: "Environments-1", Name: "Env" });

    client.resources.environments.post({Name: "Env"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Env');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to update an environment', function(done){
    mock.put('/api/environments/Environments-1')
      .reply(200, { Id: "Environments-1", Name: "Env2" });

    client.resources.environments.id('Environments-1').put({Name: "Env2"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Env2');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single environment', function(done){
    mock.get('/api/environments/Environments-1')
      .reply(200, { Id: "Environments-1", Name: "Env" });

    client.resources.environments.id("Environments-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Environments-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
