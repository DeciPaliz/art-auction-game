import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ConfigService } from 'src/config/config.service';

export class JoinGameDto {
  @IsInt()
  gameId: number;

  @IsOptional()
  @IsString()
  @MaxLength(ConfigService.game.passwordLengthMax)
  @MinLength(ConfigService.game.passwordLengthMin)
  password?: string;
}
