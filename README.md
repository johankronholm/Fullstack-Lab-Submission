# Fullstack-Lab-Submission
This is a simple run tracking application that lets you log your runs and monitor your personal bests.

## Run the app (Git Bash)

Clone the repository to your desired location:

```bash
git clone https://github.com/johankronholm/Fullstack-Lab-Submission
```

Change to project directory:

```bash
cd Fullstack-Lab-Submission
```

Install dependencies once in each project and once at the repository root:

```bash
npm install --prefix Backend
npm install --prefix Frontend
npm install
```

Create a `.env` file in the `/Backend` root directory and add the following variables:
```bash
PORT=3000
DB_URL=<your MongoDB connection string>
```

Start frontend and backend together from the repository root:

```bash
npm start
```

`npm run dev` at the repository root does the same thing.

Access the application in your web browser with the following url: 
```bash
http://localhost:5173
```
