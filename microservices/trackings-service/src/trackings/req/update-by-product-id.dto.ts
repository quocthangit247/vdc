export interface ActionDto {
  searching: number;
  filtering: number;
  viewing: number;
}

export interface UpdateByProductIdReqDto {
  actions: ActionDto;
  actionTime: string;
}
