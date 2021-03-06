// gql字段格式

import gql from 'graphql-tag'

export const typeDefs = gql`
type User {
  id: Int
  name: String
  status: String
  titile:String
  pwd:String
  email: String
  success: Boolean
}
type Query {
  viewer: [User]
  newQuery:[User]
}

type Mutation {
	   addTodo(name: String, pwd: String):User
     removeTodo(id:Int):[User]
     removeOne(id:Int):[User]
     updataOne(id:Int,name:String,pwd:String):User
     updateTodo(id:Int):[User]
 }  

`
