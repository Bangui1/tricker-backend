import { Injectable } from '@nestjs/common';
import { LinearClient } from '@linear/sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinearService {
  private readonly linearClient: LinearClient;
  constructor(private readonly config: ConfigService) {
    this.linearClient = new LinearClient({
      apiKey: config.get('LINEAR_API_KEY'),
    });
  }
}
