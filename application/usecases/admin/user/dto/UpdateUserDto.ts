type UUID = string;

export interface UpdateUserDto {
  id: UUID;
  nickname: string;
  email: string;
  deleteDate: Date;
  admin: boolean;
  profileImg: string;
  createAt: Date;
}
