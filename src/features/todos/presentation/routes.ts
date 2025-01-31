// src\features\todos\presentation\routes.ts

import { Router } from 'express';
import multer from 'multer';
import { TodoDatasourceImpl, TodoRepositoryImpl } from '../infraestructure';
import { TodoController } from './controller';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();
		const storageMulter = multer.memoryStorage();
		const upload = multer({ storage: storageMulter });

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);
		const controller = new TodoController(repository);

		// * Authentication middleware
		const authDatasource = new AuthDatasourceImpl();
		const authRepository = new AuthRepositoryImpl(authDatasource);
		const authMiddleware = new AuthMiddleware(authRepository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', [authMiddleware.validateJWT], controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);
		router.post('/firebase', [upload.single('file')], controller.uploadFileToFirebase);

		// rest of operations
		// ...

		return router;
	}
}
