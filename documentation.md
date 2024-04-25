# Documentazione del Progetto

## 1. Struttura dell'Applicazione

### Cartelle Principali:
- **features**: Contiene le pagine principali dell'applicazione, come la home e il login.
- **components**: Contiene i componenti riutilizzabili, inclusi quelli per la modifica e l'eliminazione, implementati nella home. Il componente home gestisce anche l'aggiunta di un nuovo utente tramite un form.
- **guards**: Contiene `auth.guard`, una guardia di navigazione che verifica lo stato di autenticazione per consentire l'accesso a rotte specifiche solo se l'utente è autenticato.
- **services**: Contiene il servizio `auth`, responsabile della gestione dell'autenticazione. Utilizza il database per verificare le credenziali e JSONPlaceholder per le chiamate API.

## 2. Autenticazione con NgRx

### Servizio Auth:
Gestisce l'autenticazione e utilizza NgRx per la gestione dello stato dell'autenticazione.

### Cartella `state/auth`:
Contiene tre file:
- `auth.actions`: Definisce le azioni relative all'autenticazione, come il login e il logout.
- `auth.effects`: Gestisce gli effetti collaterali delle azioni di autenticazione, come le chiamate API.
- `auth.reducer`: Definisce il riduttore per l'autenticazione, che modifica lo stato in base alle azioni.

### File di Configurazione del Routing:
Contiene configurazioni delle rotte, inclusa l'uso di `canActivate` per proteggere le rotte riservate.

## 3. Database

### Cartella `assets`:
Contiene il database con le credenziali degli utenti.

## Componenti Principali

### Componente Home:
- **Descrizione**: Rappresenta la pagina principale dell'applicazione. Gestisce l'aggiunta di nuovi utenti tramite un form e visualizza i componenti per la modifica e l'eliminazione degli utenti.
- **Proprietà**: Nessuna proprietà specifica.
- **Metodi**:
  - `addUser(userData: any)`: Metodo chiamato al momento della sottomissione del form di aggiunta utente. Aggiunge un nuovo utente utilizzando i dati forniti.

### Componente Edit:
- **Descrizione**: Componente riutilizzabile per modificare le informazioni di un utente.
- **Proprietà**:
  - `@Input() userData: UserModel`: Dati dell'utente da modificare.

### Componente Delete:
- **Descrizione**: Componente riutilizzabile per eliminare un utente.
- **Proprietà**:
  - `@Input() userId: number`: ID dell'utente da eliminare.

## Direttiva AuthGuard

### Descrizione:
Guardia di navigazione che controlla se l'utente è autenticato prima di consentire l'accesso a determinate rotte dell'applicazione.

### Metodi:
- `canActivate()`: Determina se un utente può attivare una determinata route. Restituisce true se l'utente è autenticato e può accedere alla route, altrimenti reindirizza alla pagina di login.

## Servizi Principali

### Servizio Auth

#### Scopo:
Gestisce l'autenticazione degli utenti nell'applicazione.

#### Responsabilità:
- Verifica le credenziali degli utenti rispetto ai dati presenti nel database.
- Utilizza JSONPlaceholder per le chiamate API relative all'autenticazione.
- Utilizza NgRx per la gestione dello stato dell'autenticazione.

#### Utilizzo:
- Verifica le credenziali dell'utente tramite il metodo `login(username: string, password: string)`.
- Utilizza NgRx per aggiornare lo stato dell'autenticazione dopo il login o il logout.
- Gestisce le chiamate API relative all'autenticazione tramite JSONPlaceholder.

### Servizio JSONPlaceholder

#### Scopo:
Gestisce le chiamate API verso il servizio JSONPlaceholder per ottenere e modificare i dati degli utenti.

#### Responsabilità:
- Effettua chiamate API per ottenere, aggiornare, eliminare e creare dati relativi agli utenti.
- Gestisce le interazioni con il backend utilizzando il servizio JSONPlaceholder.

#### Utilizzo:
- Effettua chiamate API per ottenere dati relativi agli utenti, come il recupero dell'elenco degli utenti o delle informazioni di un singolo utente.
- Aggiorna i dati degli utenti tramite chiamate API quando vengono apportate modifiche, come la modifica o l'eliminazione di un utente.

### Configurazione delle Rotte

#### File: `app-routing.module.ts`
- **Scopo**: Definire le rotte dell'applicazione e specificare quali componenti devono essere caricati quando l'URL corrisponde a una determinata route.
- **Responsabilità**: Gestire la navigazione tra le diverse pagine dell'applicazione e applicare eventuali restrizioni di accesso basate sull'autenticazione degli utenti.
- **Utilizzo**: Questo file viene importato nel modulo principale dell'applicazione per configurare le rotte.

