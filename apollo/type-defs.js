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
  }

type Book {
  title: String
  author: String
}

type Mutation {
	   addTodo(name: String, pwd: String):User
     removeTodo(id:Int):[User]
     updateTodo(id:Int):[User]
	   addBook(title: String, author: String): [Book]
 }  

`
