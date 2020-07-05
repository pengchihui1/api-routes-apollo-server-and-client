import React, { useState,useRef ,useEffect} from "react";
import Link from 'next/link'
//es6 路由引用  ye有node模块导入方式
import Router from 'next/router'
import { ThemeProvider,Button , Input} from "@chakra-ui/core";

export default function() {

  return (
	<ThemeProvider>
	<Button variantColor="green" onClick={()=>{ Router.push({pathname: '/',query: {id: 1	}},'/')}}>router跳回首页</Button>
	
		<div></div>
		<Button  type="submit" onClick={()=>{Router.push("/apollo-mutations") }}>进入添加页面</Button>
		</ThemeProvider>
  )
}
