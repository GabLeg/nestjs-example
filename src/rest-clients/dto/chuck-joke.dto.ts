export interface ChuckJokeDto {
    type: string;
    value: ChuckJokeValueDto;
}

interface ChuckJokeValueDto {
    id: number;
    joke: string;
}
