import { Schema, model } from "mongoose";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.interface";
import { AcademicFacultyModel, IAcademicFaculty } from "./academicFaculty.interface";


const AcademicFacultySchema =new Schema<IAcademicFaculty,AcademicSemesterModel>(
{
  title:{
    type:String,
    required:true,
    unique:true
  },
},
  {
    timestamps:true,
    toJSON:{
        virtuals:true
    }
  },
);



export const AcademicFaculty=model<IAcademicFaculty,AcademicFacultyModel>(
    'AcademicFaculty',
    AcademicFacultySchema
);