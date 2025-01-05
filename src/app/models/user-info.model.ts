export interface UserInfo {
    name: string;        // Nome do utilizador
    email: string;       // Email do utilizador
    id: string;          // ID único do utilizador
    roles: string[];     // Lista de papéis atribuídos ao utilizador
    token: string;       // Token JWT do utilizador
  }
  