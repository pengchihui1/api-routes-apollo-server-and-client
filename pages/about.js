import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery,useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider,Button,Text  } from "@chakra-ui/core";
import Router from 'next/router'  


// 定义查询内容
const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
			titile
			email
			pwd
			success
    }
  }
`
//定义更新内容
const ADD_TODO = gql`
  mutation AddTodo($id:Int!,$name:String!,$titile:String!) {
    addTodo(id:$id:,name:$name,titile:$titile) {
      id
      name
			titile
    }
  }
`;
export default function About() {
	  const { loading, error, data } = useQuery(ViewerQuery);
	  const [addTodo, { datas }] = useMutation(ADD_TODO);
		
		if (loading) return <p>Loading...</p>;
     if (error) return <p>Error :(</p>;
  return (
     <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}