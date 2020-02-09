import { ApiProperty } from "@nestjs/swagger";

export class ChuckJoke {
    @ApiProperty()
    joke: string;
}
