# fastify-problem

Detect some Fastify problems

The plugin is defined as async function.
Try run the server `node ./index` and make a request in browser - you will see athe error `sid not found`
Make a new request - you will see correct response `{ hellow: 'world'}`.

Stop the server and uncomment in `index.js` line

```js
//   onRequest: app.checkSid,
```

and comment lines:

```js
  onRequest: (req, reply, done) => {
    void app.checkSid(req, reply).then(
      () => done(),
      (err) => done(err)
    );
  },
```

Start the server and in dev tools remove `sid` cookie and make a request - you will see correct response `{ hellow: 'world'}` instead of the error!

Conclusion: `onRequest` accepts only sync function
