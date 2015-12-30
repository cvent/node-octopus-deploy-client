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

describe('Projects Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get all projects', function(done){
    mock.get('/api/projects/all')
      .reply(200, [{ Id: "projects-1", Name: "Test Project" }]);

    client.resources.projects.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('projects-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single project', function(done){
    mock.get('/api/projects/projects-1')
      .reply(200, { Id: "projects-1", Name: "Test Project" });

    client.resources.projects.id("projects-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('projects-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get the releases for a project', function(done){
    mock.get('/api/projects/projects-1/releases')
      .reply(200, { Items: [{ Id: "releases-1", Name: "Test Release", Version: "1.0" }]});

    client.resources.projects.id("projects-1").releases.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Items[0].Id).eql('releases-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single release for a project', function(done){
    mock.get('/api/projects/projects-1/releases/1.0')
      .reply(200, { Id: "releases-1", Name: "Test Release", Version: "1.0" });

    client.resources.projects.id("projects-1").releases.version("1.0").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('releases-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })
})
