const corsOptions = {
    origin : true,
    methods : 'GET, PUT, POST',
    allowedHeaders : 'Origin, X-Requested-With, Content-Type, Accept, x-app-id, msisdn, Authorization, novum_authorization'
}

module.exports  = {corsOptions}