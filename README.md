![Instagram post - 5.png](https://res.craft.do/user/full/23a03a79-af5e-1af9-b4ff-27170389b6b1/doc/2F13C73C-1E0C-4706-861A-5A13C4FE7D09/E54DAE8C-8495-4F15-8B33-202AEC73BA78_2/uxhC3Wxv5SycyqhKt5cIzkTvEORHf7R97sYhPQRE63Ez/Instagram%20post%20-%205.png)

### Goals

- Improve accessibility to course information
- Learn from others and build a resume booster

### Future Plans

- Visualize instructor rankings for easier course planning...
  [GitHub - AndreasInk/isqplot: Human-friendly visualizations for course evaluation datasets](https://github.com/AndreasInk/isqplot)
- Contributors page
- Open to any further ideas :)

### Contributing

1. Check for issues or ask in the CS Royales discord for any issues
2. Fork the repo
3. Open a PR when ready (we prefer smaller PRs)
4. Make any changes a reviewer suggests

### Setup

This project is set up using yarn workspaces. The Vercel/Next.js frontend code lives in the `client` workspace, while the Firebase Cloud Functions lives in the `pipeline` workspace. Both require different environments to be set up for local development.

1. Install yarn globally with your preferred package manager (brew or nvm).
2. Run the command `yarn` in the root of the project
   - Yarn will respect the yarn version defined in `.yarnrc.yml`
   - TODO: Migrate to Corepack

#### Developing the frontend

1. Request an `.env.local` from Roth or Andreas and place it in the client folder
2. Run `yarn run client:dev` to start localhost

#### Developing the backend

1. Install firebase-tools globally with `curl -sL https://firebase.tools | bash`
2. Run `firebase login` and `firebase use --add` to set up the default project
   - Request access to the `syllabank-dev` Google Cloud project from Roth
3. Run `firebase functions:config:get > .runtimeconfig.json` to pull the secrets locally
   - TODO: Migrate to environment variables
4. Run `gcloud config set project syllabank-dev`
5. Run `yarn pipeline:test` to ensure everything has been set up properly!

#### Where the data lives

These are currently 4 cloud data stores being used. Data is ETL'd from BigQuery into Firebase Firestore for instant searches.

- BigQuery for all the historical UNF course data
- Algolia for the intelligent course search
- Firebase Firestore for the course results
- Firebase Cloud Storage for syllabi uploads
  - See: [Uploading Syllabi to Firebase Cloud Storage](https://github.com/openswoop/syllabank/wiki/Uploading-Syllabi-to-Firebase-Cloud-Storage)

![Sy.png](https://res.craft.do/user/full/23a03a79-af5e-1af9-b4ff-27170389b6b1/doc/2F13C73C-1E0C-4706-861A-5A13C4FE7D09/401372BD-2781-4933-B2E2-D53D491595C9_2/KRxMX9QjWJk29YksUr9NitJ3QAOuTMIIOLx4sxyNwXwz/Sy.png)
