import { Issue, User } from '@linear/sdk';

export class IssueDto {
  id: string;
  title: string;
  description: string;
  priority: number;
  state: string;
  assignee: User;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: string,
    title: string,
    description: string,
    priority: number,
    state: string,
    assignee: User,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.state = state;
    this.assignee = assignee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static async fromIssue(data: Issue): Promise<IssueDto> {
    return new IssueDto(
      data.id,
      data.title,
      data.description,
      data.priority,
      await this.getState(data),
      await data.assignee,
      data.createdAt,
      data.updatedAt,
    );
  }
  static async getState(data: Issue): Promise<string> {
    const state = await data.state;
    return state.name;
  }
}
