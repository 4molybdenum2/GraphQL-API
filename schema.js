const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = require('graphql');
const axios = require('axios');

const Repos = new GraphQLObjectType({
    name: 'Repos',
    fields: ()=>({
        id : {type: GraphQLInt},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Repos: {
            type: new GraphQLList(Repos),
            resolve(parent,args){
                return axios.get('https://api.github.com/users/4molybdenum2/repos')
                .then(res => res.data);
            }
        },

        Repo: {
            type: Repos,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent,args){
                return axios.get(`https://api.github.com/repos/4molybdenum2/${args.name}`)
                .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});