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
It is possible to check all API methods with [Postman](https://www.postman.com)

## Checking
1. **POST** ![](images/postman.PNG)
2. **PUT** ![](images/postman2.PNG)
3. **DELETE** ![](images/postman3.PNG)

# 2. CI/CD
Configure and apply CI/CD pipeline 
## GitHub Actions
- Continuous Integration has been setup with **GitHub Actions**\
It was necessary to create the workflow into [Github-Actions](https://github.com/GAidaraliev/DevOps-project/actions) which deploys and tests our web-app. The code of the workflow `nodejs.yml` is presented [here](https://github.com/GAidaraliev/DevOps-project/tree/main/.github/workflows) 

## The result of test
![](images/github.PNG)

## Azure
- Continuous Deployment has been setup with Microsoft Azure\
I deployed the NodeJS application with Azure Application Services by following these [instructions](https://github.com/adaltas/dsti-devops-2023-spring/blob/main/modules/04.ci-cd/azure-webapp/webapp-tuto.md)

## The result of Azure deployment
![](images/cicd.PNG)

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

## The result of code execution
![](images/ansible.PNG)

# 4. Docker image of the application

* Navigate to the `../DEVOPS-PROJECT/user-api` directory and run the command
````
docker build -t devops-project-webservice .
````
The image will be created using a [Dockerfile](https://github.com/GAidaraliev/DevOps-project/blob/main/user-api/Dockerfile)

* Check if your Docker container appears in the local Docker images

## Checking
![](images/docker.PNG)

> However, it must be said that it is impossible to push the image to Docker Hub for my region but **I totally understand how to do it.**

## Denial of access attempts
![](images/docker2.PNG)

# 5. Container orchestration using Docker Compose

The web-app can be started using [docker-compose.yml](https://github.com/GAidaraliev/DevOps-project/blob/main/docker-compose.yml) file
* Navigate to the `../DEVOPS-PROJECT` directory and run the command
````
docker-compose up
````
## The result of code execution
![](images/docker3.PNG)

* Check the functional correctness by sending a POST request with the following command:
````
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
````
## Checking
![](images/docker4.PNG)

* You can also check the list of running containers using `docker ps` command

# 6. Docker orchestration using Kubernetes
To begin Kubernetes, install [**minikube**](https://kubernetes.io/fr/docs/tasks/tools/install-minikube/). Then start minikube with the command `minikube start`

> As I said before I don't have access to Docker Hub that's why I use my local docker images with minikube. 
**I used the method which provides a straightforward approach to push local docker images seamlessly into Minikube's in-cluster docker daemon**

## Instructions
**Step 1:** Setting up the shell environmental variables
````
eval $(minikube docker-env)
````
**Step 2:** Building the docker image locally
````
docker build -t devops-project-webservice .
````
**Step 3:** Switch back to the local docker daemon
````
eval $(minikube docker-env -u)
````

## Deploy an app using Persistent Volume and Persistent Volume Claim
* Navigate to the `../DEVOPS-PROJECT/k8s` directory and run the following command
````
kubectl apply -f nodejs-deployment.yaml
kubectl apply -f nodejs-service.yaml
kubectl apply -f redis-deployment-pvc.yaml
kubectl apply -f redis-service.yaml
kubectl apply -f pvc.yaml
kubectl apply -f pv.yaml
````
* Connect dashboard to track the status of processes
````
minikube dashboard
````
### Dashboard
![](images/minikube.PNG)

* Open nodejs-service in default browser
````
minikube service nodejs-service
````
### URL of web-service
![](images/minikube2.PNG)

* Check the functional correctness by sending a POST request with the following command:

> `localhost:3000` should be replaced with the aforecited URL
````
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
````

# 7. Service mesh using Istio
## Before starting
- Start a Kubernetes cluster
````
- minikube config set vm-driver virtualbox
- minikube start --memory=16384 --cpus=4 --kubernetes-version=v1.26.0 --no-vtx-check
````
- [Download and install Istio](https://istio.io/latest/docs/setup/getting-started/)

> I must admit that I could not have installed istio due to my region. **I've tried all possible methods but nothing worked.** 
## Denial of installation attempts
![](images/istio1.PNG)

> **However, I totally understood the process how to deploy the application using Istio with https://killercoda.com/** 

## Traffic shifting (Canary rollout)
I'd prefer to not describe the request route process as it repeats almost the same steps for the traffic shifting deployment in my case that is why I will focus on the last one. 

* Enable the istio sidecar injection for the default namespace
````
kubectl label namespace default istio-injection=enabled
````
* Navigate to the `../DEVOPS-PROJECT/istio` directory and install the web-application by running the following commands:

````
kubectl apply -f nodejs-deployment.yaml
kubectl apply -f nodejs-service.yaml
kubectl apply -f redis-deployment.yaml
kubectl apply -f redis-service.yaml
kubectl apply -f gateway.yaml
kubectl apply -f virtual-service.yaml
kubectl apply -f destination-rule.yaml
````
* Access app by port-forwarding to the istio ingressgateway service:
````
kubectl port-forward -n istio-system service/istio-ingressgateway 1234:80
````
* Run the following command to get access
````
curl -s http://localhost:1234/
````
As the result I've divided traffic between two versions of the web-app equally (50/50). Assuming that later version of app will be stable, it is possible to route 100% of the traffic to it in the future.

In addition Kiali dashboard can be installed to visually display the results
````
kubectl apply -f samples/addons
kubectl rollout status deployment/kiali -n istio-system
istioctl dashboard kiali
````

# 8. Monitoring the app with Prometheus and Grafana
> Despite my above-mentioned restriction I was able to run Prometheus and Grafana with Docker Compose.

## Before starting
* It is necessary to install Prometheus client library for Node.js
````
npm install prom-client
````
* Expose prometheus metrics with following code snippet at [index.js](https://github.com/GAidaraliev/DevOps-project/blob/main/user-api/src/index.js) file
## Code snippet
![](images/prom.PNG)

## Prometheus and Grafana
* Step 1: Create the Compose file
  - In this step, I've completed a [docker-compose.yml](https://github.com/GAidaraliev/DevOps-project/blob/main/docker-compose.yml) file with `prometheus` and `grafana` services
* Step 2: Create the Prometheus configuration file
  - In this step, I've configured [`/monitoring/prometheus.yml`](https://github.com/GAidaraliev/DevOps-project/blob/main/monitoring/prometheus.yml) to scrape the web application status.
* Step 3: Create the Grafana configuration files
  - In this step, I've created ['/monitoring/grafana_config.ini'](https://github.com/GAidaraliev/DevOps-project/blob/main/monitoring/grafana_config.ini) file and copied into it the content from [public grafana github](https://github.com/grafana/grafana/blob/master/conf/defaults.ini). Besides, I've created a configuration file called ['/monitoring/grafana_datasources.yml'](https://github.com/GAidaraliev/DevOps-project/blob/main/monitoring/grafana_datasources.yml). This configuration file specifies Prometheus as a datasource for Grafana.
* Step 4: Start the `prometheus` and `grafana` using the `docker-compose` command
````
docker-compose up
````
## Prometheus screenshots
![](images/prom2.PNG)
---
![](images/prom3.PNG)

## Grafana screenshots
![](images/grafana.PNG)
---

# List of all tasks and bonuses

| Subject                                                         |   Code    |   Grade   |
|:----------------------------------------------------------------|:---------:|:---------:|
| Enriched web application with automated tests                   |   APP     |    1/1    |
| Continuous Integration and Continuous Delivery (and Deployment) |   CICD    |    3/3    |
| Containerisation with Docker                                    |   D       |    1/1    |
| Orchestration with Docker Compose                               |   DC      |    2/2    |
| Orchestration with Kubernetes	                                  |   KUB     |    3/3    |
| Service mesh using Istio                                        |   IST     |    2/2    |
| Infrastructure as code using Ansible                            |   IAC     |    3/3    |
| Monitoring                                                      |   MON     |  1.5/2    |
| Accurate project documentation in README.md file                |   DOC     |    3/3    |
| TOTAL GRADE                                                     |   TG      |  19.5/20  |
| Bonus task: different API methods                               |   BNS     |     +1    |
| Bonus task: different unit/functional/integration tests         |   BNS     |     +1    |
| TOTAL GRADE                                                     |   TG      |  21.5/20  |

