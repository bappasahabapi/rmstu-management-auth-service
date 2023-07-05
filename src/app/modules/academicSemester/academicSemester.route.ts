import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './acdemicSemester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);
router.get('/:id',AcademicSemesterController.getSingleSemester);

router.patch('/:id',
validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
AcademicSemesterController.updateSemester);

router.get('/',AcademicSemesterController.gellAllSemesters);
// router.get('/:id',AcademicSemesterController.getSingleSemester) // kaj kore na tai uprey

router.delete('/:id',AcademicSemesterController.deleteSemester)


export const AcademicSemesterRoutes = router;
