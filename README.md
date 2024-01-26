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

## Testing
![](images/test.PNG)

- Start application:
```
npm start
```
It is possible to check all CRUD functionalities with [Postman](https://www.postman.com)

## Checking
1. **POST** ![](images/postman.PNG)
2. **PUT** ![](images/postman2.PNG)
3. **DELETE** ![](images/postman3.PNG)

# 2. CI/CD
Configure and apply CI/CD pipeline 
## GitHub Actions
- Continuous Integration has been setup with **GitHub Actions**
It was necessary to create the workflow into [Github-Actions](https://github.com/GAidaraliev/DevOps-project/actions) which deploys and tests our web-app. The code of the workflow `nodejs.yml` is presented [here](https://github.com/GAidaraliev/DevOps-project/tree/main/.github/workflows) 

## The result of test
![](images/github.PNG)

## Azure
- Continuous Deployment has been setup with Microsoft Azure

## The result of Azure deployment

# 3. Infrastructure as Code
**Before starting**
1. Install Vagrant: - https://www.vagrantup.com/downloads.html.

**Next steps**
Run the command
````
vagrant up
````
It will initialize the VM using Vagrant configuration [file](https://github.com/GAidaraliev/DevOps-project/blob/main/iac/Vagrantfile)

## VirtualBox
![](images/vagrant.PNG)

After that using Ansible [playbooks](https://github.com/GAidaraliev/DevOps-project/tree/main/iac/playbooks) we provision the VM with tools that allows us to deploy the web-app and check its functionality.

## Results of code exectution
![](images/ansible.PNG)

