import { Controller, Get } from '@nestjs/common';
import { LinearService } from './linear.service';
import { Project } from '@linear/sdk';
import { IssueDto } from './dto';

@Controller('linear')
export class LinearController {
  constructor(private readonly linearService: LinearService) {}
  @Get('/projects')
  async getProjects(): Promise<Project[]> {
    return await this.linearService.getProjects();
  }
  @Get('/issues')
  async getIssues(): Promise<IssueDto[]> {
    return await this.linearService.getIssues();
  }
}
