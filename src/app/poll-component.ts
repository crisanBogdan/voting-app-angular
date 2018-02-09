import { PollsService } from './polls.service';


export abstract class PollComponent {
  private polls: any[] = [];
  private errMessage: string; 
  private pollsToGet: number = 10;
  

  constructor(
    private pollsService: PollsService
  ) { }
  

  abstract getPolls(startIndex: number, endIndex: number): void;

  loadMore(): void {
    const startIndex = (this.Polls.length ? this.Polls.length : 0);
    const endIndex = (this.Polls.length ? this.Polls.length + this.pollsToGet : this.pollsToGet);

    this.getPolls(startIndex, endIndex);
  }

  handleResults(results: any): void {
    if (results.error) {
      this.ErrMessage = 'There was a problem fetching the polls.';
      return;
    }

    this.errMessage = '';
    this.Polls = this.Polls.concat(results);    
  }
  
  get Polls(): any[] {
    return this.polls;
  }

  get ErrMessage(): string {
    return this.errMessage;
  }

  get PollsService(): PollsService {
    return this.pollsService;
  }

  set Polls(newPolls: any[]) {
    this.polls = newPolls;
  }

  set ErrMessage(newMessage: string) {
    this.errMessage = newMessage;
  }
}
