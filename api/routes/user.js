const AuthService = require('@blocklet/sdk/service/auth');
const middlewares = require('@blocklet/sdk/lib/middlewares');
const Datastore = require('nedb');

const db = new Datastore({ inMemoryOnly: true });




const authClient = new AuthService();

module.exports = {
  init (app) {
    // middlewares.session() is used to get the user info from the session, see more: https://www.arcblock.io/docs/blocklet-developer/blocklet-sdk#session
    app.get('/api/user', middlewares.session(), async (req, res) => {
      if (!req.user) {
        res.json({ user: null });
        return;
      }
      try {
        // get user info from auth service
        const { user } = await authClient.getUser(req.user.did);
        user.role = user.role || req.user.role;
        res.json({ user });
      } catch (err) {
        console.error(err);
        res.json({ user: null });
      }
    });
    app.get('/api/data', (req, res) => {
      res.json({
        message: 'Hello Blocklet!',
      });
    });

    app.get('/user/sel', (req, res) => {
      db.find({}, (err, docs) => {
        if (err) {
          console.error('Find error:', err);
          return res.status(500).json({ message: 'Find error' });
        }
        res.json({
          status: '200',
          message: docs,
        });
      });
    });

    app.post('/user/edit', (req, res) => {
      db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ message: 'Insert error' }); // 返回错误响应
        }
        db.insert(req.body.userInfo, (err, newDoc) => {
          if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ message: 'Insert error' }); // 返回错误响应
          }
          db.find({}, (err, docs) => {
            console.log('Current documents:', docs);
          });
          // 成功插入后返回成功响应
          res.json({
            status: '200',
            message: newDoc,
          });
        });

      });
    });



  },
};
