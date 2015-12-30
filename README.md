[![Travis branch](https://img.shields.io/travis/cvent/node-octopus-deploy-client/master.svg?style=flat-square)](https://travis-ci.org/cvent/node-octopus-deploy-client) [![npm](https://img.shields.io/npm/v/octopus-deploy-client.svg?style=flat-square)](https://www.npmjs.com/package/octopus-deploy-client) [![npm](https://img.shields.io/npm/l/octopus-deploy-client.svg?style=flat-square)](https://github.com/cvent/node-octopus-deploy-client/blob/master/LICENSE)

# Octopus Client for Node.js

This is a client library for the octopus deploy server api.


## Usage

You can use the client library by using the following code

```node
var OctopusClient = require('octopus-deploy-client');

# Create the client
var client = OctopusClient.Create({
  endpoint: "https://octopus",
  apiKey: "apiKey",
  clientOptions: {
    rejectUnauthorized: false
  }
});


# You can then access other parts of the api like such, it returns a promise with the response
client.resources.environments.all.get().then(function(response) {
  console.log(response.body);
  console.log(response.status);
  # Do more stuff
});

# You can also create promises to handle parsing certain items or validating responses
function getBody(response) {
  return new Promise(function(resolve, reject){
      resolve(response.body);
  });
}

function assertSuccess(response) {
  return new Promise(function(resolve, reject){
    if(response.status == 200) {
      resolve(response);
    } else {
      reject(response)
    }
  });
}

client.resources.environments.all.get().then(assertSuccess).then(getBody).then(function(body) {
  console.log(body);
  # Do more stuff
});
```

## License

Copyright:: 2015, Cvent, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Please refer to the [license](LICENSE) file for more license information.
