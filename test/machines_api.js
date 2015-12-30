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

describe('Machines Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get all machines', function(done){
    mock.get('/api/machines/all')
      .reply(200, [{ Id: "Machines-1", Name: "Server" }]);

    client.resources.machines.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('Machines-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new machine', function(done){
    mock.post('/api/machines')
      .reply(201, { Id: "Machines-1", Name: "Server" });

    client.resources.machines.post({Name: "Server"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Server');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to update an machine', function(done){
    mock.put('/api/machines/Machines-1')
      .reply(200, { Id: "Machines-1", Name: "Server2" });

    client.resources.machines.id('Machines-1').put({Name: "Server2"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Server2');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single machine', function(done){
    mock.get('/api/machines/Machines-1')
      .reply(200, { Id: "Machines-1", Name: "Server" });

    client.resources.machines.id("Machines-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Machines-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to discover a machine', function(done){
    mock.get('/api/machines/discover?host=Server1&port=12345')
      .reply(200, { Id: "Machines-1", Name: "Server1" });

    client.resources.machines.discover.get({host:"Server1", port: 12345})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Machines-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
