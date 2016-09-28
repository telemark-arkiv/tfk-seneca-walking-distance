###########################################################
#
# Dockerfile for tfk-seneca-walking-distance
#
###########################################################

# Setting the base to nodejs 4.6.0
FROM mhart/alpine-node:4.6.0

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV TFK_SENECA_WALKING_DISTANCE_TAG tfk-seneca-walking-distance
ENV TFK_SENECA_WALKING_DISTANCE_URL https://walkingdistance.no
ENV TFK_SENECA_WALKING_DISTANCE_HOST localhost
ENV TFK_SENECA_WALKING_DISTANCE_PORT 8000
ENV TFK_SENECA_WALKING_DISTANCE_API_URI https://api.t-fk.no/distance

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]