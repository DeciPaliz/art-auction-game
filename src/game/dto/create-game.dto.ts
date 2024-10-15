import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ConfigService } from 'src/config/config.service';

export class CreateGameDto {
  @Min(ConfigService.game.maxPlayersMin)
  @Max(ConfigService.game.maxPlayersMax)
  @IsInt()
  maxPlayers: number;

  @IsOptional()
  @IsString()
  @MinLength(ConfigService.game.passwordLengthMin)
  @MaxLength(ConfigService.game.passwordLengthMax)
  password?: string;
}
