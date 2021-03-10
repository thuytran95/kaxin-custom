#!/bin/sh

CONTAINER_FRONTEND='registry.gitlab.com/qsoftvietnam/mcb686-web/frontend:prod'

docker login -u app@mcbooks.vn -p CFACh5yWFAzRTqkndPzc registry.gitlab.com

docker build --pull -t $CONTAINER_FRONTEND .

docker push $CONTAINER_FRONTEND



