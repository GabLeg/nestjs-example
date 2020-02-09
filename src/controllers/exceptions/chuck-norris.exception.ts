import { HttpException, HttpStatus } from "@nestjs/common";

export class ChuckNorrisException extends HttpException {
    constructor() {
        super("Chuck Norris stopped us !", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
