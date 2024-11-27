import { Module } from '@nestjs/common';
import { WorkerModule } from './features/worker/worker.module';

@Module({
  imports: [WorkerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
