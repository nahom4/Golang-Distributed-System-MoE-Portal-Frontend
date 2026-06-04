# Ministry of Education Portal — Frontend

The ReactJS frontend for the MoE distributed exam-results portal. Students look up their University Entrance Exam results and submit petitions; authorized admins sign in to upload results.

The system behind it — a fault-tolerant Go distributed system with a geo-aware, etcd-coordinated load balancer, RPC auth, and MySQL — lives in **[Golang-Distributed-System-MoE-Portal-Backend](https://github.com/nahom4/Golang-Distributed-System-MoE-Portal-Backend)**.

![MoE portal](docs/screenshots/home.png)

## Tech stack

**ReactJS** · TypeScript

## Running locally

```bash
npm install
npm run dev
```

Point it at a running MoE backend via the configured API URL.
