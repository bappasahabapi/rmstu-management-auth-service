import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicFacultyFilterableFields } from "./academicFaculty.constants";
import { IAcademicFaculty, IAcademicFacultyFilters } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createFaculty = async (payload: IAcademicFaculty): Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.create(payload);
    return result;
};

const gellAllFaculties = async (
    filters: IAcademicFacultyFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {

    const { searchTerm, ...filtersData } = filters;

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];

    //handle the searchTerm part
    if (searchTerm) {
        andConditions.push({
            $or: academicFacultyFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    //handle filters data 
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    //handle sort condition 
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    };

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result =await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

    const total =await AcademicFaculty.countDocuments();

    return{
        meta:{
            page,
            limit,
            total,
        },
        data: result
    }


};

const getSingleFaculty=async(id:string) : Promise<IAcademicFaculty | null> =>{

    const result =await AcademicFaculty.findById(id);
    return result;
};
const updateFaculty=async(id:string,payload:Partial<IAcademicFaculty>) : Promise<IAcademicFaculty | null> =>{

    const result =await AcademicFaculty.findOneAndUpdate({_id:id},payload,{new:true});
    return result;
};

const deleteFaculty=async(id:string) : Promise<IAcademicFaculty | null> =>{

    const result =await AcademicFaculty.findByIdAndDelete(id);
    return result;
};





export const AcademicFacultyService = {
    createFaculty,
    gellAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
    
}