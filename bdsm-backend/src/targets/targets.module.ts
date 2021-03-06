import { Module } from '@nestjs/common';
import { TargetsController } from './targets.controller';
import { TargetsService } from './targets.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Targets} from "./entities/targets.entity";
import {Groups} from "../groups/entities/groups.entity";
import {MailerModule} from "../mailer/mailer.module";

@Module({
  imports: [TypeOrmModule.forFeature([Targets,Groups]),MailerModule],
  controllers: [TargetsController],
  providers: [TargetsService],
  exports: [TargetsService]
})
export class TargetsModule {}
