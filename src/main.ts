import { IExceptionFilter } from './errors/exception.filter.interface';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from "./logger/logger.service";
import { App } from "./app";
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  app.init();
  return { appContainer, app }; 
}

export const { app, appContainer } = bootstrap();
