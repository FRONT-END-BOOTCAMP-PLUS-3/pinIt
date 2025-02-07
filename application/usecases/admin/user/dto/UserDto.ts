type UUID = string;

export interface UserDto {
  id: UUID;
  nickname: string;
  email: string;
  deleteDate: Date | null;
  admin: boolean | string;
  profileImg: string;
  createAt: Date;
}
