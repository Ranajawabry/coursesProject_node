import connectDB from '../Db/connectionDB.js';
import AuthRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import courseRouter from './modules/course/course.router.js'
import superviserRouter from './modules/superviser/superviser.router.js'
import offerRouter from './modules/offer/offer.router.js'
import { globalErrorHandel } from './services/errorHandling.js';
import cors from 'cors' ;

const initApp = (express,app)=>{
    
    var whitelist = ['http://127.0.0.1:5500', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
    app.use(cors())
    app.use(express.json());
    app.get('/', (req, res) => res.json('Hello World!'))
    app.use('/auth', AuthRouter)
    app.use('/user', userRouter)
    app.use('/course', courseRouter)
    app.use('/superviser', superviserRouter)
    app.use('/offer', offerRouter)


    app.use('*',(req,res)=>{
        return res.json("page not found")
    })
    
    app.use(globalErrorHandel)    // globalError
}
export default initApp;