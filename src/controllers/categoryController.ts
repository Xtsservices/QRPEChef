
import { Request, Response } from 'express';
import { Category } from '../models';
import logger from '../common/logger';
import { statusCodes } from '../common/statusCodes';
import { getMessage } from '../common/utils';

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.body) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'Request body is required',
      });
    }
    const { name, description } = req.body;

    
    if (!name) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'Category name is required',
      });
    }
    // Check if category already exists
    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'Category already exists',
      });
    }
    const category = await Category.create({ name, description, status: 'active' });
    return res.status(statusCodes.SUCCESS).json({
      message: 'Category created successfully',
      data: category,
    });
  } catch (error: unknown) {
    logger.error(`Error creating category: ${error instanceof Error ? error.message : error}`);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: getMessage('error.internalServerError'),
    });
  }
};

export const getAllCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.findAll({ where: { status: 'active' } });
    
    if (!categories || categories.length === 0) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'No categories found',
        data: [],
      });
    }

    return res.status(statusCodes.SUCCESS).json({
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error: unknown) {
    logger.error(`Error fetching categories: ${error instanceof Error ? error.message : error}`);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: getMessage('error.internalServerError'),
    });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'Category id is required',
      });
    }
    const category = await Category.findByPk(id);
    if (!category) {
        return res.status(statusCodes.NOT_FOUND).json({
            message: 'Category not found',
        });
    }
    if (category.status === 'inactive') {
        return res.status(statusCodes.BAD_REQUEST).json({
            message: 'Category is already deleted',
        });
    }
    await category.update({ status: 'inactive' });
    return res.status(statusCodes.SUCCESS).json({
      message: 'Category deleted successfully',
    });
  } catch (error: unknown) {
    logger.error(`Error deleting category: ${error instanceof Error ? error.message : error}`);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: getMessage('error.internalServerError'),
    });
  }
};


