# Routes

Here we handle client requests to the server, whether that be responding to GETs or POSTs.

## What should be in here?

Any functions that deal directly with sending responding to a client request with data should be here. **They are
identifiable by having the arguments _req_ and/or _res_.** Functions that perform server-side operations in 
response to client requests exist in the [serverside](../serverside) code directory, in a file with the same name as its
routing counterpart (which only exists if such functionality is actually required).

