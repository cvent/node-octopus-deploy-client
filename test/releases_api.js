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

describe('Releases Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get a pagination of all releases', function(done){
    mock.get('/api/releases')
      .reply(200, { Items: [{ Id: "releases-1", Name: "Test Release" }]});

    client.resources.releases.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Items[0].Id).eql('releases-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new release', function(done){
    mock.post('/api/releases')
      .reply(201, { Id: "releases-1", Version: "1.2.3" });

    client.resources.releases.post({Version: "1.2.3"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Version).eql('1.2.3');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to update a release', function(done){
    mock.put('/api/releases/releases-1')
      .reply(200, { Id: "releases-1", Version: "1.2.4" });

    client.resources.releases.id('releases-1').put({Version: "1.2.4"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Version).eql('1.2.4');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single release', function(done){
    mock.get('/api/releases/releases-1')
      .reply(200, { Id: "releases-1", Name: "Test Release" });

    client.resources.releases.id("releases-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('releases-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a pagination of deployments for a release', function(done){
    mock.get('/api/releases/releases-1/deployments')
      .reply(200, { Items: [{ Id: "deployments-1", Name: "Test Deployment" }]});

    client.resources.releases.id("releases-1").deployments.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Items[0].Id).eql('deployments-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })


})
