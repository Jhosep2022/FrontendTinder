export interface NewUser {
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
}
