Octopus Client for Node.js
==========================

This is a client library for the octopus deploy server api.


# Usage

You can use the client library by using the following code

```

var OctopusClient = require('octopus-client');

# Create the client
var client = OctopusClient.Create({
  endpoint: "https://octopus",
  apiKey: "apiKey"
});


# You can then access other parts of the api like such
client.Environments.getAll(function(error, body, response) {
  # Do stuff
});
```

## License and Author

* Author:: Brent Montague (<bmontague@cvent.com>)

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

Please refer to the [license](LICENSE.md) file for more license information.
