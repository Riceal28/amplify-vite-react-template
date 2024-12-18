import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';//setp6 login function part4-for sign out
import { generateClient } from "aws-amplify/data";
import { AccountSettings } from '@aws-amplify/ui-react';//step10 delete user

const client = generateClient<Schema>();

function App() {
  
  const { user, signOut } = useAuthenticator();//setp7 login function part5-for sign out
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  
 //step10 delete user
  const handleSuccess = () => {
    alert('user has been successfully deleted')
  }//step10 delete user
  
  function deleteTodo(id: string) { //setp1 delete function part1
    client.models.Todo.delete({ id })
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  


  return (



    <main>
  <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
          
          onClick={() => deleteTodo(todo.id)} //setp2 delete function part2

          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button> 
      <AccountSettings.DeleteUser onSuccess={handleSuccess} />
    </main> //setp8 login function part6-for sign out //step10 delete user


    
  );
  
}

export default App;

