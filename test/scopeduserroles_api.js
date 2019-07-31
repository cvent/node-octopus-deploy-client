//
// Author:: Devan Jain (<d.jain@cvent.com>)
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

describe('Scopeduserroles Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get a pagination of all scoped user roles', function(done){
    mock.get('/api/scopeduserroles')
      .reply(200, { Items: [{ Id: "scopeduserroles-1", TeamId: "Teams-1" }]});

    client.resources.scopeduserroles.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Items[0].Id).eql('scopeduserroles-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new scoped user role', function(done){
    mock.post('/api/scopeduserroles')
      .reply(201, { Id: "scopeduserroles-1" });

    client.resources.scopeduserroles.post({TeamId: "Teams-1"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Id).eql('scopeduserroles-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to update a scoped user role', function(done){
    mock.put('/api/scopeduserroles/scopeduserroles-1')
      .reply(200, { Id: "scopeduserroles-1", EnvironmentIds: ["test"] });

    client.resources.scopeduserroles.id('scopeduserroles-1').put({EnvironmentIds: ["test"]})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.EnvironmentIds).eql(["test"]);
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single scoped user role', function(done){
    mock.get('/api/scopeduserroles/scopeduserroles-1')
      .reply(200, { Id: "scopeduserroles-1", TeamId: "Teams-1" });

    client.resources.scopeduserroles.id("scopeduserroles-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.TeamId).eql("Teams-1");
        done();
      }).catch(function(error) {
        done(error);
      });
  })

})
