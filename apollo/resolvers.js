// 定义的数据
import React, { useState, useRef, useEffect } from 'react'

var ArrayObj = [
  { id: 1, name: 'John Smith ', status: 'cached', titile: '王df丽', pwd: '123456', email: 'pengchihu@example.com', success: true },
  { id: 2, name: 'King Wei', status: 'cached', titile: '小sdf盒', pwd: '456789', email: '2015430746@example.com', success: true },
  { id: 3, name: ' Xiao', status: 'cached', titile: '家sdf俊', pwd: '147852', email: '8396598@example.com', success: false },
  { id: 4, name: 'Xia Hei', status: 'cached', titile: 'aetfaer', pwd: '456789', email: '798844845@example.com', success: true },
  { id: 5, name: 'Ming Kui', status: 'cached', titile: 'adfae', pwd: 'fwefwe', email: '798789484@example.com', success: true },
  { id: 6, name: 'Kai lii', status: 'cached', titile: 'cewefa', pwd: 'dsagewr', email: '265656565@example.com', success: true }
]

export const resolvers = {
  Query: {
    // 查询
    viewer (_parent, _args, _context, _info) {
      return ArrayObj
    }
  },
  Mutation: {
    // 新增后执行的回传 定义全局变量  拼接后return返回
    addTodo (_parent, _args, _context, _info) {
      var arr = ArrayObj
      const input = _args
      arr.push({ name: input.name, pwd: input.pwd })
      ArrayObj = arr
      return { name: input.name, pwd: input.pwd }
    },
    // 删除
    removeTodo (_parent, _args, _context, _info) {
      const input = _args
      const newCount = ArrayObj.filter((item, index) => {
        return item.id !== input.id
      })
      ArrayObj = newCount
      return ArrayObj
    }

  }
}
