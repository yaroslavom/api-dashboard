import { IUserController } from './users.controller.interface';
import { ILogger } from './../logger/logger.interface';
import { HTTPError } from './../errors/http-error.class';
import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'error authorization'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
