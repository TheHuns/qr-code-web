import React, { useState } from "react"
import { Card, Typography, TextField, Button } from "@mui/material"
import { User } from "../types/User"

interface Props {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const CreateUserForm = ({ setUser }: Props) => {
  const [formValues, setFormValues] = useState({ userName: "" })

  async function handleSubmitForm() {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formValues.userName }),
    })
    const result = await res.json()
    sessionStorage.setItem("userId", result.id)
    setUser(result)
  }

  return (
    <Card sx={{ padding: 4 }}>
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 4 }}>
        Create User
      </Typography>
      <TextField
        sx={{ marginBottom: 4 }}
        variant="outlined"
        fullWidth
        label="Name"
        placeholder="Enter name"
        value={formValues.userName}
        onChange={event => setFormValues({ userName: event.target.value })}
      />
      <Button variant="contained" onClick={handleSubmitForm}>
        Create
      </Button>
    </Card>
  )
}

export default CreateUserForm
