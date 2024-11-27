import { Module } from '@nestjs/common';
import { PushModule } from './features/push/push.module';

@Module({
  imports: [PushModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
