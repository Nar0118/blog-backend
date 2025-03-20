import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const allowCrossDomain = function allowCrossDomain(req, res, next) {
    console.log('>>>>>>>>>>');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-DAOMAKER, GOOGAPPUID, X-HACKERS, X-Parse-Master-Key, X-Parse-REST-API-Key, X-Parse-Javascript-Key, X-Parse-Application-Id, X-Parse-Client-Version, X-Parse-Session-Token, X-Requested-With, X-Parse-Revocable-Session, Content-Type, Cache-control, csrf-token, user-agent');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    if ('OPTIONS' == req.method) { // intercept OPTIONS method
      res.sendStatus(200);
    } else {
      next();
    }
  };
  
  app.use(
    allowCrossDomain
  );

// Use the routes
app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
