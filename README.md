# DevOps project 
**The main objectives of this project:**
- Create a web application
- Apply CI/CD pipeline
- Configure and provision a virtual environment and run your application using the IaC approach
- Build Docker image of your application
- Make container orchestration using Docker Compose
- Make docker orchestration using Kubernetes
- Make a service mesh using Istio
- Implement Monitoring to your containerized application

## Prerequisites for DevOps project

Install the following software:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Docker](https://docs.docker.com/get-docker/)

**Before starting**
To clone the repository:
`git clone https://github.com/GAidaraliev/DevOps-project.git`

# 1. Web application
**Before starting**
1. Install Redis database:

- **Windows:** https://redislabs.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/
- **MacOS:** `brew install redis` or https://redis.io/topics/quickstart
- **Linux or MacOS:** https://redis.io/topics/quickstart

2. After installation starts Redis server:

- **Windows:** double click on `redis-server.exe` file (keep it open)
- **MacOS and Linux:** `redis-server`

3. Test if the Redis server is running:

- **Windows:** double click on `redis-cli.exe` and run the `ping` command inside this terminal
- **MacOS and Linux:** run in a new terminal window `redis-cli ping` (should answer with "PONG")

**Next steps**

- Install application at the `../DEVOPS-PROJECT/user-api` directory (where `package.json` file is located)
```
npm install
```
- Run tests:
```
npm test
```
I enriched the given NodeJS web-app with CRUD user functionality and covered it with tests of different levels 
---
![](images/test.PNG)

- Start application:
```
npm start
```
It is possible to check all CRUD functionalities with [Postman](https://www.postman.com)

1. POST ![POST](images/postman.PNG)
2. PUT ![PUT](images/postman2.PNG)
3. DELETE ![DELETE](images/postman3.PNG)
