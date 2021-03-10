#!/bin/sh

CONTAINER_FRONTEND='registry.gitlab.com/qsoftvietnam/mcb686-web/frontend:k8'

docker login -u tienlm1509 -p yYd5tRLF6N9ZivYFWeya registry.gitlab.com

docker build --pull -t $CONTAINER_FRONTEND .

docker push $CONTAINER_FRONTEND



