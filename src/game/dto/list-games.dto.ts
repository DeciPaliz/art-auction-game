import { IsBoolean, IsOptional } from 'class-validator';

export class ListGamesDto {
  @IsBoolean()
  @IsOptional()
  noPassword: boolean;

  @IsBoolean()
  @IsOptional()
  started: boolean;

  @IsBoolean()
  @IsOptional()
  unavailable: boolean;
}
