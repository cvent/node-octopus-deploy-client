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

describe('Users Api', function(){
  var mock = nock('http://octopus/api/users'),
    client = OctopusClient.Create({
      endpoint: "http://octopus",
      apiKey: "apiKey"
    });

  it('should be able to get all users', function(done){
      mock.get('/all')
      .reply(200, [{ Id: "Users-1", Username: "test@test.com" }]);

    client.resources.users.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('Users-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new user', function(done){
      mock.post("")
      .reply(201, { Id: "Users-1", Username: "test@test.com" });

    client.resources.users.post({Username: "test@test.com"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Users-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to update a single user', function(done){
      mock.put('/Users-1')
      .reply(200, { Id: "Users-1", Username: "test@test.com" });

    client.resources.users.id("Users-1").put({ Username: "test@test.com" })
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Users-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single user', function(done){
      mock.get('/Users-1')
      .reply(200, { Id: "Users-1", Username: "test@test.com" });

    client.resources.users.id("Users-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Users-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
