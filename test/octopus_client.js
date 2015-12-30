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
    OctopusClient = require('../');

describe('Octopus Client', function(){
  it('should be able to be created ', function(){
    var client = OctopusClient.Create({
      endpoint: "https://octopus/",
      apiKey: "apiKey"
    });

    should(client).be.ok
  })

  it('should error if an api key is not supplied', function(){
    var error = null;
    try {
      var client = OctopusClient.Create({
        endpoint: "https://octopus/"
      });

      should(client).not.be.ok
    } catch(err) {
      error = err;
    }

    should(error).be.ok
    should(error.message).eql('No apiKey provided');
  })

  it('should error if an endpoint is not supplied', function(){
    var error = null;
    try {
      var client = OctopusClient.Create({
        apiKey: "I'm a little teapot"
      });

      should(client).not.be.ok
    } catch(err) {
      error = err;
    }

    should(error).be.ok
    should(error.message).eql('No endpoint provided');
  })
})
