# Setup e Avvio dell'Ambiente di Sviluppo per l'Applicazione Angular

## Prerequisiti
- Node.js e npm (Node Package Manager) installati sul tuo sistema.
- Angular CLI (Command Line Interface) installato globalmente. Se non è già installato, puoi installarlo eseguendo il comando:

npm install -g @angular/cli


## Configurazione e Setup

### 1. Clonare il Repository
 - Clona il repository dell'applicazione Angular sul tuo computer.

### 2. Installare le Dipendenze
 - Apri un terminale o una finestra del prompt dei comandi nella directory del progetto.
 - Esegui il comando:
   ```
   npm install
   ```
 Questo installerà tutte le dipendenze definite nel file `package.json`.

### 3. Configurare l'Ambiente
 - Assicurati di configurare correttamente l'URL del servizio JSON Placeholder o del tuo backend nell'applicazione. Puoi fare ciò modificando l'URL nel servizio `AuthService` o in qualsiasi altro servizio che effettua chiamate API.

## Avvio dell'Ambiente di Sviluppo

Una volta completata la configurazione, puoi avviare l'ambiente di sviluppo dell'applicazione Angular utilizzando Angular CLI.

- Esegui il seguente comando nella directory del progetto:

ng serve


Questo avvierà il server di sviluppo Angular e compilerà l'applicazione. Dopo la compilazione, dovresti poter visualizzare l'applicazione nel browser all'indirizzo `http://localhost:4200`.

Ora sei pronto per sviluppare e testare l'applicazione Angular sul tuo ambiente locale!

Se incontri problemi durante la configurazione o l'avvio dell'ambiente di sviluppo, assicurati di seguire attentamente i passaggi sopra descritti e controlla la documentazione ufficiale di Angular per ulteriori informazioni.

