export class ActionTracking {
  counter: number;
  updatedAt: Date;
  createdAt: Date;
}

export enum Action {
  search = 'searching',
  filter = 'filtering',
  view = 'viewing',
}
