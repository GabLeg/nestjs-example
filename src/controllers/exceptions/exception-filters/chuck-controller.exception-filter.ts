import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ChuckNorrisException } from "../chuck-norris.exception";

@Catch(ChuckNorrisException)
export class ChuckControllerExceptionFilter implements  ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status: number;
        let body: string;
        if (exception instanceof ChuckNorrisException) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            body = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            reason: body,
            path: request.url,
        });
    }
}
