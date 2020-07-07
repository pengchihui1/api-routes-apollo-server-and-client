//gql字段格式


import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
		titile:String!
		pwd:String!
		email: String!
	  success: Boolean!
  }
  type Query {
    viewer: [User]
  }
	type King {
	  id: ID!
	  name: String!
	  status: String!
		titile:String!
		pwd:String!
		email: String!
	  success: Boolean!
	}
	type Mutation {
     addTodo:[King]
 }  

`
