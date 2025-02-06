type UUID = string;

export interface UserDto {
  id: UUID | null;
  nickname: string;
  email: string;
  deleteDate: Date | null;
  admin: boolean | null;
  profileImg: string;
  createAt: Date | null;
}
