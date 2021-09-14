# Notes

`notes` project from `https://fullstackopen.com/`


## Getting data from the "server"

JavaScript engines (i.e. the runtime environments in the browsers) follow the asynchronous model. This requires all IO-operations to be executed as non-blocking. This means the code execution continues immediatly after calling an IO function, without waiting for it to return.


## Loose Ends

* A newly added note (without reload) fails the switch "make important", because it's `id` is undefined. After reload it works alright.


