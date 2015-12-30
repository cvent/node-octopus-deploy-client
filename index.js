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

"use strict";
var OctoClient = require("./dist/client.js");

var defaultOptions = {
      endpoint: null,
      apiKey: null,
      clientOptions: {}
    };

function getEndpoint(options) {
  if (!options.endpoint) {
    throw new Error("No endpoint provided");
  }

  return options.endpoint;
}

function getApiKey(options) {
  if (!options.apiKey) {
    throw new Error("No apiKey provided");
  }

  return options.apiKey;
}

function extend(dest /*, ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      dest[key] = arguments[i][key]
    }
  }

  return dest
}

function forcedOptions(options) {
  return {
    baseUri: getEndpoint(options) + "/api",
    headers: {
      "X-Octopus-ApiKey": getApiKey(options),
      "Content-Type": "application/json"
    }
  };
}

module.exports = {
  Create: function create(inOptions) {
    var options = extend({}, defaultOptions, inOptions);

    return new OctoClient(extend({}, options.clientOptions, forcedOptions(options)));
  }
};

