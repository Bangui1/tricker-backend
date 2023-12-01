import { Injectable } from '@nestjs/common';
import { LinearClient } from '@linear/sdk';
import { ConfigService } from '@nestjs/config';
import { IssueDto } from './dto';

@Injectable()
export class LinearService {
  private readonly linearClient: LinearClient;
  constructor(private readonly config: ConfigService) {
    this.linearClient = new LinearClient({
      apiKey: config.get('LINEAR_API_KEY'),
    });
  }
  async getProjects() {
    const project = await this.linearClient.projects();
    return project.nodes;
  }

  async getIssues(): Promise<IssueDto[]> {
    const issue = await this.linearClient.issues();
    const issues = issue.nodes.map(async (issue) => {
      return IssueDto.fromIssue(issue);
    });
    return Promise.all(issues);
  }
}
