import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.development' }), AuthModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
