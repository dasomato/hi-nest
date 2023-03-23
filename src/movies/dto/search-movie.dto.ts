import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchMovie {
  @IsOptional()
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  title: string;
}