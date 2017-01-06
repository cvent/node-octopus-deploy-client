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

describe('Deployments Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get a pagination of all deployments', function(done){
    mock.get('/api/deployments')
      .reply(200, { Items: [{ Id: "Deployments-1", Name: "Deploy to PROD" }]});

    client.resources.deployments.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Items[0].Id).eql('Deployments-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able get deployment by query parameters', function(done){
    mock.get('/api/deployments?projects=Projects-583&environments=Environments-23')
      .reply(200, { Items: [{ Id: "Deployments-1", Name: "Deploy to PROD", ReleaseId: "Releases-20042", EnvironmentId: "Environments-23" }] });

    client.resources.deployments.get({projects:"Projects-583", environments: "Environments-23"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Items[0].EnvironmentId).eql('Environments-23');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new deployment', function(done){
    mock.post('/api/deployments')
      .reply(201, {Id: "Deployments-2"});

    client.resources.deployments.post({EnvironmentId: "Environments-23", ReleaseId: "Releases-20042", Comments: "deploy from client", ForcePackageRedeployment: true})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Deployments-2');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
