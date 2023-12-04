docker run `
        --name mongodb `
        -p 27017:27017 `
        -e MONGO_INITDB_ROOT_USERNAME=admin `
        -e  MONGO_INITDB_ROOT_PASSWORD=admin123 `
        -d `
        mongo:7

docker run `
        --name mongoclient `
        -p 3000:3000 `
        --link mongodb:mongodb `
        -d `
        mongoclient/mongoclient

docker exec -it mongodb `
    mongosh --host localhost -u admin -p admin123 --authenticationDatabase admin `
    --eval "db.getSiblingDB('pokemons').createUser({user: 'thais', pwd: 'thais123', roles: [{role: 'readWrite', db: 'pokemons'}]})"