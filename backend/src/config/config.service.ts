import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('port') || 3000;
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('database.url') || '';
  }

  getJwtSecret(): string {
    return this.configService.get<string>('jwt.secret') || 'secret';
  }

  getJwtExpiresIn(): string {
    return this.configService.get<string>('jwt.expiresIn') || '24h';
  }

  getBcryptRounds(): number {
    return this.configService.get<number>('bcrypt.rounds') || 10;
  }
}
