[ANGULAR_BADGE]: https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white
[TYPESCRIPT_BADGE]: https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white
[PRIMENG_BADGE]: https://img.shields.io/badge/PrimeNG-2266B3?style=for-the-badge&logo=primeng&logoColor=white
[SASS_BADGE]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white

[English](#english) | [Português](#portugues)

# <a name="english"></a>Angular Inventory Management UI 💻

Frontend application for the [Inventory Management System API](https://github.com/snportela/spring_boot__inventory_management), built with Angular, TypeScript, and PrimeNG.

Authors: 
Kayke Lavieri Leite,

Rafael de Melo Santiago,

Shams Ameer Ali Ali Aumraan,

Sophia Nobre Portela

## 💻 Technologies

![ANGULAR_BADGE] ![TYPESCRIPT_BADGE] ![PRIMENG_BADGE] ![SASS_BADGE]

## Requirements

-   Node.js 
-   Angular CLI (`v20.3.0` or compatible)
-   A running instance of the [Inventory Management System API](https://github.com/snportela/spring_boot__inventory_management).

## ⚙️ Features

-   **Modular Layouts:** Separate layouts for authentication (`/login`) and the main application (`/dashboard`).
-   **JWT Authentication:** Full login, logout, and token management using `sessionStorage`.
-   **Password Reset Flow:** Complete flow for users to request a password reset email and set a new password via a tokenized link.
-   **HTTP Token Interceptor:** Automatically attaches the JWT `Authorization: Bearer ...` token to all API requests and handles 401/403 unauthorized errors by redirecting to login.
-   **Role-Based Access Control (RBAC):** Frontend route guards (`authGuard`) restrict access to admin-only pages (like User Management).
-   **Full CRUD Functionality:** Components and services for complete management of:
    -   Resources (Inventory)
    -   Loans
    -   Receipts
    -   Categories
    -   Areas
    -   Users (Admin only)
-   **Rich UI with PrimeNG:** Utilizes a wide range of PrimeNG components for a professional UI, including paginated data tables, filters, modals (ConfirmDialog), toasts, and form controls.
-   **Responsive Design:** Features a responsive sidebar that collapses and toggles on mobile devices.
-   **Custom Pipes:** Uses custom Angular pipes to format and translate data, such as `loanStatus` and `resourceStatus`, for better readability.
-   **Environment Configuration:** Uses environment files (`environment.ts`) to easily switch between local development and production API URLs.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/snportela/angular_inventory_management
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure API Endpoint:**
  -   Open the file `src/app/environments/environment.development.ts`.
  -   Ensure the `API_URL` and `AUTH_URL` properties point to your running **backend API**.
  -   For local development (with the backend running on port 8080):
      ```typescript
      export const environment = {
        API_URL: 'http://localhost:8080/api',
        AUTH_URL: 'http://localhost:8080/auth'
      };
      ```

4.  **Run the development server:**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

# <a name="portugues"></a>UI de Gerenciamento de Inventário com Angular 💻

Aplicação frontend para a [API de Sistema de Gerenciamento de Inventário](https://github.com/snportela/spring_boot__inventory_management), construída com Angular, TypeScript e PrimeNG.

## 💻 Tecnologias

![ANGULAR_BADGE] ![TYPESCRIPT_BADGE] ![PRIMENG_BADGE] ![SASS_BADGE]

## Requisitos

-   Node.js 
-   Angular CLI (`v20.3.0` ou compatível)
-   Uma instância da [API de Gerenciamento de Inventário](https://github.com/snportela/spring_boot__inventory_management) em execução.

## ⚙️ Funcionalidades

-   **Layouts Modulares:** Layouts separados para autenticação (`/login`) e para a aplicação principal (`/dashboard`).
-   **Autenticação JWT:** Gerenciamento completo de login, logout e token usando `sessionStorage`.
-   **Fluxo de Redefinição de Senha:** Fluxo completo para usuários solicitarem um e-mail de redefinição de senha e definirem uma nova senha por meio de um link com token.
-   **Interceptor HTTP de Token:** Anexa automaticamente o token JWT (`Authorization: Bearer ...`) a todas as requisições à API e lida com erros 401/403 (não autorizado), redirecionando para o login.
-   **Controle de Acesso (RBAC):** Guardas de rota (`authGuard`) no frontend restringem o acesso a páginas exclusivas de administradores (como Gerenciamento de Usuários).
-   **Funcionalidade CRUD Completa:** Componentes e serviços para o gerenciamento completo de:
    -   Recursos (Inventário)
    -   Empréstimos
    -   Notas Fiscais
    -   Categorias
    -   Áreas
    -   Usuários (Apenas Admin)
-   **UI com PrimeNG:** Utiliza uma vasta gama de componentes PrimeNG para uma interface profissional, incluindo tabelas paginadas, filtros, modais (ConfirmDialog), toasts e controles de formulário.
-   **Design Responsivo:** Possui uma barra de navegação lateral (sidebar) responsiva que se recolhe e alterna em dispositivos móveis.
-   **Pipes Customizados:** Usa pipes customizados do Angular para formatar e traduzir dados, como `loanStatus` e `resourceStatus`, para melhor legibilidade.
-   **Configuração por Ambiente:** Utiliza arquivos de ambiente (`environment.ts`) para alternar facilmente entre URLs da API de desenvolvimento local e produção.

## 🚀 Iniciando

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/snportela/angular_inventory_management](https://github.com/snportela/angular_inventory_management)
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure o Endpoint da API:**
  -   Abra o arquivo `src/app/environments/environment.development.ts`.
  -   Garanta que as propriedades `API_URL` e `AUTH_URL` apontem para sua **API backend** em execução.
  -   Para desenvolvimento local (com o backend rodando na porta 8080):
      ```typescript
      export const environment = {
        API_URL: 'http://localhost:8080/api',
        AUTH_URL: 'http://localhost:8080/auth'
      };
      ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
    Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer arquivo de origem.

## Build

Execute `ng build` para construir o projeto. Os artefatos da build serão armazenados no diretório `dist/`.
