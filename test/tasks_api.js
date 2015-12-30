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

describe('Tasks Api', function(){
  var mock = nock('http://octopus'),
  client = OctopusClient.Create({
    endpoint: "http://octopus",
    apiKey: "apiKey"
  });

  it('should be able to get all tasks', function(done){
    mock.get('/api/tasks/all')
      .reply(200, [{ Id: "Tasks-1", Name: "Deploy" }]);

    client.resources.tasks.all.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body[0].Id).eql('Tasks-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to create a new task', function(done){
    mock.post('/api/tasks')
      .reply(201, { Id: "Tasks-1", Name: "Deploy" });

    client.resources.tasks.post({Name: "Deploy"})
      .then(helper.createdResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Deploy');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get a single task', function(done){
    mock.get('/api/tasks/Tasks-1')
      .reply(200, { Id: "Tasks-1", Name: "Deploy" });

    client.resources.tasks.id("Tasks-1").get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Id).eql('Tasks-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get details for a task', function(done){
    mock.get('/api/tasks/Tasks-1/details')
      .reply(200, { Task: { Id: "Tasks-1", Name: "Deploy" }});

    client.resources.tasks.id("Tasks-1").details.get()
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Task.Id).eql('Tasks-1');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to get the raw output from a task', function(done){
    mock.get('/api/tasks/Tasks-1/raw')
      .reply(200, "This is the raw console output.");

    client.resources.tasks.id("Tasks-1").raw.get()
      .then(helper.successResponsePlainText)
      .then(function(resp){
        should(resp.body).eql("This is the raw console output.");
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to cancel an task', function(done){
    mock.post('/api/tasks/Tasks-1/cancel')
      .reply(200, { Id: "Tasks-1", Name: "Upgrade" });

    client.resources.tasks.id('Tasks-1').cancel.post({Name: "Upgrade"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Upgrade');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

  it('should be able to re-run an task', function(done){
    mock.post('/api/tasks/rerun/Tasks-1')
      .reply(200, { Id: "Tasks-1", Name: "Upgrade" });

    client.resources.tasks.rerun.id('Tasks-1').post({Name: "Upgrade"})
      .then(helper.successResponse)
      .then(function(resp){
        should(resp.body.Name).eql('Upgrade');
        done();
      }).catch(function(error) {
        done(error);
      });
  })

})
