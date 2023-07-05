import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { generateFacultyId } from './app/modules/user/user.utils';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [{
            path: req.originalUrl,
            // path: '.',
            message: 'API is not found'
        }]
    });
    next();
});

//testing
// const academicSemester = {
//     code: '01',
//     year: '2025'
// };

// const testId = async () => {
//     // const testStudentId = await generateStudentId(academicSemester);
//     // console.log(testStudentId);
//     const testFacultyId = await generateFacultyId();
//     console.log(testFacultyId);
// }

// testId()


export default app;
