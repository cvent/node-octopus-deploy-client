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

describe('Library Variable Sets Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get all library variables', function(done){
    mock.get('/api/libraryvariablesets/all')
      .reply(200, [{ Id: "LibraryVariableSets-1", Name: "LibraryVariableSets" }]);

    client.resources.libraryvariablesets.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('LibraryVariableSets-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single library variable set', function(done){
    mock.get('/api/libraryvariablesets/LibraryVariableSets-1')
      .reply(200, { Id: "LibraryVariableSets-1", Name: "LibraryVariableSets" });

    client.resources.libraryvariablesets.id('LibraryVariableSets-1').get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('LibraryVariableSets-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
