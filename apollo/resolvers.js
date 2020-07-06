// 定义的数据

export const resolvers = {
  Query: {
    viewer (_parent, _args, _context, _info) {
      return [
        { id: 1, name: 'John Smith ', status: 'cached', titile: '王df丽', pwd: '123456', email: 'pengchihu@example.com', success: true },
        { id: 2, name: 'King Wei', status: 'cached', titile: '小sdf盒', pwd: '456789', email: '2015430746@example.com', success: true },
        { id: 3, name: ' Xiao', status: 'cached', titile: '家sdf俊', pwd: '147852', email: '8899632541@example.com', success: false }
      ]
    }
  },
  Mutation: {
    addTodo (_parent, _args, _context, _info) {
      return [
        { id: 1, name: 'John Smith ', status: 'cached', titile: '王df丽', pwd: '123456', email: 'pengchihu@example.com', success: true },
        { id: 2, name: 'King Wei', status: 'cached', titile: '小sdf盒', pwd: '456789', email: '2015430746@example.com', success: true },
        { id: 3, name: ' Xiao', status: 'cached', titile: '家sdf俊', pwd: '147852', email: '8899632541@example.com', success: false }
      ]
    }
  }
}
