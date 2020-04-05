'use strict';
 
  const {GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLNonNull, GraphQLInputObjectType} = require(
    'graphql');

 const station = require('../models/station');
 const connection = require('../models/connection');
 const connectionTypeModel = require('../models/connectionType');
 const level = require('../models/level');
 const currentTypeModel = require('../models/currentType');
 const user = require('../models/userModel');
 
 const stationType = new GraphQLObjectType({
   name: 'station',
   description: 'station name and connections',
   fields: () => ({
     id: {type: GraphQLID},
     Title: {type: GraphQLString},
     AddressLine1: {type: GraphQLString},
     Town: {type: GraphQLString},
     StateOrProvince: {type: GraphQLString},
     PostCode: {type: GraphQLString},
     Connections: {
        type: connectionType,
        resolve: async (parent, args) => {
            //console.log(parent)
            try {
            return await connection.findById(parent.Connections);
            } catch (e) {
              return new Error(e.message);
            }
        }
        },
      Location: {type: GraphQLID},
   }),
 });

 const connectionType = new GraphQLObjectType({
  name: 'connection',
  description: 'List of connections in the database',
  fields: () => ({
    id: {type: GraphQLID},
    ConnectionTypeID: {
      type: connectionTypeType,
      resolve: async (parent, args) => {
          try {
            return await connectionTypeModel.findById(parent.ConnectionTypeID);
          } catch (e) {
            return new Error(e.message);
          }
      }
      },
    LevelID: {
      type: levelType,
      resolve: async (parent, args) => {
          try {
            return await level.findById(parent.LevelID);
          } catch (e) {
            return new Error(e.message);
          }
      }
      },
    CurrentTypeID: {
      type: currentType,
      resolve: async (parent, args) => {
          try {
            return await currentTypeModel.findById(parent.CurrentTypeID);
          } catch (e) {
            return new Error(e.message);
          }
      }
      },
      
    Quantity: {type: GraphQLString}
  }),
});

 
 const currentType = new GraphQLObjectType({
  name: 'current',
  description: 'current name',
  fields: () => ({
    id: {type: GraphQLID},
    Description: {type: GraphQLString},
    Title: {type: GraphQLString},
  }),
});

const levelType = new GraphQLObjectType({
  name: 'level',
  description: 'level name',
  fields: () => ({
    id: {type: GraphQLID},
    Comments: {type: GraphQLString},
    IsFastChargeCapable: {type: GraphQLBoolean},
    Title: {type: GraphQLString},
  }),
});

const connectionTypeType = new GraphQLObjectType({
  name: 'connectiontype',
  description: 'connection type name',
  fields: () => ({
    id: {type: GraphQLID},
    FormalName: {type: GraphQLString},
    Title: {type: GraphQLString},
  }),
});

const coordinateType = new GraphQLInputObjectType({
  name: 'coordinateType',
  description: 'coordinate type name',
  fields: () => ({
    _northEast: {type: GraphQLString},
    _southWest: {type: GraphQLString}
  }),
}); 


 
 const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
     stations: {
       type: new GraphQLList(stationType),
       description: 'Get all stations',
       args: {
        bounds: {type: coordinateType},
        start: {type: GraphQLInt},
        limit: {type: GraphQLInt}
      },
      resolve: async (parent, args) => {
        try {
          console.log('Waiting for station within area')

          const limit = +args.limit;
          const start = +args.start;

          //bounds = JSON.parse(args.bounds);


      /*
          const topRight = JSON.parse(args.bounds._northEast);
          const bottomLeft = JSON.parse(args.bounds._southWest);
        
          const topLeft = {
            "lat": topRight.lat,
            "lng": bottomLeft.lng
          };
          const bottomRight= {
            "lat": bottomLeft.lat,
            "lng": topRight.lng
          }

          console.log(topLeft);
          console.log(bottomRight);
        
          const polygon = {
            "type": "Polygon",
            "coordinates": [[
              [topLeft.lng, topLeft.lat],
              [topRight.lng, topRight.lat],
              [bottomRight.lng, bottomRight.lat],
              [bottomLeft.lng, bottomLeft.lat],
              [topLeft.lng, topLeft.lat]
            ]]
          };

          */
          return await station
            .find()
            //.populate(populateFields)
            //.where('Location')
            //.within(polygon)
            .limit(limit).skip(start);
        } catch (e) {
          console.error(e.message);
          return new Error(e.message);
        }
       },
     },
     station: {
      type: stationType,
      description: 'Get station by id',
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: async (parent, args) => {
        console.log(args);
        try {
          return await station.findById(args.id);
        } catch (e) {
          return new Error(e.message);
        }
      },
    },
    connectiontypes: {
      type: new GraphQLList(connectionTypeType),
      description: 'Get connection types',
      resolve: async (parent, args) => {
        try {
          return await connectionTypeModel.find();
        } catch (e) {
          return new Error(e.message);
        }
      },
    },
    leveltypes: {
      type: new GraphQLList(levelType),
      description: 'Get levels',
      resolve: async (parent, args) => {
        try {
          return await level.find();
        } catch (e) {
          return new Error(e.message);
        }
      },
    },
    currenttypes: {
      type: new GraphQLList(currentType),
      description: 'Get current types',
      resolve: async (parent, args) => {
        try {
          return await currentTypeModel.find();
        } catch (e) {
          return new Error(e.message);
        }
      },
    },

   },
 });


const latlngType = new GraphQLInputObjectType({
  name: 'latlngType',
  description: 'lat and lng type name',
  fields: () => ({
      coordinates: {
    lat: {type: GraphQLString},
    lng: {type: GraphQLString}
      }
  }),
}); 

const ConnectionsType = new GraphQLInputObjectType({
  name: 'connectionstype',
  description: 'connections helper object',
  fields: () => ({
    ConnectionTypeID: {type: GraphQLID},
    CurrentTypeID: {type: GraphQLID},
    LevelID: {type: GraphQLID},
    Quantity: { type: GraphQLInt},
    
  }),
}); 

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations...',
  fields: {
    addStation: {
      type: stationType,
      description: 'Add a station',
      args: {
        Title: {type: new GraphQLNonNull(GraphQLString)},
        AddressLine1: {type: GraphQLString},
        Town: {type: GraphQLString},
        StateOrProvince: {type: GraphQLString},
        Postcode: {type: GraphQLString},
        Connections: {type: GraphQLList(ConnectionsType) },
        //Location: { type: latlngType}
        
    
      },
      resolve: async (parent, args) => {
        const newStation = new station(args);
        try {
          return await newStation.save();
        } catch (e) {
          return new Error(e.message);
        }
      },
    },
  }
})




module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

