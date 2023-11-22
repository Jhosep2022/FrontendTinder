export class NewUser {
  occupationId: number;
  wantId: number;
  preferencesId: number;
  description: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  file: File;  // File es una clase nativa de JavaScript/TypeScript para manejar archivos

  constructor(occupationId: number, wantId: number, preferencesId: number, description: string, firstname: string, lastname: string, nickname: string, email: string, password: string, gender: string, age: number, file: File) {
      this.occupationId = occupationId;
      this.wantId = wantId;
      this.preferencesId = preferencesId;
      this.description = description;
      this.firstname = firstname;
      this.lastname = lastname;
      this.nickname = nickname;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this.age = age;
      this.file = file;
  }
}
