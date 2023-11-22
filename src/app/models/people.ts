export class People {
  peopleId: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string; // Ten cuidado al manejar contraseñas en el cliente
  gender: string;
  status: string;
  txDate: Date;

  constructor(peopleId: number, firstname: string, lastname: string, age: number, email: string, password: string, gender: string, status: string, txDate: Date) {
      this.peopleId = peopleId;
      this.firstname = firstname;
      this.lastname = lastname;
      this.age = age;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this.status = status;
      this.txDate = txDate;
  }
}
