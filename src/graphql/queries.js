/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      userid
      name
      status
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userid
        name
        status
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosByUserid = /* GraphQL */ `
  query TodosByUserid(
    $userid: String
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByUserid(
      userid: $userid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userid
        name
        status
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getTodosByUserid = (userid) =>{ /* GraphQL */ 
  return `
  query ListTodos(
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: { userid: { eq: "${userid}" } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userid
        name
        status
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }` };